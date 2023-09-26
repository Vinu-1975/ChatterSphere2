import axios from 'axios'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import toast from 'react-hot-toast';
import { fetchChatsRoute } from '../utils/APIRoutes';
import { getSender } from '../config/ChatLogics';
import SenderCard from './miscellaneous/SenderCard';
import GroupChatModal from './miscellaneous/GroupChatModal';
import GroupIcon from '../assets/addGroupIcon.json'
import Lottie from 'lottie-react'
import PropTypes from 'prop-types';

MyChats.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        imageUrl: PropTypes.string
    }).isRequired,
    selectedChat: PropTypes.object,
    setSelectedChat: PropTypes.func.isRequired,
    chats: PropTypes.arrayOf(PropTypes.object).isRequired,
    setChats: PropTypes.func.isRequired,
    fetchAgain: PropTypes.bool.isRequired
};

// eslint-disable-next-line no-unused-vars
export default function MyChats({user,selectedChat,setSelectedChat,chats,setChats,fetchAgain}) {

    const [isModalOpen,setIsModalOpen] = useState(false)

    const [ loggedUser,setLoggedUser ] = useState(null)


    const openModal = () => {
      setIsModalOpen(true)
    }

    const closeModal = () => {
      setIsModalOpen(false)
    }

    const saveGroupChat = () => {
      closeModal()
    }

    const fetchChats = async()=>{
      try{
        const config = {
          headers:{
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.get(fetchChatsRoute,config)
        setChats(data)
      }catch(error){
        toast.error("Error Occurred!")
      }
    }

    useEffect(()=>{
      setLoggedUser(JSON.parse(localStorage.getItem('ChatterSphere-user')))
      fetchChats()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fetchAgain])
  return (
    <Container>
        <header>
            <h1>My Chats</h1>
            <Lottie
              animationData={GroupIcon}
              style={{ width: "50px", height: "50px" }}
              onClick={openModal}
            />
            <GroupChatModal
              isOpen={isModalOpen}
              handleClose={closeModal}
              handleSave={saveGroupChat}
              user={user}
              chats={chats}
              setChats={setChats}
            />
        </header>
          <div className="chat-list">
              {chats ? (
                  chats.map(chat => (
                      <div key={chat._id} onClick={() => setSelectedChat(chat)}>
                          {!chat.isGroupChat ? 
                              (<SenderCard sender={getSender(loggedUser, chat.users)} />) : 
                              (<SenderCard sender={chat}/>)
                          }
                      </div>
                  ))
              ) : (
                  <h1>loading</h1>
              )}
          </div>
    </Container>
  )
}

const Container = styled.div`
    height:75%;
    header{
      h1{
        display: flex;
        align-items: center;
        font-size: calc(12px + 1.2vw);
      }
      padding: 2px 20px;
      display: flex;
      height:10%;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .create-group{
        height: 2.6rem;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        cursor: pointer;
      }
    }
    .chat-list{
      height:90%;
      overflow-y: auto;
      scroll-behavior: smooth;
      scroll-behavior: smooth;

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
          display: none;
      }
    
      /* Hide scrollbar for Firefox */
      scrollbar-width: none;
    
      /* Hide scrollbar for IE */
      -ms-overflow-style: none;
      .sender-card{
        /* border: 1px solid black; */
        margin:10px;
        height:4.2rem;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
        border-radius: 12px;
      }
    }
`
