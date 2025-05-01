import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { AuthContext } from '../../AuthProvider/AuthProvider';

// import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../AuthProvider/AuthProvider';


const Login = () => {
  const { signIn , signInWithGoogle} = useContext(AuthContext)
  const { register, handleSubmit } = useForm();
  const [loginUserEmail, setLoginUserEmail] = useState('')
  // const [token] = useToken(loginUserEmail)
  const navigate = useNavigate();
  const pathname = useLocation();
  

  // if (token) {
  //   navigate('/')
  // }

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
        toast.success('sign in successfully !')
        navigate(pathname?.state ? pathname?.state : '/')

      })
      .catch(error => {
        toast.error(error.message)
      })

  }
  return (
    <>

      <form onSubmit={handleSubmit(handleSignIn)} className="hero">

        <div className="hero-content flex flex-col gap-16 lg:gap-40  lg:flex-row">
          <div className="text-center lg:text-left max-w-lg">
            <img className='login' src="https://i.gifer.com/IGCF.gif" alt="" />
          </div>

          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className='text-2xl font-bold text-center mt-4'>Login</h1>

            <div className="card-body">
              <div className="form-control" style={{ border: 'none' }}>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" {...register('email')} placeholder="email" className="input input-bordered w-full" />
              </div>
              <div className="form-control" style={{ border: 'none' }}>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password"{...register("password")} className="input input-bordered w-full" />
                <label className="label">
                  <h2 className="label-text-alt link link-hover text-lg">Are you new here ? <Link to="/signup" className="text-xl font-semibold text-red-600">Signup</Link> </h2>
                </label>
              </div>
              <div className="form-control" style={{ border: 'none', width: '100%' }}>
                <button className="btn btn-active text-white bg-[#65ad07] hover:bg-[#549401] w-full">Login</button>

                <div className='flex justify-center hover:cursor-pointer hover:underline mt-3'onClick={handleSignInWithGoogle}>
                <div className='flex items-center gap-1 font-medium'><FcGoogle className='text-4xl' /> <span>Login With Google</span> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </>
  );
};

export default Login;