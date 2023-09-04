import React, { useState } from 'react'
import { styled } from 'styled-components'

export default function MessageBox({ messages, setMessages,newMessage, setNewMessage }) {

  // const [ messages, setMessages ] = useState([])
  const [ loading, setLoading ] = useState(false)
  // const [ newMessage, setNewMessage ] = useState()

  return (
    <StyledMessageBox>
      {
        loading?(<div>Loading</div>)
        :(
          <div>
            Messages
          </div>
        )
      }
    </StyledMessageBox>
  )
}

const StyledMessageBox = styled.div`
    /* border:1px solid black; */
    height:80%;
    width:100%;
`