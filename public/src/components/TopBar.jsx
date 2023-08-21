import React from 'react'
import styled from 'styled-components';

export default function TopBar() {
  return (
     <TopBarContainer>
      {/* <Avatar src={receiver.avatar} alt={`${receiver.name}'s Avatar`} /> */}
      <Name>hello</Name>

    </TopBarContainer>
  )
}


const TopBarContainer = styled.div`
  display: flex;
  height:10%;
  align-items: center;
  padding: 10px 20px;
  background-color: #e9e9e9;
  border-bottom: 1px solid #d3d3d3;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%; // makes it circular
  object-fit: cover;  // ensures the image scales properly
  margin-right: 10px;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;
