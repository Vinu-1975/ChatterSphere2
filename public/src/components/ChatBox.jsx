import { useState } from 'react'
import { styled } from 'styled-components'
import TopBar from './miscellaneous/TopBar'
import MessageBox from './miscellaneous/MessageBox'
import PropTypes from 'prop-types';


ChatBox.propTypes = {
    fetchAgain: PropTypes.bool.isRequired,
    setFetchAgain: PropTypes.func.isRequired,
    selectedChat: PropTypes.object,
    setSelectedChat: PropTypes.func.isRequired,
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default function ChatBox({ fetchAgain, setFetchAgain, selectedChat, setSelectedChat, user,}) {

  const [ messages, setMessages ] = useState([])
  // const [ loading, setLoading ] = useState(false)
  const [ newMessage, setNewMessage ] = useState('')

  return (
    <Box>
       {
        selectedChat ? (
          <>
            <TopBar 
              user={user} 
              selectedChat={selectedChat} 
              setSelectedChat={setSelectedChat} 
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
            <MessageBox
              user={user}
              selectedChat={selectedChat}
              messages={messages}
              setMessages={setMessages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
            />
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
  background-color: #FAF2D3;
  border-left: 1px solid black;
  @media (max-width: 768px) { // It becomes visible on screens smaller than 768px
      display: none;
  }
`


const EmptyChatContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;  // Takes full viewport height
    background-color: #f6f8fa;
    background-color: #FAF2D3;
    
    h1 {
        color: #5c7cfa;
        font-size: calc(9px + 1.5vw);
        font-weight: 600;
    }
`;