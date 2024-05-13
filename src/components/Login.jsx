import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import  Input  from './Input'
import {useForm} from 'react-hook-form'

function Login() {
    const [error, setError] = useState()
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = async(data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = authService.getCurrentUser()
                if(userData) dispatch(authLogin(data))
                navigate('/')
                }

        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full my-12'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <h1 className='text-lg text-black'>LOGO</h1>
                    </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-700 text-center text-lg'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <Input 
            label = 'Email: '
            type = 'email'
            placeholder = 'Enter your email'
            {...register('email', {
                required: true,
                validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
            })}
            />

            <Input 
            label = 'Password: '
            type = 'password'
            placeholder = 'Enter your password'
            {...register('password', {
                required: true
            })}
            />

            <button type='submit' className='px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-400 text-white'>
                Login
            </button>
        </form>
        
        </div>
    </div>
  )
}

export default Login