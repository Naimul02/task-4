import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';


// import useToken from '../hooks/useToken';
import { toast } from 'react-toastify';
import useAxiosPublic from '../hooks/useAxiosPublic';
import {doc , setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';


const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const imgBB_API_KEY = 'a115c1fc301ae82139c471c0406d9a62';
    const image_hosting = `https://api.imgbb.com/1/upload?key=${imgBB_API_KEY}`
  const { createUser, profileUpdate, emailVerification } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [creactedUserEmail, setCreatedUserEmail] = useState("");
  // const [token] = useToken(creactedUserEmail);
  const navigate = useNavigate();



  // if (token) {
  //   navigate('/');
  // }

  const handleSignUp = async(data) => {
    
    const imageFile = {image : data?.photourl[0]};
    console.log(imageFile);
    const res = await axiosPublic.post(image_hosting , imageFile , {
      headers : {
        'content-type' : 'multipart/form-data'
      }
    })
    


    
    
    const users = {
      name: data.name,
      email: data.email,
      photourl: res.data.data.url,
      password : data?.password
    }
    fetch('https://nesn-39-store-server.vercel.app/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(users)
    })
      .then(res => res.json())
      .then(data => {
        setCreatedUserEmail(users.email)
      })

    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log("USER", user)

        toast.success('User Created successful!')
        navigate('/')

        const userInfo = {
          displayName: data.name,
          photoURL: res.data.data.url
        }

        console.log("userinfo", userInfo)
        profileUpdate(userInfo)
          .then(() => { })
          .catch(() => {})
          setDoc(doc(db , "users" , user?.uid) , {
            uid : user?.uid,
            displayName: userInfo.displayName, 
            email: user.email,
            photoURL: userInfo.photoURL
          })
          setDoc(doc(db , "userChats" , user?.uid) , {})



      emailVerification()
          .then(() => { })
          .catch(() => { })
      })



      .catch(error => {
        console.error(error.message)
      })


  }
  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="hero">

      <div className="hero-content flex-col gap-20 lg:gap-40 lg:flex-row">
      <div className="text-center lg:text-left max-w-lg">
            <img className='login' src="https://i.gifer.com/IGCF.gif" alt="" />
          </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className='text-2xl font-bold text-center mt-4'>SignUp</h1>

          <div className="card-body">
            <div className="form-control" style={{ border: 'none' }}>


              <input {...register("name", { required: true })} type="text" placeholder="Enter Your Name" className="input input-bordered w-full" />
            </div>
            <div className="form-control" style={{ border: 'none' }}>
            
            <input type="file" className="file-input file-input-bordered  w-full hover:cursor-pointer"{...register('photourl' ,  {required : true})} />
              {/* <input {...register('photourl', { required: true })} type="text" placeholder="Photo URL" className="input input-bordered w-full" /> */}
            </div>
            <div className="form-control" style={{ border: 'none' }}>

              <input {...register("email", { required: true })} type="email" placeholder="Enter Your Email" className="input input-bordered w-full" />
            </div>
            <div className="form-control" style={{ border: 'none' }}>

              <input {...register("password", { required: true })} type="password" placeholder="password" className="input input-bordered w-full" />
              <label className="label">
                <h1 className="label-text-alt link link-hover text-lg">Already have an account ? <Link to="/login" className='text-lg font-semibold text-red-500'>Login</Link></h1>
              </label>
            </div>
            <div className="form-control" style={{ border: 'none', width: '100%' }}>
            <button className="btn btn-active text-white bg-[#65ad07] hover:bg-[#549401] w-full">Signup</button>
            </div>
          </div>
        </div>
      </div>
    </form >
  );
};

export default Signup;