import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username' id="username"
        className='border p-3 rounded-lg'></input>
        <input type="email" placeholder='email' id="email"
        className='border p-3 rounded-lg'></input>
        <input type="password" placeholder='password' id="password"
        className='border p-3 rounded-lg'></input>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-95'>Sign Up</button>
      </form>
      <div className='flex gap-3 mt-4'>
        <p>Have an account ?</p>
        <Link className='text-blue-700' to={"/sign-in"}>Sign In</Link>
      </div>
    </div>
  )
}
