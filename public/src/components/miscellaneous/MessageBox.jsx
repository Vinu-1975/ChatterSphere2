// import React, { useEffect, useState } from 'react'
// import { styled } from 'styled-components'
// import toast, { Toaster } from 'react-hot-toast';
// import axios from 'axios';
// import { fetchMessagesRoute } from '../../utils/APIRoutes';
// import ScrollableFeed from 'react-scrollable-feed'
// import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics';
// import io from 'socket.io-client'

// const ENDPOINT = 'http://localhost:5000'
// var socket, selectedChatCompare;

// export default function MessageBox({ user, selectedChat, messages, setMessages,newMessage, setNewMessage }) {

//   // const [ messages, setMessages ] = useState([])
//   const [ loading, setLoading ] = useState(false)
//   // const [ newMessage, setNewMessage ] = useState()
//   const [ socketConnected, setSocketConnected ] = useState(false)

//    useEffect(()=>{
//     socket = io(ENDPOINT)
//     socket.emit('setup',user);
//     socket.on('connection',()=>{

//     })
//   },[])
//   useEffect(()=>{
//     fetchMessages()

//     selectedChatCompare = selectedChat
//   },[selectedChat])
//   useEffect(()=>{
//     socket.on('message received',(newMessageReceived)=>{
//       // console.log(newMessageReceived)
//       if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
//         //give notification
//         console.log('he')
//       }else{
//         console.log('hi')
//         setMessages([...messages,newMessageReceived])
//         // setMessages(prevMessages => [...prevMessages, newMessageReceived]);
//         console.log(messages)
//       }
//     })
//   })

//   const fetchMessages = async()=>{
//     if(!selectedChat) return

//     try{
//       const config = {
//         headers: {
//           Authorization : `Bearer ${user.token}`
//         }
//       }
//       setLoading(true)
//       const { data } = await axios.get(`${fetchMessagesRoute}/${selectedChat._id}`,config)
//       setMessages(data)
//       console.log(messages)
//       setLoading(false)
//       socket.emit('join chat',selectedChat._id)
//     }catch(error){
//       toast.error("Error Occurred!!")
//       setLoading(false)
//     }
//   }

  
//   // console.log(messages)

//   useEffect(() => {
//   const messageBox = document.querySelector('.messages'); // Adjust this selector to the right element if needed
//   if (messageBox) {
//     messageBox.scrollTop = messageBox.scrollHeight;
//   }
// }, [messages]);

 

//   return (
//     <StyledMessageBox>
//       {
//         loading?(<div>Loading</div>)
//         :(
//           <div className='messages'>
//             <ScrollableFeed>
//               {messages && messages.map((m,i)=>(
//                 <div style={{display:"flex"}} key={m._id}>
//                   {
//                     ((isSameSender(messages,m,i,user._id) || isLastMessage(messages,i,user._id))
//                     && (
//                       <img className='msg-img' src={m.sender.avatarImage} alt='ProfilePic'></img>
//                     )
//                     )
//                   }
//                   <span style={{
//                     backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
//                     borderRadius: "20px",
//                     padding: "5px 15px",
//                     maxWidth: "70%",
//                     marginRight: "10px",
//                     marginLeft: isSameSenderMargin(messages, m, i, user._id),
//                     marginTop: isSameUser(messages, m, i, user._id) ? 3: 10,
//                     fontSize: "16px",
//                     lineHeight: "1.5",
//                     // position: "relative",  // Added to position the message tail
//                     wordBreak: "break-word",
//                     fontFamily: "Arial, sans-serif",
//                     fontWeight: "400",
//                     display: "inline-block",
//                     boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
//                     borderBottomRightRadius: m.sender._id === user._id ? "5px" : "20px",
//                     borderBottomLeftRadius: m.sender._id !== user._id ? "5px" : "20px"
//                     }}>
//                       {m.content}
//                     <span style={{
//                       position: "absolute",
//                       bottom: 0,
//                       width: "10px",
//                       height: "20px",
//                       background: m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
//                       left: m.sender._id !== user._id ? "-7px" : "unset",
//                       right: m.sender._id === user._id ? "-7px" : "unset",
//                       clipPath: m.sender._id !== user._id ? "polygon(100% 0, 0 0, 100% 100%)" : "polygon(0 0, 100% 0, 0 100%)"
//                     }}></span>
//                     </span>
//                 </div>
//               ))}
//             </ScrollableFeed>
//           </div>
//         )
//       }
//     </StyledMessageBox>
//   )
// }

// // const StyledMessageBox = styled.div`
// //     height:80%;
// //     width:100%;
// //     overflow-x:hidden;
// //     .messages{
// //       .msg-img{
// //           width:50px;
// //           height:50px;
// //           margin:5px 10px;
// //           border-radius:50%;
// //         }
// //     }
// // `

// const StyledMessageBox = styled.div`
//   display: flex;
//   flex-direction: column-reverse; // Add this line
//   height: 80%;
//   width: 100%;
//   overflow-x: hidden;

//   .messages {
//     .msg-img {
//       width: 50px;
//       height: 50px;
//       margin: 5px 10px;
//       border-radius: 50%;
//     }
//   }
// `;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';
import { fetchMessagesRoute, sendMessageRoute } from '../../utils/APIRoutes';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics';

const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

export default function MessageBox({ user, selectedChat, initialMessages }) {
    const [messages, setMessages] = useState(initialMessages || []);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', user);
        socket.on('connection', () => setSocketConnected(true));
        return () => {
            socket.off('connection');
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on('message received', (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                console.log('he');
            } else {
                console.log('hi');
                setMessages([...messages, newMessageReceived]);
            }
        });
    });

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoading(true);
            const { data } = await axios.get(`${fetchMessagesRoute}/${selectedChat._id}`, config);
            setMessages(data);
            setLoading(false);
            socket.emit('join chat', selectedChat._id);
        } catch (error) {
            toast.error("Error Occurred!!");
            setLoading(false);
        }
    };

    const sendMessage = async (event) => {
        event.preventDefault();
        if (newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.post(sendMessageRoute, {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);
                setNewMessage('');
                socket.emit('new message', data);
                setMessages([...messages, data]);
            } catch (error) {
                toast.error("Error Occurred!");
            }
        }
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    };

    return (
        <ChatBoxContainer>
            <StyledMessageBox>
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <div className='messages'>
                        <ScrollableFeed>
                            {messages && messages.map((m,i)=>(
                <div style={{display:"flex"}} key={m._id}>
                  {
                    ((isSameSender(messages,m,i,user._id) || isLastMessage(messages,i,user._id))
                    && (
                      <img className='msg-img' src={m.sender.avatarImage} alt='ProfilePic'></img>
                    )
                    )
                  }
                  <span style={{
                    backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "70%",
                    marginRight: "10px",
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i, user._id) ? 3: 10,
                    fontSize: "16px",
                    lineHeight: "1.5",
                    // position: "relative",  // Added to position the message tail
                    wordBreak: "break-word",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "400",
                    display: "inline-block",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    borderBottomRightRadius: m.sender._id === user._id ? "5px" : "20px",
                    borderBottomLeftRadius: m.sender._id !== user._id ? "5px" : "20px"
                    }}>
                      {m.content}
                    <span style={{
                      position: "absolute",
                      bottom: 0,
                      width: "10px",
                      height: "20px",
                      background: m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                      left: m.sender._id !== user._id ? "-7px" : "unset",
                      right: m.sender._id === user._id ? "-7px" : "unset",
                      clipPath: m.sender._id !== user._id ? "polygon(100% 0, 0 0, 100% 100%)" : "polygon(0 0, 100% 0, 0 100%)"
                    }}></span>
                    </span>
                </div>
              ))}
                        </ScrollableFeed>
                    </div>
                )}
            </StyledMessageBox>
            <StyledMessageInputContainer>
                <form onSubmit={sendMessage} style={{ display: 'flex', width: '100%' }}>
                    {
                        showEmojiPicker && (
                            <EmojiPickerWrapper>
                                <EmojiPicker onEmojiClick={(emojiData) => {
                                    setNewMessage(prevMessage => prevMessage + emojiData.emoji);
                                    setShowEmojiPicker(false);
                                }} />
                            </EmojiPickerWrapper>
                        )
                    }
                    <EmojiPickerButton
                        type='button'
                        onClick={(e) => {
                            e.preventDefault();
                            setShowEmojiPicker(!showEmojiPicker);
                        }}>😀</EmojiPickerButton>
                    <StyledInput
                        required
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={typingHandler}
                    />
                    <SendButton type="submit">↗</SendButton>
                </form>
            </StyledMessageInputContainer>
        </ChatBoxContainer>
    );
}

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// ... All other styled-components definitions from both components go here ...

const StyledMessageBox = styled.div`
  display: flex;
  flex-direction: column-reverse; // Add this line
  height: 80%;
  width: 100%;
  overflow-x: hidden;

  .messages {
    .msg-img {
      width: 50px;
      height: 50px;
      margin: 5px 10px;
      border-radius: 50%;
    }
  }
`;

const EmojiPickerWrapper = styled.div`
  position: absolute;  // To allow for z-index positioning
  bottom: 50px;       // Adjust this value as needed to position the picker above the input
  z-index: 2000;      // A high z-index value to ensure it's above everything else
`;

const StyledMessageInputContainer = styled.div`
  display: flex;
  border: 3px solid #e0e0e0;
  align-items: center;
  background: linear-gradient(135deg, #F5F7FA 0%, #B8C6DB 100%);
  border-radius: 30px;
  padding: 10px 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  height: 10%;
  width: 100%;
  /* max-width: 600px; */
`;

const EmojiPickerButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 15px;
  transition: transform 0.2s ease-in-out, color 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #007bff;
  }

  &:focus {
    outline: none;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  padding: 7px 15px;
  font-size: 18px;
  font-weight: 400;
  color: #333;
  border-radius: 25px;
  transition: all 0.2s;

  &:focus {
    background: rgba(255, 255, 255, 1);
    outline: none;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  }
`;

const SendButton = styled.button`
  background-color: transparent;
  color: #007bff;
  font-size: 24px;
  padding: 5px 15px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
  margin-left: 15px;

  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
    transform: translateY(-5px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
  }
`;