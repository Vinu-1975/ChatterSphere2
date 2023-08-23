import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { styled } from 'styled-components'
import { fetchChatsRoute } from '../utils/APIRoutes'
// import TopBar from './TopBar'

export default function ChatBox() {
  
  // const [ loggedUser,setLoggedUser ] = useState(null)
  // const fetchChats = async()=>{
  //   try{
  //     const config = {
  //       headers:{
  //         Authorization: `Bearer ${user.token}`
  //       }
  //     }
  //     const { data } = await axios.get(fetchChatsRoute,config)
  //     console.log(data)
  //     setChats(data)
  //   }catch(error){
  //     toast.error("Error Occurred!")
  //   }
  // }

  // useEffect(()=>{
  //   setLoggedUser(JSON.parse(localStorage.getItem('ChatterSphere-user')))
  //   fetchChats()
  // },[])

  return (
    <Box>
        {/* <TopBar/> */}
    </Box>
  )
}

const Box = styled.div`
    height:100vh;
    width:70vw;
    border: 5px solid blue;
`