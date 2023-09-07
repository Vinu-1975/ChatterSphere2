import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { fetchMessagesRoute } from '../../utils/APIRoutes';
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics';

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
  console.log(messages)

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
                      <img className='msg-img' src={m.sender.imageUrl} alt='ProfilePic'></img>
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
                    fontSize: "16px",  // Increase font size for better readability
                    lineHeight: "1.5",  // Increase line height for better readability
                    // position: "relative",  // Added to position the message tail
                    wordBreak: "break-word",  // To ensure long strings/URLs don't break the design
                    fontFamily: "Arial, sans-serif",  // To ensure consistent typography (you can use any font family you prefer)
                    fontWeight: "400", // Regular font weight
                    display: "inline-block", // Ensuring the tail aligns correctly
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", // A subtle shadow for depth
                    borderBottomRightRadius: m.sender._id === user._id ? "5px" : "20px", // Adjust the bottom right radius if the sender is the user
                    borderBottomLeftRadius: m.sender._id !== user._id ? "5px" : "20px" // Adjust the bottom left radius if the sender is not the user
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
    /* border:1px solid black; */
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