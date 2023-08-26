import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { styled } from 'styled-components'
import TopBar from './miscellaneous/TopBar'
import MessageBox from './miscellaneous/MessageBox'

export default function ChatBox({ fetchAgain,setFetchAgain,selectedChat,user }) {

  return (
    <Box>
       {
        selectedChat ? (
          <>
            <TopBar user={user} selectedChat={selectedChat}/>
            <MessageBox/>
          </>
        ):(
          <EmptyChatContainer>
            <h1>Click on a user to start Chatting</h1>
          </EmptyChatContainer>
        )
      }
    </Box>
  )
}

const Box = styled.div`
  height:100vh;
  width:70vw;
`

const EmptyChatContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;  // Takes full viewport height
    background-color: #f6f8fa;
    
    h1 {
        color: #5c7cfa;
        font-size: 1.5rem;
        font-weight: 600;
    }
`;