import React from 'react'
import { styled } from 'styled-components'
import { getSender } from '../../config/ChatLogics'
import ThreeBars from '../../assets/ThreeBars.png'
export default function TopBar({ user,selectedChat }) {

    const sender = getSender(user,selectedChat.users)

  return (
    <StyledTopBar>
        <div className="user-details">
            {
                sender && (
                    <>
                        <img src={sender.avatarImage} alt="" />
                        <h2>{sender.username}</h2>
                    </>
                )
            }
        </div>
        <div className="user-setting-icon">
            <img src={ThreeBars} alt="" />
        </div>
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