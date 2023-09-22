import { useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../assets/Infinity.gif'
import AddProfile2 from '../assets/add_user_profile.jpg'

export default function Register() {
  const navigate = useNavigate()

  const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
    avatarImageFile : AddProfile2,
    avatarImage:null,
  })

  const [errors,setErrors] = useState({})

  const [isLoading,setIsLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(handleValidation()){
        setIsLoading(true);

        const formData = new FormData();
        formData.append('username',values.username)
        formData.append('email',values.email)
        formData.append('password',values.password)
        if(values.avatarImage){
          formData.append('avatarImage',values.avatarImage)
        }
        try{
          const { data } = await axios.post(registerRoute,formData)
          setIsLoading(false);
          if (data.status === false) {
            toast.error(data.msg);
          }
          if (data.status === true) {
            localStorage.setItem('ChatterSphere-user', JSON.stringify(data.returnUser));
            navigate('/');
          }
        }catch(error){
          setIsLoading(false);
          toast.error("Registration Failed")
        }
        setIsLoading(false)
    }
}


  const handleValidation = () => {
    const { username,email,password,confirmPassword } = values
    let errors = {}
    
    if(!username){
      errors.username = "Username is required"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!email){
      errors.email = "Email is required"
    }else if(!emailRegex.test(email)){
      errors.email = "Email is not Valid"
    }

    if(!password){
      errors.password = "Password is Required"
    }else if(password.length < 6){
      errors.password = "Password must be at least 6 characters"
    } 

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required"
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
    setErrors(errors)

    return Object.keys(errors).length === 0
  }
  
  const handleChange = (e) => {
      if (e.target.name === 'avatarImage') {
          const file = e.target.files[0];
          if (file) {
              const imageUrl = URL.createObjectURL(file);
              setValues({
                  ...values,
                  avatarImageFile:imageUrl,
                  avatarImage: file
              });
          }
      } else {
          setValues({
              ...values,
              [e.target.name]: e.target.value,
          });
      }
  };
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
            <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
              <div className="heading">
                <h2>Register Yourself</h2>
              </div>
              <div className='profile-img-container'>
                <input 
                  id="file" 
                  type="file"
                  name='avatarImage'
                  accept='image/*'
                  style={{ display: 'none' }}
                  onChange={(e)=>handleChange(e)}
                />
                <label htmlFor="file">
                    <div className="image-container">
                      <img src={values.avatarImageFile} alt="Uploaded" className="uploaded-img" />
                    </div>
                </label>
              </div>
              <div>
                <input 
                  type="text"
                  placeholder='Username'
                  className='input'
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
                <span className='input-border'></span>
                {errors.username && <p>{errors.username}</p>}
              </div>
              <div>
                <input 
                  type="email"
                  placeholder='Email' 
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
                {errors.email && <p>{errors.email}</p>}
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
              <div>
                <input 
                  type="password"
                  placeholder='Confirm Password'
                  name="confirmPassword" 
                  onChange={(e) => handleChange(e)}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
              </div>
              {/* <button type='submit'>
                Create Account
              </button> */}
              <button 
                type="submit"
                className="cssbuttons-io-button"
              >
                Create Account
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                </div>
              </button>
              <span>
                Already have an account?  <Link to="/login">LOGIN</Link>
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
  background: #dee5e8;
  box-shadow:  21px 21px 42px #bdc3c5,-21px -21px 42px #ffffff;
             
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
      @keyframes floatEffect {
        0%, 100% {
          transform: translateY(-5px);
        }
        50% {
          transform: translateY(5px);
        }
      }
      img {
        height: 40rem;
        animation: floatEffect 5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite; 
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
      /* box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
      box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px; */
      box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
      height: auto;
      width:70%;
      display: flex;
      flex-direction: column;
      gap:1rem;
      padding: 3rem 3.5rem;
      border-radius: 1rem;
      border-radius: 50px;
      background: #edf1f3;
      background: #e2e8ea;
      
      
      &::placeholder{
        color:rgb(175,175,175)
      }
      .heading{
        text-align: center;
        font-size: 24px;
        color:#6fd492;
        /* text-wrap:balance; */
      }
      .profile-img-container {
        display: flex;
        /* border: 1px solid black; */
        justify-content: center; /* Center the image horizontally */
        align-items: center;     /* Center the image vertically */
        /* margin-bottom: 1rem;  */

        .image-container {
          width: 100px;
          height: 100px;
          overflow: hidden; /* Hide any overflowing parts of the image */
          border-radius: 50%; /* Makes the image appear as a circle */
          position: relative; /* Allows child elements to be positioned relative to this container */
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

          .uploaded-img {
            display: block; 
            margin: 0 auto;
            position: absolute;
            top: 57%;
            left: 50%;
            transform: translate(-50%, -50%);
            object-fit: cover;
            width:170px;
            height:170px;
          }
        }
      }
      input {
      background-color: transparent;
      padding: 0.8rem;
      outline: none;
      border:none;
      border-bottom: 0.1rem solid #74d465;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
        &:focus {
          border-bottom: 0.1rem solid #997af0;
          outline: none;
        }
      }
      .cssbuttons-io-button {
        background: #A370F0;
        background: #00d0cc;
        color: white;
        font-family: inherit;
        padding: 0.35em;
        padding-left: 1.2em;
        font-size: 17px;
        font-weight: 500;
        border-radius: 0.9em;
        border: none;
        letter-spacing: 0.05em;
        display: flex;
        align-items: center;
        /* box-shadow: inset 0 0 1.6em -0.6em #714da6; */
        box-shadow: inset 0 0 1.6em -0.6em #07e4df;
        box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
        overflow: hidden;
        position: relative;
        height: 2.8em;
        padding-right: 3.3em;
      }

      .cssbuttons-io-button .icon {
        background: white;
        margin-left: 1em;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.2em;
        width: 2.2em;
        border-radius: 0.7em;
        box-shadow: 0.1em 0.1em 0.6em 0.2em #44dbd9;
        right: 0.3em;
        transition: all 0.8s;
      }

      .cssbuttons-io-button:hover .icon {
        width: calc(100% - 0.6em);
      }

      .cssbuttons-io-button .icon svg {
        width: 1.1em;
        transition: transform 0.3s;
        color: #7b52b9;
      }

      .cssbuttons-io-button:hover .icon svg {
        transform: translateX(0.1em);
      }

      .cssbuttons-io-button:active .icon {
        transform: scale(0.95);
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
        color: red !important;
        margin-left:0.5rem;
        font-size: 0.8rem;
        margin-top: 0.2rem;
      }
    }
  }
  @media (max-width: 1190px) and (min-width: 869px) {
    .left {
      .brand {
        img {
          height: 30rem; // Reduced height from 40rem
        }
        h1 {
          font-size: 55px; // Reduced font size from 57px
        }
        span {
          font-size: 24px; // Reduced font size from 30px
        }
      }
    }
  }
  @media (max-width: 868px) {  // Adjust this breakpoint value as needed
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        width: 0;
        background: transparent; // Optional: Make scrollbar transparent
    }
    // Hide scrollbar for IE and Edge
    & {
      -ms-overflow-style: none;  // IE and Edge
      scrollbar-width: none;     // Firefox
    }
    
    .left {
      width: 100vw;
      height:30vh;
      flex-direction: column;
      
      .brand {
        align-items: center;
        justify-content: center;
        img {
          height: 15rem;
        }
        h1 {
          margin-left: 0;
          font-size: 32px;
        }
      }
    }

    .right {
      width: 100vw;
      height: auto;
      margin-bottom: 30px;
      form {
        width: 90%;
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