import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { sendMessageRoute } from '../../utils/APIRoutes';
import toast, { Toaster } from 'react-hot-toast';
import EmojiPicker,{
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation
} from 'emoji-picker-react'
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000'
var socket, selectedChatCompare;

export default function MessageInput({ messages, setMessages,newMessage, setNewMessage, user, selectedChat }) {

  const [ showEmojiPicker,setShowEmojiPicker ] = useState(false)
  const [ selectedEmoji, setSelectedEmoji ] = useState("")
  // const [ message,setMessage ] = useState("")

  useEffect(()=>{
    socket = io(ENDPOINT)
    socket.emit('setup',user);
    socket.on('connection',()=>{

    })
  },[])

 const sendMessage = async (event) => {
  event.preventDefault()
  console.log("sendmessage")
  // if(event.key==="Enter" && newMessage){
  if(newMessage){
    try{
      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization : `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post(sendMessageRoute,{
        content: newMessage,
        chatId: selectedChat._id
      },config)
      console.log(data)
      setNewMessage('')
      socket.emit('new message',data)
      setMessages([...messages,data])
    }catch(error){
      toast.error("Error Occurred!")
    }
  }
 }

 const typingHandler = (e) => {
  setNewMessage(e.target.value)
 }

 

  return (
    <StyledMessageInputContainer>
            <form onSubmit={sendMessage} style={{ display: 'flex', width: '100%' }}>
                {
                  showEmojiPicker && (
                    <EmojiPickerWrapper>
                      <EmojiPicker onEmojiClick={(emojiData)=>{
                        setNewMessage(prevMessage => prevMessage + emojiData.emoji)
                        setShowEmojiPicker(false)
                      }}/>
                    </EmojiPickerWrapper>
                  )
                }
                <EmojiPickerButton 
                type='button'
                onClick={(e)=> {
                  e.preventDefault()
                  setShowEmojiPicker(!showEmojiPicker)
                  }}>😀</EmojiPickerButton>
                <StyledInput 
                  required
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={typingHandler}
                  // onKeyDown={sendMessage} 
                />
                <SendButton type="submit">↗</SendButton>
            </form>
        </StyledMessageInputContainer>
  );
}

const EmojiPickerWrapper = styled.div`
  position: absolute;  // To allow for z-index positioning
  bottom: 50px;       // Adjust this value as needed to position the picker above the input
  z-index: 2000;      // A high z-index value to ensure it's above everything else
`;

const StyledMessageInputContainer = styled.div`
  display: flex;
  border: 3px solid #e0e0e0;
  align-items: center;
  background: linear-gradient(135deg, #F5F7FA 0%, #B8C6DB 100%);
  border-radius: 30px;
  padding: 10px 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  height: 10%;
  width: 100%;
  /* max-width: 600px; */
`;

const EmojiPickerButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 15px;
  transition: transform 0.2s ease-in-out, color 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #007bff;
  }

  &:focus {
    outline: none;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  padding: 7px 15px;
  font-size: 18px;
  font-weight: 400;
  color: #333;
  border-radius: 25px;
  transition: all 0.2s;

  &:focus {
    background: rgba(255, 255, 255, 1);
    outline: none;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  }
`;

const SendButton = styled.button`
  background-color: transparent;
  color: #007bff;
  font-size: 24px;
  padding: 5px 15px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
  margin-left: 15px;

  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
    transform: translateY(-5px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
  }
`;
