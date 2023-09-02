import React, { useState } from 'react'
import { styled } from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { allUsers, createGroup } from '../../utils/APIRoutes';
import UserCard from './UserCard';
import UserBadge from './UserBadge';
export default function GroupChatModal({ isOpen,handleClose,handleSave,user,chats,setChats }) {
    
    const [groupChatName,setGroupChatName] = useState('')
    const [groupAvatar, setGroupAvatar ] = useState('')
    const [selectedUsers,setSelectedUsers] = useState([])
    const [search,setSearch] = useState('')
    const [searchResult,setSearchResult] = useState([])
    const [loading,setLoading] = useState(false)

    // function debounce(func, wait) {
    //   let timeout;
    //   const debounced = function(...args) {
    //     const context = this;
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => func.apply(context, args), wait);
    //   };

    //   debounced.clear = () => clearTimeout(timeout);

    //   return debounced;
    // }
    
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
            // console.log(data)
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
            // const { data } = await axios.post(createGroup,{
            //     name:groupChatName,
            //     users:JSON.stringify(selectedUsers.map((u)=>u._id)),
            //     groupAvatarImage:groupAvatar
            // },
            // config
            // )
            const { data } = await axios.post(createGroup, formData, config);
            // console.log(data)
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

    if (!isOpen) return null;
    return (
        <ModalWrapper>
            <ModalContent>
                <h2>Create Group Chat</h2>
                <form>
                    <div className="input-wrapper">
                        <input 
                            type='file'
                            name='groupAvatarImage'
                            accept='image/*'
                            onChange={handleFileChange}
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
                        <input 
                           type="text" 
                           placeholder='Add Users' 
                           value={search}
                           name='search'
                           onChange={e => handleSearch(e.target.value)}
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
                                // <div key={user._id} onClick={() => handleGroup(user)}></div>
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
                        <button onClick={handleClose}>Cancel</button>
                        <button className="save-btn" onClick={(e) => handleSubmit(e)}>Create</button>
                    </div>
                </form>
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
    width: 300px;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;

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
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            transition: border 0.2s;
        }

        input:focus {
            border-color: #007BFF;
            outline: none;
        }
    }

    .buttons {
        display: flex;
        justify-content: space-between;

        button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
        }

        button:hover {
            background-color: #007BFF;
            color: #ffffff;
        }

        .save-btn {
            background-color: #007BFF;
            color: #ffffff;
        }

        .save-btn:hover {
            background-color: #0056b3;
        }
    }
`;
