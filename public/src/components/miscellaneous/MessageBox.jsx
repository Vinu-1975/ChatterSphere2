import React from 'react'
import { styled } from 'styled-components'

export default function MessageBox() {
  return (
    <StyledMessageBox>
        MessageBox
    </StyledMessageBox>
  )
}

const StyledMessageBox = styled.div`
    /* border:1px solid black; */
    height:80%;
    width:100%;
`