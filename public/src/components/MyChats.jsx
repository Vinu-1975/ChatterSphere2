import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import { fetchChatsRoute } from '../utils/APIRoutes';
import { getSender } from '../config/ChatLogics';
import SenderCard from './miscellaneous/SenderCard';


export default function MyChats({user,selectedChat,setSelectedChat,chats,setChats}) {

    const [ loggedUser,setLoggedUser ] = useState(null)
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
      setLoggedUser(prevUser => JSON.parse(localStorage.getItem('ChatterSphere-user')))
      fetchChats()
    },[])
  return (
    <Container>
        <header>
            <h1>My Chats</h1>
            <svg className='create-group' xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 512" id="add-users"><g data-name="<Group>"><path fill="#00efd1" d="M498,217.8v75.7H418.7l-.2.3a79.79,79.79,0,0,0-50.5-18,78.816,78.816,0,0,0-12,.9,48.25,48.25,0,0,0-18-35.5h0V217.8a38.6,38.6,0,0,1,38.5-38.6,51.506,51.506,0,0,0,83,0A38.6,38.6,0,0,1,498,217.8Z"></path><circle cx="418" cy="119" r="42.9" fill="#edb288"></circle><path fill="#fedb41" d="M290,373.5a79.99,79.99,0,1,1,78,62.3,82.619,82.619,0,0,1-10-.6A79.989,79.989,0,0,1,290,373.5Z"></path><path fill="#00acea" d="M338,241.3a48.24,48.24,0,0,1,18,35.5,79.927,79.927,0,0,0-66,96.8H156V279a48.135,48.135,0,0,1,48.2-48.2,64.307,64.307,0,0,0,103.6,0A46.625,46.625,0,0,1,338,241.3Z"></path><circle cx="256" cy="155.4" r="53.6" fill="#edb288"></circle><path fill="#00efd1" d="M174,217.8v23.5a48.028,48.028,0,0,0-18,37.6v14.6H14V217.8a38.6,38.6,0,0,1,38.5-38.6,51.456,51.456,0,0,0,41.5,21,50.855,50.855,0,0,0,41.4-21A38.623,38.623,0,0,1,174,217.8Z"></path><circle cx="94" cy="119" r="42.9" fill="#edb288"></circle><path fill="#083863" d="M256 217a61.6 61.6 0 1 0-61.6-61.6A61.691 61.691 0 0 0 256 217zm0-107.1a45.55 45.55 0 1 1-45.6 45.5A45.644 45.644 0 0 1 256 109.9zM418 169.9A50.85 50.85 0 1 0 367.1 119 50.979 50.979 0 0 0 418 169.9zm0-85.7a34.9 34.9 0 1 1-34.9 34.9A34.932 34.932 0 0 1 418 84.2z"></path><path fill="#083863" d="M459.5 171.2h-4.1l-2.4 3.3a43.455 43.455 0 0 1-70 0l-2.4-3.3h-4.1A46.561 46.561 0 0 0 330 217.8v9.4a56.212 56.212 0 0 0-22.2-4.6h-4.1l-2.4 3.3a56.308 56.308 0 0 1-90.8 0l-2.4-3.3H204a56.212 56.212 0 0 0-22.2 4.6v-9.4a46.626 46.626 0 0 0-46.5-46.6h-4.1l-2.4 3.3a43.455 43.455 0 0 1-70 0l-2.4-3.3H52.3A46.584 46.584 0 0 0 6 217.8v83.7H148v80H283.8A88.187 88.187 0 0 0 357 443.2a80.23 80.23 0 0 0 11 .7 88.027 88.027 0 0 0 69.2-142.4H506V217.8A46.626 46.626 0 0 0 459.5 171.2zM22 285.5V217.8a30.763 30.763 0 0 1 26.9-30.4 59.294 59.294 0 0 0 90.2 0A30.688 30.688 0 0 1 166 217.8v19.9a55.758 55.758 0 0 0-18 41.2v6.6zm142-6.7a40.2 40.2 0 0 1 36.4-40 72.449 72.449 0 0 0 111.2 0 39.339 39.339 0 0 1 21.4 8.7l5-6.2h0l-5 6.2a40.177 40.177 0 0 1 14.1 22.8A88.128 88.128 0 0 0 280 355.8c0 3.2.2 6.4.5 9.6H164zm204 149a68.025 68.025 0 0 1-9-.6 71.978 71.978 0 0 1-61.2-55.5 70.481 70.481 0 0 1-1.8-15.9c0-35.3 26.3-65.9 61.1-71.2a78.786 78.786 0 0 1 10.9-.8 71.933 71.933 0 0 1 45.4 16.1h0A72.012 72.012 0 0 1 368 427.8zM490 285.5H420.9A88.251 88.251 0 0 0 368 267.9c-1.7 0-3.4.1-5.1.2A57.012 57.012 0 0 0 346 237.7V217.8a30.763 30.763 0 0 1 26.9-30.4 59.294 59.294 0 0 0 90.2 0A30.688 30.688 0 0 1 490 217.8zM94 169.9A50.85 50.85 0 1 0 43.1 119 50.979 50.979 0 0 0 94 169.9zm0-85.7A34.9 34.9 0 1 1 59.1 119 34.932 34.932 0 0 1 94 84.2z"></path><path fill="#083863" d="M403,348H376V320.7a8,8,0,0,0-16,0V348H333a8,8,0,0,0,0,16h27v27.2a8,8,0,1,0,16,0V364h27a8,8,0,0,0,0-16Z"></path></g></svg>
        </header>
          {/* {chats ? (
            <div className='chat-list'>
                {chats.map((chat)=>(
                    <div key={chat._id} onClick={()=> setSelectedChat(chat)}>
                        {!chat.isGroupChat?(<div className='sender-card'>{getSender(loggedUser,chat.users)}</div>):chat.chatName}
                    </div>
                ))}
            </div>
            ):(
              <h1>loading</h1>
            )
          } */}
          <div className="chat-list">
              {chats ? (
                  chats.map(chat => (
                      <div key={chat._id} onClick={() => setSelectedChat(chat)}>
                          {!chat.isGroupChat ? 
                              (<SenderCard sender={getSender(loggedUser, chat.users)} />) : 
                              (<SenderCard sender={chat.chatName}/>)
                          }
                      </div>
                  ))
              ) : (
                  <h1>loading</h1>
              )}
          </div>
         
        {/* {user.username} */}
        
    </Container>
  )
}

const Container = styled.div`
    /* border: 1px solid red; */
    height:75%;
    header{
      h1{
        display: flex;
        align-items: center;
      }
      padding: 2px 20px;
      display: flex;
      height:10%;
      border: 1px solid black;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .create-group{
        height: 3.4rem;
        /* border: 1px solid black; */
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        cursor: pointer;
      }
    }
    .chat-list{
      height:90%;
      /* padding:10px; */
      .sender-card{
        /* border: 1px solid black; */
        margin:10px;
        height:4.2rem;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
        border-radius: 12px;
      }
    }
    
`
