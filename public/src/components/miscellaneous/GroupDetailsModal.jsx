import React, { useState } from 'react';
import { styled } from 'styled-components';
import { renameGroup } from '../../utils/APIRoutes';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
export default function GroupDetailsModal({ isOpen, onClose, chat, setChat, user, fetchAgain, setFetchAgain }) {
    const [newGroupName, setNewGroupName] = useState('');
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

    if (!isOpen) return null;

    const toggleRenameModal = () => {
        setIsRenameModalOpen(prev => !prev);
    };

    const handleRename = async (newName) => {
        if(chat.groupAdmin._id!== user._id){
            toast.error("Only Admins can Make Changes!")
            return
        }
        if(newGroupName.length < 1) return
        try{
            const config = {
                headers: {
                    Authorization : `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put(renameGroup,{
                chatId: chat._id,
                chatName:newGroupName,
            },config)
            setChat(data)
            setFetchAgain(!fetchAgain)
            toggleRenameModal();
        }catch(error){
            toast.error('Error Occured!')
        }
        setNewGroupName('')
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <ModalBackdrop onClick={handleBackdropClick}>
            <ModalContent>
                <img src={chat.avatarImage} alt="Group Avatar" />
                <div className="header-container">
                    <h2>{chat.chatName}</h2>
                    <i className="fa-regular fa-pen-to-square" onClick={toggleRenameModal}></i>
                    {isRenameModalOpen && (
                        <RenameModalContent>
                            <h2>Rename Group</h2>
                            <input 
                                type="text"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                placeholder="New Group Name"
                            />
                            <div className="button-group">
                                <button onClick={() => handleRename(newGroupName)}>Rename</button>
                                <button onClick={toggleRenameModal}>Cancel</button>
                            </div>
                        </RenameModalContent>
                    )}
                </div>
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

    .header-container {
        display: flex;
        justify-content: center;
        h2 {
            margin-right: 10px;
        }
        i{
            font-size: 20px;
            margin-top: 3px;
        }
    }

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
const RenameModalContent = styled.div`
    position: absolute;  // To overlay on top of the main modal content
    top: 50%;
    left: 50%;
    width: 60%;  // Reduce the width
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;  // Add some rounding for aesthetics
    transform: translate(-50%, -50%);  // Centering technique
    z-index: 1;  // To ensure it appears on top of the main modal content
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);  // Optional: Add a shadow for depth

    input {
        width: 100%;  // Make the input span the entire width of the modal
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .button-group {
        display: flex;
        gap: 10px;
        justify-content: center;  // Center the buttons
        
        button {
            padding: 5px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: #007BFF;
            color: #fff;
            transition: background 0.3s;

            &:hover {
                background-color: #0056b3;
            }
        }
    }
`;
