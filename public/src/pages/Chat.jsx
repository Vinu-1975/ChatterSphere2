import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SideBar from '../components/SideBarChat'
import ChatBox from '../components/ChatBox'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/SideBar'

export default function Chat() {
  const navigate = useNavigate()
  const [user,setUser] = useState(null)

  const [search,setSearch] = useState("")
  const [searchResult,setSearchResult] = useState([])
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats,setChats] = useState([])

  

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('ChatterSphere-user'));
      setUser(userInfo);
      if (!userInfo) {
        navigate('/login');
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      navigate('/login');
    }
  }, [navigate]);
  
  // console.log(user)
  return (
    <Container>
      {user && <TopBar user = {user}/>}
      {user && <SideBar 
        user = {user}
        search = {search}
        setSearch={setSearch}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        chats={chats}
        setChats={setChats}
      />}
      {user && <ChatBox 
        user = {user}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        chats={chats}
        setChats={setChats}
        />}
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`
