import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'


import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../AuthProvider/AuthProvider';
import login from '../img/login.png'
import toast from 'react-hot-toast';

import {doc , setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';



const Login = () => {
  const { signIn , signInWithGoogle} = useContext(AuthContext)
  const { register, handleSubmit } = useForm();
  const [loginUserEmail, setLoginUserEmail] = useState('')
  const navigate = useNavigate();
  const pathname = useLocation();
  

  

  const handleSignIn = (data) => {
    console.log(data)
    signIn(data.email, data.password)
      .then(result => {
        const user = result.user;
        setLoginUserEmail(data.email)
        toast.success('sign in successfully !')
        navigate(pathname?.state ? pathname?.state : '/')

      })
      .catch(error => {
        console.error(error.message)
        toast.error(error.message)
      })
  }
  const handleSignInWithGoogle = () => {
      signInWithGoogle()
      .then((result) => {
        console.log("user koi" , result.user)
          const user = result?.user;
         setDoc(doc(db , "users" , user?.uid) , {
                    uid : user?.uid,
                    displayName: user.displayName, 
                    email: user.email,
                    photoURL: user?.photoURL
                  })
                  setDoc(doc(db , "userChats" , user?.uid) , {})
        toast.success('sign in successfully !')
        navigate(pathname?.state ? pathname?.state : '/')

      })
      .catch(error => {
        toast.error(error.message)
      })

  }
  return (
    <div className='h-screen flex items-center'>

      <form onSubmit={handleSubmit(handleSignIn)} className="hero ">

        <div className="hero-content flex flex-col gap-16  lg:flex-row">
          <div className="text-center lg:text-left max-w-lg">
            <img className='login' src={login} alt="" />
          </div>

          <div className="card flex-shrink-0 w-full max-w-sm">
            <h1 className='text-2xl font-bold  mt-4'>Hello , Welcome</h1>
            <p className='mb-4 mt-1'>Please Enter your details below , to Continue</p>

            <div className="">
              <div className="form-control" style={{ border: 'none' }}>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" {...register('email')} placeholder="email" className="input border-purple-600 input-bordered w-full" />
              </div>
              <div className="form-control mt-4 mb-4" style={{ border: 'none' }}>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password"{...register("password")} className="input border-purple-600 input-bordered w-full" />
                <label className="label">
                  <h2 className="label-text-alt link link-hover text-lg my-2">Are you new here ? <Link to="/register" className="text-xl font-semibold text-red-600">Signup</Link> </h2>
                </label>
              </div>
              <div className="form-control" style={{ border: 'none', width: '100%' }}>
                <button className="btn btn-active rounded-full text-white bg-purple-600 w-full">Login</button>
                
                <div className='flex  justify-center hover:cursor-pointer hover:underline mt-3'onClick={handleSignInWithGoogle}>
                  
                <div className='flex btn btn-outline w-full py-2 rounded-full border-purple-600 items-center gap-1 font-medium'><FcGoogle className='text-4xl' /> <span>Login With Google</span> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
};

export default Login;