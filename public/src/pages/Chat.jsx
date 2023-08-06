import React, { useState } from 'react'
import styled from 'styled-components'

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #F5F5F5;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: #007BFF;
  color: white;
  padding: 0 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`

const UserName = styled.div`
  font-weight: bold;
`

const ChatMainContainer = styled.div`
  display: flex;
  flex-grow: 1;
`

const ChatSidebar = styled.div`
  width: ${props => props.isOpen ? '300px' : '0'};
  transition: width 0.3s ease-in-out;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 3px 0px 5px rgba(0,0,0,0.1);
`

const ChatThread = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #eee;
  }
`

const ChatDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`

const ChatDisplay = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  border-bottom: 1px solid #ccc;
`

const ChatInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
`

const Input = styled.input`
  flex-grow: 1;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  &:hover {
    background-color: #0056b3;
  }
`

const SidebarToggleButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  border: none;
  border-radius: 50%;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  &:hover {
    background-color: #0056b3;
  }
`

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Assuming you have access to the user's profile image URL and name
  const userProfileImageURL = 'your-user-profile-image-url.jpg';
  const userName = 'John Doe';

  return (
    <ChatContainer>
      <TopBar>
        <UserProfile>
          <ProfileImage src={userProfileImageURL} alt="User Profile" />
          <UserName>{userName}</UserName>
        </UserProfile>
        <SidebarToggleButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? '-' : '+'}
        </SidebarToggleButton>
      </TopBar>
      <ChatMainContainer>
        <ChatSidebar isOpen={isSidebarOpen}>
          <ChatThread>
            Chat 1
          </ChatThread>
          <ChatThread>
            Chat 2
          </ChatThread>
          {/* More chat threads go here */}
        </ChatSidebar>
        <ChatDisplayContainer>
          <ChatDisplay>
            {/* Messages will go here */}
          </ChatDisplay>
          <ChatInput>
            <Input type="text" placeholder="Type a message..." />
            <Button>Send</Button>
          </ChatInput>
        </ChatDisplayContainer>
      </ChatMainContainer>
    </ChatContainer>
  )
}
