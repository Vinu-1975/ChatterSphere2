import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function SideBar({user}) {
  const navigate = useNavigate()
  const logoutHandler = () => {
    if(localStorage.getItem('ChatterSphere-user')){
        localStorage.removeItem('ChatterSphere-user')
    }
    navigate('/login')
  }

  return (
     <TopBarContainer>
      <div className="profilePhoto">
        <img src={user.imageUrl} alt="" />
      </div>
      <div className="options">
        <i className="fa-solid fa-arrow-right-from-bracket" onClick={logoutHandler}></i>
        <i className="fa-solid fa-gear"></i>
      </div>

    </TopBarContainer>
  )
}


const TopBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  background-color: #e9e9e9;
  border-bottom: 1px solid #d3d3d3;
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
  /* filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.3)); */
  .profilePhoto {
    /* border: 2px solid red; */
    img{
    display: block;
    width: 70px;
    height:70px;
    border-radius: 50%;
    }
  }
  .options{
    /* border: 2px solid black; */
    display: flex;
    flex-direction: column;
    width:100%;
    align-items: center;
    i{
      display: block;
      padding:15px 10px;
      cursor: pointer;
      /* border: 1px solid black; */
      font-size: 37px;
    }

  }
  
  
`;

