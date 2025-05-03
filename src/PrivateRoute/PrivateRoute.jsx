import React, { useContext } from 'react'
import { AuthContext } from '../AuthProvider/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    
    const {user , loading} = useContext(AuthContext);

    if(loading && !user){
        return <div className='h-screen flex justify-center items-center'>
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    }

    if(user){
        return children
    }

    else{
        return <Navigate to="/login"></Navigate>
    }
  
}
