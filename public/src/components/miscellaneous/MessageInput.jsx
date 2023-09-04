import React, { useState } from 'react';
import styled from 'styled-components';
import { Picker } from '@emoji-mart/react'
import { data } from '@emoji-mart/data'
import axios from 'axios';
import { sendMessage } from '../../utils/APIRoutes';


export default function MessageInput({ messages, setMessages,newMessage, setNewMessage, user, selectedChat }) {

  const [showEmojiPicker,setShowEmojiPicker] = useState(false)
  const [message,setMessage] = useState("")

 const sendMessage = async (event) => {
  if(event.key==="Enter" && newMessage){
    try{
      const config = {
        headers: {
          "Content-Type":"application/json",
          Authorization : `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post(sendMessage,{
        content:newMessage,
        chatId:selectedChat._id
      },config)
    }catch(error){

    }
  }
 }

 const typingHandler = (e) => {
  setNewMessage(e.target.value)
 }

  return (
    <StyledMessageInputContainer>
            <form onKeyDown={sendMessage} style={{ display: 'flex', width: '100%' }}>
                {/* {showEmojiPicker && <Picker data={data} onEmojiSelect={handleEmojiClick}/>} */}
                <EmojiPicker onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</EmojiPicker>
                <StyledInput 
                  required
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={typingHandler}
                />
                <SendButton type="submit">↗</SendButton>
            </form>
        </StyledMessageInputContainer>
  );
}

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

const EmojiPicker = styled.button`
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
