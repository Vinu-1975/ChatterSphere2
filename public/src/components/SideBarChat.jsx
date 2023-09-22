import { useEffect, useRef, useState } from 'react'
import  styled  from 'styled-components'
import Logo from '../assets/logo.png'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { allUsers, createChat } from '../utils/APIRoutes';
import MyChats from './MyChats';
import UserCard from './miscellaneous/UserCard';
import PropTypes from 'prop-types';

SideBarChat.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired
    }).isRequired,
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
    searchResult: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    })).isRequired,
    setSearchResult: PropTypes.func.isRequired,
    setSelectedChat: PropTypes.func.isRequired,
    selectedChat: PropTypes.object, // or use PropTypes.shape if you want to be more specific
    chats: PropTypes.arrayOf(PropTypes.object).isRequired, // You might want to use PropTypes.shape here as well
    setChats: PropTypes.func.isRequired,
    fetchAgain: PropTypes.bool.isRequired
};

export default function SideBarChat({ user,search,setSearch,searchResult,setSearchResult,selectedChat, setSelectedChat,chats,setChats,fetchAgain }) {
  
  const [loading,setLoading] = useState(false)
  const [loadingChat,setLoadingChat] = useState(false)

  const dropdownRef = useRef(null)
  

  useEffect(()=>{
    function handleClickOutside(e){
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setSearchResult([])
      }
    }
    document.addEventListener('mousedown',handleClickOutside)
    return () => {
      document.removeEventListener('mousedown',handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 
  const handleSearch = async () => {
    console.log(search)
    if (!search.trim()) {
        setSearchResult([]); 
        return;
    }
    try {
        setLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`${allUsers}?search=${search}`, config);
        setLoading(false);
        console.log(data)
        setSearchResult(data);
    } catch (error) {
        setLoading(false);
        toast.error("Failed to Load the Search Results");
    }
  }
  useEffect(() => {
    const timer = setTimeout(handleSearch, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const accessChat = async (userId) => {
    try{
      setLoading(true)
      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post(createChat,{userId},config);
      if(!chats.find((c)=> c._id === data._id)) setChats([data,...chats])
      console.log(data)
      setSelectedChat(data)
      setLoadingChat(false)
    }catch(error){
      toast.error("Error fetching the chat")
    }
  }

  return (
    <SideBar>
            <div className="brand">
                <div className="logo-container">
                  <img src={Logo} alt="ChatterSphere Logo" id='logo'/>
                </div>
                <h1>ChatterSphere</h1>
            </div>
            <div className="search-bar-container">
              <div className="group">
                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                <input 
                  type="text" 
                  placeholder='Search Contacts'
                  value={search}
                  name="search"
                  className='input'
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handleSearch()
                  }}
                  />
              
              {searchResult.length > 0 && (
                <Dropdown ref = {dropdownRef}>
                  {
                    searchResult.map((user,index)=>(
                      <UserCard
                        key={index}
                        user={user}
                        onClick={()=> accessChat(user._id)}
                      />
                    ))
                  }
                </Dropdown>
              )}
              </div>
            </div>
            <MyChats
              user = {user}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              chats = {chats}
              setChats={setChats}
              fetchAgain={fetchAgain}
            />

            <Toaster
              position="top-center"
              reverseOrder={false}
            />
    </SideBar>
  )
}

const SideBar = styled.div`
    background-color: #e8dcaf;
    height: 100vh;
    width:30vw;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rba(90, 125, 188, 0.05) 0px 0.25em 1em;
    .brand{
      height:15%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      .logo-container{
        width:25%;
        height: 100%;
        position: relative;
        overflow: hidden;
      }
      h1{
        font-size:calc(24px + 0.6vw)
      }
      #logo{
        position: absolute;
        height: 15rem;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
      }
    }
    .search-bar-container{
      display: flex;
      align-items: center;
      justify-content: center;
        .group {
         display: flex;
         line-height: 28px;
         align-items: center;
         position: relative;
         height:3rem;
         width:90%;
        }
        .input {
         width: 100%;
         height:100%;
         border: 1px solid black;
         line-height: 28px;
         padding: 0 1rem;
         padding-left: 2.5rem;
         border: 2px solid transparent;
         border-radius: 8px;
         outline: none;
         background-color: #f4f3f4;
         background-color: #f3ecd0;
         color: #0d0c22;
         transition: .3s ease;
        }
        .input::placeholder {
         color: #9e9ea7;
        }
        .input:focus, input:hover {
         outline: none;
         border-color: rgba(30, 167, 44, 0.4);
         background-color: #ffffff;
         box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
        }
        .icon {
         position: absolute;
         left: 1rem;
         fill: #9e9ea7;
         width: 1rem;
         height: 1rem;
        } 
      }   
    .contacts{
      border: 1px solid red;
      height:75%;
      header{
        display: flex;
        border: 1px solid black;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      header *{
        padding: 12px 15px;
      }
    }
    /* @media (max-width: 768px) { // It becomes visible on screens smaller than 768px
        display: block;
        width:100%;
        height: 100vh;
    } */
`

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: auto; 
  overflow-y: auto;
  z-index: 10;  
  background-color: #fff;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  .search-result-item {
    padding: 10px;
    cursor: pointer;
    
    &:hover {
      background-color: #e6e6e6;
    }
  }
`;