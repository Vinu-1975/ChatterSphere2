import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { fetchMessagesRoute } from '../../utils/APIRoutes';
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from '../../config/ChatLogics';

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
          <div className='messages'>
            <ScrollableFeed>
              {messages && messages.map((m,i)=>(
                <div style={{display:"flex"}} key={m._id}>
                  {
                    ((isSameSender(messages,m,i,user._id) || isLastMessage(messages,i,user._id))
                    && (
                      <img className='msg-img' src={user.imageUrl} alt='ProfilePic'></img>
                    )
                    )
                  }
                  <span style={{
                    backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%"
                    }}>
                      {m.content}
                    </span>
                </div>
              ))}
            </ScrollableFeed>
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
    .messages{
      .msg-img{
          width:50px;
          height:50px;
          border-radius:50%;
        }
    }
`