import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { fetchMessagesRoute } from '../../utils/APIRoutes';

export default function MessageBox({ user, selectedChat, messages, setMessages,newMessage, setNewMessage }) {

  // const [ messages, setMessages ] = useState([])
  const [ loading, setLoading ] = useState(false)
  // const [ newMessage, setNewMessage ] = useState()

  const fetchMessages = async()=>{
    if(!selectedChat) return

    try{
      const config = {
        headers: {
          Authorization : `Bearer ${user.token}`
        }
      }
      setLoading(true)
      const { data } = await axios.get(`${fetchMessagesRoute}/${selectedChat._id}`,config)
      setMessages(data)
      console.log(messages)
      setLoading(false)
    }catch(error){
      toast.error("Error Occurred!!")
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchMessages()
  },[selectedChat])

  return (
    <StyledMessageBox>
      {
        loading?(<div>Loading</div>)
        :(
          <div>
            Messages
          </div>
        )
      }
    </StyledMessageBox>
  )
}

const StyledMessageBox = styled.div`
    /* border:1px solid black; */
    height:80%;
    width:100%;
`