import React, { useEffect, useState } from 'react'
import  styled  from 'styled-components'
import Logo from '../assets/logo.png'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { allUsers, createChat } from '../utils/APIRoutes';
import MyChats from './MyChats';

export default function SideBarChat({ user,search,setSearch,searchResult,setSearchResult,selectedChat, setSelectedChat,chats,setChats }) {

  const [loading,setLoading] = useState(false)
  const [loadingChat,setLoadingChat] = useState(false)
 
  const handleSearch = async () => {
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
        setSearchResult(data);
        // console.log(data); 
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
      onclose()
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
              <input 
                type="text" 
                placeholder='Search Contacts'
                value={search}
                name="search"
                className='searchbox'
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch()
                }}
              />
              {searchResult.length > 0 && (
                <Dropdown>
                  {/* {searchResult.map((result, index) => (
                    <div key={index} className="search-result-item" onClick={()=>accessChat(user._id)}>
                      {result.username}
                    </div>
                  ))} */}
                  {
                    searchResult.map((result,index)=>(
                      <UserCard key={index} onClick={()=>accessChat(result._id)}>
                        <img src={result.avatarImage} alt="" />
                        <div className="userInfo">
                          <h3>{result.username}</h3>
                          <p>last message</p>
                        </div>
                      </UserCard>
                    ))
                  }
                </Dropdown>
              )}
            </div>
            {/* <div className="contacts">
              <header>
                <h2>My Chats</h2>
                <h2>A</h2>
              </header>
              {user.username}
            </div> */}
            <MyChats
              user = {user}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              chats = {chats}
              setChats={setChats}
            />

            <Toaster
              position="top-center"
              reverseOrder={false}
            />
    </SideBar>
  )
}

const SideBar = styled.div`
    height: 100vh;
    width:30vw;
    .brand{
      border: 1px solid blue;
      height:15%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: larger;
      .logo-container{
        /* border: 5px solid yellow; */
        width:35%;
        height: 100%;
        position: relative;
        
        overflow: hidden;

      }
      
      #logo{
        position: absolute;
        height: 22rem;
        top:-120px;
        left:-20px;
      }
    }
    .search-bar-container{
      position: relative;
      border: 1px solid green;
      height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      .searchbox {
        width: 90%;
        padding: 18px 15px;               
        border: 1px solid #c4c4c4;       
        border-radius: 12px;             
        font-size: 16px;                 
        outline: none;                   
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); 

        
        ::placeholder {
          color: #a0a0a0;
          font-weight: 300;             
        }
        &:hover {
          border-color: #a0a0a0;
        }
        &:focus {
          border-color: #5a8dd8;   
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
        }
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
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
`

const Dropdown = styled.div`
  position: absolute;
  top: 100%;  // Position it right below the search-bar-container
  width: 90%; // To match the width of the searchbox
  max-height: 200px; // Set a max height and overflow-y to make it scrollable if results are too many
  overflow-y: auto;
  z-index: 10;  // Ensuring it overlays on top of the contacts div
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

const UserCard = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e5e5e5;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f6f6f6;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%; // makes it circular
    object-fit: cover;  // ensures the image scales properly
    margin-right: 12px;
  }

  .userInfo {
    flex: 1;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    p {
      margin: 4px 0 0;
      font-size: 14px;
      color: #777;
    }
  }
`;
