import React from 'react'
import authService from '../appwrite/auth'
import { useState } from 'react'
import { useEffect } from 'react'
import Container  from '../components/container/Container'
import loginImg from '../images/login.png'
import welcomeImg from '../images/welcome.png'

function Home() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                var user = authService.getCurrentUser.name

                setUser(currentUser)
            } catch (error) {
                console.log('Error fetching current user name', error);
            }
        }
        fetchUser()
    }, [])



    return (
        <Container>
        <div className='bg-black text-white h-screen'>
            {user ? (
                <div className='flex justify-around items-center my-32 gap-5'>
                    <h1 className='text-8xl font-bold text-center'>Welcome {user.name}</h1>
                    <img src={welcomeImg} alt="Login Image" className='w-96 h-64'/>
                </div>
            ) : (
            <div className='flex justify-around items-center my-32 gap-5'>
                <h1 className='text-8xl font-bold text-center'>Login first</h1>
                <img src={loginImg} alt="Login Image" className='h-64'/>
            </div>
        )}
        </div>
        </Container>
    )

}

export default Home