import { useState } from 'react'
import { styled } from 'styled-components'
import { getSender } from '../../config/ChatLogics'
import Lottie from 'lottie-react'
import menuIcon from '../../assets/menu-nav-icon.json'
import GroupDetailsModal from './GroupDetailsModal'
import UserDetailModal from './UserDetailModal'
import PropTypes from 'prop-types';
import BackButton from '../../assets/BackButton.json'


TopBar.propTypes = {
    fetchAgain: PropTypes.bool,
    setFetchAgain: PropTypes.func.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired,
    selectedChat: PropTypes.shape({
        users: PropTypes.array,
        isGroupChat: PropTypes.bool,
        chatName: PropTypes.string,
        avatarImage: PropTypes.string
    }),
    setSelectedChat: PropTypes.func.isRequired,
};

export default function TopBar({ fetchAgain, setFetchAgain, user, selectedChat, setSelectedChat,}) {

    let displayText = "";
    if (selectedChat && selectedChat.users) {
        if (selectedChat.isGroupChat) {
            displayText = selectedChat.chatName;
        } else {
            const sender = getSender(user, selectedChat.users);
            displayText = sender.username;
        }
    }

    const [isModalOpen,setIsModalOpen] = useState(false)

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    }
  return (
    <StyledTopBar>
        <BackButtonContainer>
            <Lottie 
                animationData={BackButton}
                style={{ width: "30px", height: "30px",color:'white' }}
                loop 
                autoPlay
            />
        </BackButtonContainer>
        <div className="user-details">
            {
                displayText && (
                    <>
                        <img src={selectedChat.isGroupChat ? selectedChat.avatarImage : getSender(user, selectedChat.users).avatarImage} alt="" />
                        <h2>{displayText}</h2>
                    </>
                )
            }
        </div>
        <div className="user-setting-icon">
            <Lottie 
                animationData={menuIcon}
                style={{ width: "50px", height: "50px" }}
                onClick={toggleModal}
            />
        </div>
        {
            selectedChat.isGroupChat? (<GroupDetailsModal isOpen={isModalOpen} onClose={toggleModal} chat={selectedChat} user={user} setChat={setSelectedChat} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}
            />):(<UserDetailModal isOpen={isModalOpen} onClose={toggleModal} chat={selectedChat} user={user}/>)
        }
    </StyledTopBar>
  )
}



const StyledTopBar = styled.div`
    background-color: #e9e2c4;
    background-color: #213555;
    color:#dddddd;
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding:10px 20px;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    .user-details{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        img{
            width:2.9rem;
            height:2.9rem;
            border-radius: 50%;
            object-fit: cover;
            margin:0 25px 0 0;
        }
    }
    .user-setting-icon{
        img{
            width:2.5rem;
            height:2.5rem;
            border-radius: 20%;
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        }
    }
`

const BackButtonContainer = styled.button`
    border: 1px solid black;
    border-radius: 50%;
    display: none; // By default, it's hidden

    @media (max-width: 768px) { // It becomes visible on screens smaller than 768px
        display: block;
    }
`;