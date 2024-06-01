import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
  }
  const handleSubmit = async(e  ) =>{
      e.preventDefault();
      //setLoading(true);
      dispatch(signInStart());
      try {
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        console.log(data);
        if(data.success === false){
          //setLoading(false);
          //setError(data.message);
          dispatch(signInFailure(data.message));
          return;
        }
        //setLoading(false);
        //setError(null);
        dispatch(signInSuccess(data));
        navigate('/');
      } catch (error) {
       // setLoading(false);
       // setError(error.message);
       dispatch(signInFailure(error.message));
      }
    
  }
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       
        <input type="email" placeholder='email' id="email"
        className='border p-3 rounded-lg' onChange={handleChange}></input>
        <input type="password" placeholder='password' id="password"
        className='border p-3 rounded-lg' onChange={handleChange}></input>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-95'>{loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth />
      </form>
      <div className='flex gap-3 mt-4'>
        <p>Dont have an account ?</p>
        <Link className='text-blue-700' to={"/sign-up"}>Sign Up</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
