import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import { fetchChatsRoute } from '../utils/APIRoutes';


export default function MyChats({user,selectedChat,setSelectedChat,chats,setChats}) {

    const [ loggedUser,setLoggedUser ] = useState(null)
    const fetchChats = async()=>{
      try{
        const config = {
          headers:{
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.get(fetchChatsRoute,config)
        console.log(data)
        setChats(data)
      }catch(error){
        toast.error("Error Occurred!")
      }
    }

    useEffect(()=>{
      setLoggedUser(JSON.parse(localStorage.getItem('ChatterSphere-user')))
      fetchChats()
    },[])
  return (
    <Container>

    </Container>
  )
}

const Container = styled.div`
    
`
