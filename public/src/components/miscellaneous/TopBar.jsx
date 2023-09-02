import React, { useState } from 'react'
import { styled } from 'styled-components'
import { getSender } from '../../config/ChatLogics'
// import ThreeBars from '../../assets/ThreeBars.png'
import Lottie from 'lottie-react'
import menuIcon from '../../assets/menu-nav-icon.json'
import GroupDetailsModal from './ChatDetailsModal'
export default function TopBar({ user,selectedChat }) {

    let displayText = "";
    if (selectedChat && selectedChat.users) {
        if (selectedChat.isGroupChat) {
            displayText = selectedChat.chatName;
        } else {
            const sender = getSender(user, selectedChat.users);
            displayText = sender.username;
        }
    }
    // const sender = getSender(user,selectedChat.users)

    const [isModalOpen,setIsModalOpen] = useState(false)

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    }
  return (
    <StyledTopBar>
        <div className="user-details">
            {/* {
                sender && (
                    <>
                        <img src={sender.avatarImage} alt="" />
                        <h2>{sender.username}</h2>
                    </>
                )
            } */}
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
            {/* <img src={ThreeBars} alt="" /> */}
            <Lottie 
                animationData={menuIcon}
                style={{ width: "50px", height: "50px" }}
                onClick={toggleModal}
            />
        </div>
        <GroupDetailsModal 
            isOpen={isModalOpen} 
            onClose={toggleModal} 
            chat={selectedChat}
            user={user}
        />
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div`
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