import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SideBar from '../components/SideBarChat'
import ChatBox from '../components/ChatBox'
import { useNavigate } from 'react-router-dom'

export default function Chat() {
  const navigate = useNavigate()
  const [user,setUser] = useState(null)

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
      {/* <SideBar user={user}/> */}
      {user && <SideBar user = {user}/>}
      <ChatBox user = {user}/>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`
