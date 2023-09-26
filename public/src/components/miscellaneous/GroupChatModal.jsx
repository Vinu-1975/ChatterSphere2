import { useRef, useState } from 'react'
import { styled } from 'styled-components';
import toast from 'react-hot-toast';
import axios from 'axios';
import { allUsers, createGroup } from '../../utils/APIRoutes';
import UserCard from './UserCard';
import UserBadge from './UserBadge';
import PropTypes from 'prop-types';

GroupChatModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    user: PropTypes.shape({
        token: PropTypes.string.isRequired,
        _id:PropTypes.string,
    }).isRequired,
    chats: PropTypes.arrayOf(PropTypes.object).isRequired,
    setChats: PropTypes.func.isRequired,
};
export default function GroupChatModal({ isOpen,handleClose,handleSave,user,chats,setChats }) {
    
    const [groupChatName,setGroupChatName] = useState('')
    const [groupAvatar, setGroupAvatar ] = useState('')
    const [selectedUsers,setSelectedUsers] = useState([])
    const [search,setSearch] = useState('')
    const [searchResult,setSearchResult] = useState([])
    const [loading,setLoading] = useState(false)
    const fileInputRef = useRef(null);
    
    const handleSearch = async (query) => {
        setSearch(query)
        if(!query || query.length < 3){
            setSearchResult([])
            return
        }
        try{
            setLoading(true);
            const config = {
                headers: {
                    Authorization : `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`${allUsers}?search=${search}`,config)
            setLoading(false)
            setSearchResult(data)
        }catch(error){
            setLoading(false)
            toast.error('Error Occurred! Failed to load the chats')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!groupChatName || !selectedUsers){
            toast.error("Please fill all the fields")
        }

        const formData = new FormData()
        if(groupAvatar) formData.append('groupAvatarImage',groupAvatar)
        formData.append('name',groupChatName)
        formData.append('users',JSON.stringify(selectedUsers.map((u)=>u._id)))
        
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post(createGroup, formData, config);
            setChats([data,...chats])
            toast.success("New Group Chat Created")
            handleSave()
        }catch(error){
            toast.error("Failed to Create Group Chat")
        }
    }

    const handleFileChange = (e) => {
        console.log("hello")
        if (e.target.files && e.target.files[0]){
            const file = e.target.files[0]
            setGroupAvatar(file)
        }
    }

    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)){
            toast.error("User already added")
        }
        setSelectedUsers([...selectedUsers,userToAdd])
    }

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== delUser._id))
    }
    const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
        handleClose();
    }
};

    if (!isOpen) return null;
    return (
        <ModalWrapper onClick={handleOutsideClick}>
            <ModalContent>
                <div className="center-wrap">
                <h2>Create Group Chat</h2>
                <form>
                    <div className="input-wrapper file-input" onClick={() => fileInputRef.current.click()}>
                        <div className="file-icon">
                            +
                        </div>
                        <input 
                            ref = {fileInputRef}
                            type='file'
                            name='groupAvatarImage'
                            accept='image/*'
                            onChange={handleFileChange}
                            style={{display:'none'}}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input 
                           type="text" 
                           placeholder="Enter group name" 
                           value={groupChatName}
                           name='groupName'
                           onChange={e => setGroupChatName(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        {/* <input 
                           type="text" 
                           placeholder='Add Users' 
                           value={search}
                           name='search'
                           onChange={e => handleSearch(e.target.value)}
                        /> */}
                        <input 
                          type="text"
                          placeholder='Add Users'
                          value={search}
                          name="search"
                          onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <div className="added-users">
                        {selectedUsers.map(user => (
                            <UserBadge
                                key={user._id}
                                user = { user }
                                handleFunction={()=>handleDelete(user)}
                            />
                        ))}
                    </div>
                    <div className="user-list">
                        {
                        loading?<div>loading</div>:(
                            searchResult?.slice(0,4).map(user => (
                                <UserCard
                                    key={user._id}
                                    user={user}
                                    onClick={() => handleGroup(user)}
                                />
                            ))
                        )
                        }
                    </div>
                    <div className="buttons">
                        <button className="save-btn" onClick={(e) => handleSubmit(e)}>
                                <span>Create</span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                  <path d="M1,5 L11,5"></path>
                                  <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                        </button>
                    </div>
                </form>
                </div>
            </ModalContent>
        </ModalWrapper>
    );
}

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    h2{
        text-align: center;
        margin-bottom: 15px;
    }
    
    width: 25vw;
    height:auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .center-wrap{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
    }
    .file-input {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        cursor: pointer;
    }

    .file-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #007BFF;
        color: #fff;
        font-size: 24px;
    }

    .added-users{
        display: flex;
        flex-direction: row;
        align-items:center;
        justify-content: space-around;
        flex-wrap:wrap
    }
    label {
        margin-bottom: 10px;
    }

    button {
        margin-top: 10px;
    }
    .input-wrapper {
        margin-bottom: 15px;
        input {
          background-color: transparent;
          padding: 0.8rem;
          outline: none;
          border:none;
          border-bottom: 0.1rem solid #74d465;
          border-radius: 0.4rem;
          width: 100%;
          font-size: 1rem;
          &:focus {
            border-bottom: 0.1rem solid #997af0;
            outline: none;
          }
        }
    }

        .buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
        }

        .save-btn {
            position: relative;
            margin: auto;
            padding: 12px 18px;
            transition: all 0.2s ease;
            border: none;
            background: none;
            

            
        }
        .save-btn:before {
             content: "";
             position: absolute;
             top: 0;
             left: 0;
             display: block;
             border-radius: 50px;
             background: #b1dae7;
             width: 45px;
             height: 45px;
             transition: all 0.3s ease;
            }

            .save-btn span {
             position: relative;
             font-family: "Ubuntu", sans-serif;
             font-size: 18px;
             font-weight: 700;
             letter-spacing: 0.05em;
             color: #234567;
            }

            .save-btn svg {
             position: relative;
             top: 0;
             margin-left: 10px;
             fill: none;
             stroke-linecap: round;
             stroke-linejoin: round;
             stroke: #234567;
             stroke-width: 2;
             transform: translateX(-5px);
             transition: all 0.3s ease;
            }

            .save-btn:hover:before {
             width: 100%;
             background: #b1dae7;
            }

            .save-btn:hover svg {
             transform: translateX(0);
            }

            .save-btn:active {
             transform: scale(0.95);
            }
`;