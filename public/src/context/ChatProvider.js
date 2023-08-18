import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const ChatContext = createContext({
    user:null,
    setUser:()=>{}
})

const ChatProvider = ({ children })=>{

    const [user,setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        let userInfo = null;

        try {
            userInfo = JSON.parse(localStorage.getItem("ChatterSphere-user"));
            console.log("success")
        } catch (error) {
            console.log("falu")
            console.error("Failed to parse user info:", error);
        }

        setUser(userInfo);

        if (!userInfo) {
            navigate('/');
        }

    },[navigate])

    return (
        <ChatContext.Provider value={{user,setUser}}>
            { children }
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('ChatState must be used within a ChatProvider');
    }
    return context;
}

export default ChatProvider


