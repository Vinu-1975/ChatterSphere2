import React, { useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../assets/Infinity.gif'
import { loginRoute } from '../utils/APIRoutes'

export default function Register() {
  const navigate = useNavigate()
  
  const [values,setValues] = useState({
    username:"",
    password:""
  })

  const [errors,setErrors] = useState({})

  const [isLoading,setIsLoading] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if(handleValidation()){
//         setIsLoading(true);
//       const { username,password } = values

//       const { data } = await axios.post(loginRoute,{
//         username,
//         password
//       })
      
//       setIsLoading(false);
//       if(data.status === false){
//         toast.error(data.msg)
//       }
//       if(data.status === true){
//         localStorage.setItem('ChatterSphere-user',JSON.stringify(data.user))
//         navigate("/")
//       }
//     }

//   }

const handleSubmit = async (e) => {
    e.preventDefault()
    if(handleValidation()){
        setIsLoading(true);
        const { username,password } = values

        const request = axios.post(loginRoute, { username, password });
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));

        const [{ data }] = await Promise.all([request, delay]);

        setIsLoading(false);
        if(data.status === false){
            toast.error(data.msg)
        }
        if(data.status === true){
            localStorage.setItem('ChatterSphere-user',JSON.stringify(data.user))
            navigate("/")
        }
    }
}


  const handleValidation = () => {
    const { username,password } = values
    let errors = {}
    
    if(!username){
      errors.username = "Username is required"
    }

    if(!password){
      errors.password = "Password is Required"
    }else if(password.length < 6){
      errors.password = "Password must be at least 6 characters"
    } 

    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const handleChange = (e) =>{
    setValues({
      ...values,
      [e.target.name]:e.target.value,
    })
  }
  return (
    <>
      <FormContainer>
          <div className="left">
            <div className="brand">
              <img src={Logo} alt="Logo" />
              <h1>ChatterSphere<sup><span>&#174;</span></sup></h1>

            </div>
          </div>
          <div className="right">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="heading">
                <h2>Login</h2>
              </div>
              <div>
                <input 
                  type="text"
                  placeholder='Username' 
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
                {errors.username && <p>{errors.username}</p>}
              </div>
              <div>
                <input 
                  type="password" 
                  placeholder='Password'
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
              <button type='submit'>
                Create Account
              </button>
              <span>
                Already have an account?  <Link to="/register">REGISTER</Link>
              </span>
            </form>
          </div>
      </FormContainer>
      {/* <ToastContainer/> */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {isLoading && <Overlay>
        <img src={Loader} alt="loading" />
      </Overlay>}
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  .left{
    height:100vh;
    width:60vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .brand{
      height: 30%;
      width:100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        height: 40rem;
      
      }
      h1 {
        margin-left:-35px;
        font-size: 57px;
      }
      span{
        font-size:30px;
      }
    }
  }
  .right{
    height:100vh;
    width:40vw;
    display: flex;
    justify-content: center;
    align-items: center;
    form{
      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
      height: auto;
      width:70%;
      display: flex;
      flex-direction: column;
      gap:1.6rem;
      padding: 3rem 3.5rem;
      border-radius: 1rem;
      &::placeholder{
        color:rgb(175,175,175)
      }
      .heading{
        text-align: center;
        font-size: 24px;
        color:#6fd492;
        /* text-wrap:balance; */
      }
      input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #fbc852;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }
      button {
        background-color: #07e4df;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
          &:hover {
            background-color: #4e0eff;
          }
      }
      span {
        text-transform: uppercase;
        text-align: center;
        a {
          color: #4e0eff;
          text-decoration: none;
          font-weight: bold;
        }
      }
      p {
        color: red;
        margin-left:0.5rem;
        font-size: 0.8rem;
        margin-top: 0.2rem;
      }
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
`;