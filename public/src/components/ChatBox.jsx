import React, { useState } from 'react'
import { styled } from 'styled-components'
import TopBar from './TopBar'

export default function ChatBox() {
  const [ loggedUser,setLoggedUser ] = useState()

  return (
    <Box>
        <TopBar/>
    </Box>
  )
}

const Box = styled.div`
    height:100vh;
    width:70vw;
    border: 5px solid blue;
`