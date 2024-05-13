import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Container  from '../components/container/Container'
import loginImg from '../images/login.png'
import welcomeImg from '../images/welcome.png'
import authService from '../appwrite/auth'

function Home() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await authService.getCurrentUser();
                setCurrentUser(user)
                console.log(currentUser);
            } catch (error) {
                console.log('Error fetching current user name', error);
            }
        }
        fetchUser()
    }, [])

    const authStatus = useSelector(state => state.auth.status)

    return (
        <Container>
            <div className='bg-black text-white h-screen w-full'>
                {
                    authStatus === true 
                    ? 
                        <div className='flex flex-wrap justify-around items-center mb-24 mt-12 gap-14'>
                            <h1 className='md:text-8xl text-4xl font-bold text-center'>Welcome {currentUser && currentUser.name}</h1>
                            <img src={welcomeImg} alt="Welcome Image" className='w-96 h-64'/>
                        </div>   
                    :
                        <div className='flex flex-wrap justify-around items-center mb-20 gap-14 mt-12'>
                            <h1 className='md:text-8xl text-5xl font-bold text-center'>Login first</h1>
                            <img src={loginImg} alt="Login Image" className='w-96 h-64'/>
                        </div>                }
                            
            </div>

        </Container>
    )
    
    


    // return (
    //     <Container>
    //     <div className='bg-black text-white h-screen w-full'>
    //         {!user ? (
    //         <div className='flex flex-wrap justify-around items-center mb-20 gap-14 mt-12'>
    //             <h1 className='md:text-8xl text-5xl font-bold text-center'>Login first</h1>
    //             <img src={loginImg} alt="Login Image" className='w-96 h-64'/>
    //         </div>
                
    //         ) : (
    //         <div className='flex flex-wrap justify-around items-center mb-24 mt-12 gap-14'>
    //             <h1 className='md:text-8xl text-4xl font-bold text-center'>Welcome {user.name}</h1>
    //             <img src={welcomeImg} alt="Welcome Image" className='w-96 h-64'/>
    //         </div>
    //     )}
    //     </div>
    //     </Container>
    // )

}

export default Home