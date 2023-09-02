import React from 'react'
import { styled } from 'styled-components';

export default function GroupDetailsModal({ isOpen, onClose, chat }) {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if(e.target === e.currentTarget) onClose()
    }

    return (
        <ModalBackdrop onClick={handleBackdropClick}>
            <ModalContent>
                <img src={chat.avatarImage} alt="Group Avatar" />
                <h2>{chat.chatName}</h2>
                <ul>
                    {chat.users.map(user => (
                        <li key={user._id}>{user.username}</li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </ModalContent>
        </ModalBackdrop>
    );
}

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);  /* semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;  /* Ensure it appears on top */
`;

const ModalContent = styled.div`
    width: 80%;
    max-width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    text-align: center;

    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 20px;
        object-fit: cover;
    }

    h2 {
        margin-bottom: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 5px 0;
    }

    button {
        padding: 10px 20px;
        margin-top: 20px;
        background-color: #007BFF;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #0056b3;
        }
    }
`;
