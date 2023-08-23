import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import { fetchChatsRoute } from '../utils/APIRoutes';
import { getSender } from '../config/ChatLogics';


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
        <header>
            <h2>My Chats</h2>
            <h2>A</h2>
        </header>
        {user.username}
        {chats?(
            <div>
                {chats.map((chat)=>(
                    <div key={chat._id} onClick={()=> setSelectedChat(chat)}>
                        {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                    </div>
                ))}
            </div>
        ):(
            <h1>loading</h1>
        )
    }
    </Container>
  )
}

const Container = styled.div`
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
`
