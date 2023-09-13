import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { fetchMessagesRoute } from '../../utils/APIRoutes';
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics';
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000'
var socket, selectedChatCompare;

export default function MessageBox({ user, selectedChat, messages, setMessages,newMessage, setNewMessage }) {

  // const [ messages, setMessages ] = useState([])
  const [ loading, setLoading ] = useState(false)
  // const [ newMessage, setNewMessage ] = useState()
  const [ socketConnected, setSocketConnected ] = useState(false)

   useEffect(()=>{
    socket = io(ENDPOINT)
    socket.emit('setup',user);
    socket.on('connection',()=>{

    })
  },[])
  useEffect(()=>{
    fetchMessages()

    selectedChatCompare = selectedChat
  },[selectedChat])
  useEffect(()=>{
    socket.on('message received',(newMessageReceived)=>{
      // console.log(newMessageReceived)
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
        //give notification
        console.log('he')
      }else{
        console.log('hi')
        setMessages([...messages,newMessageReceived])
        console.log(messages)
      }
    })
  })

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
      socket.emit('join chat',selectedChat._id)
    }catch(error){
      toast.error("Error Occurred!!")
      setLoading(false)
    }
  }

  
  // console.log(messages)

  

 

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
                      <img className='msg-img' src={m.sender.avatarImage} alt='ProfilePic'></img>
                    )
                    )
                  }
                  <span style={{
                    backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "70%",
                    marginRight: "10px",
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i, user._id) ? 3: 10,
                    fontSize: "16px",
                    lineHeight: "1.5",
                    // position: "relative",  // Added to position the message tail
                    wordBreak: "break-word",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "400",
                    display: "inline-block",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    borderBottomRightRadius: m.sender._id === user._id ? "5px" : "20px",
                    borderBottomLeftRadius: m.sender._id !== user._id ? "5px" : "20px"
                    }}>
                      {m.content}
                    <span style={{
                      position: "absolute",
                      bottom: 0,
                      width: "10px",
                      height: "20px",
                      background: m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                      left: m.sender._id !== user._id ? "-7px" : "unset",
                      right: m.sender._id === user._id ? "-7px" : "unset",
                      clipPath: m.sender._id !== user._id ? "polygon(100% 0, 0 0, 100% 100%)" : "polygon(0 0, 100% 0, 0 100%)"
                    }}></span>
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
    height:80%;
    width:100%;
    overflow-x:hidden;
    .messages{
      .msg-img{
          width:50px;
          height:50px;
          margin:5px 10px;
          border-radius:50%;
        }
    }
`