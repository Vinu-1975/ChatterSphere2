import React from 'react'
import { styled } from 'styled-components'

export default function UserCard({ user,onClick }) {
  return (
    <StyledUserCard onClick={onClick}>
        <img src={user.avatarImage} alt={`${user.username}`} />
        <div className="userInfo">
            <h3>{user.username}</h3>
            <p>last Message</p>
        </div>
    </StyledUserCard>
  )
}

const StyledUserCard = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #e5e5e5;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f6f6f6;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%; // makes it circular
      object-fit: cover;  // ensures the image scales properly
      margin-right: 12px;
    }

    .userInfo {
      flex: 1;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }

      p {
        margin: 4px 0 0;
        font-size: 14px;
        color: #777;
      }
    }
`