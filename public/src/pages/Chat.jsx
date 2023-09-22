import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SideBarChat from '../components/SideBarChat'
import ChatBox from '../components/ChatBox'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar'

export default function Chat() {
  const navigate = useNavigate()
  const [user,setUser] = useState(null)
  const [fetchAgain,setFetchAgain] = useState(false)

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
  
  return (
    <Container>
        {user && <SideBar user = {user}/>}
          {user && <SideBarChat 
            user = {user}
            search = {search}
            setSearch={setSearch}
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            chats={chats}
            setChats={setChats}
            fetchAgain={fetchAgain}
          />}
          {user && <ChatBox 
            user = {user}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />}
      
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`