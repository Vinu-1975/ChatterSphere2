import React from 'react'
import { styled } from 'styled-components';

export default function GroupChatModal({ isOpen,handleClose,handleSave }) {
  if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalContent>
                <h2>Create Group Chat</h2>
                <label>
                    Group Name:
                    <input type="text" placeholder="Enter group name" />
                </label>
                <div>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </ModalContent>
        </ModalWrapper>
    );
}

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    width: 300px;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;

    label {
        margin-bottom: 10px;
    }

    button {
        margin-top: 10px;
    }
`;
