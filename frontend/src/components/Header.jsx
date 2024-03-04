
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/auth';

const Header = () => {
    const [profileBtnValue, setProfileBtnValue] = useState('');

    console.log(profileBtnValue);
    const navigate = useNavigate();
    const { signOut, authUser } = useAuth();

    useEffect(() => {
        try {
            if (profileBtnValue === 'logout') {
                navigate('/login')
                toast.success('Successfully logged out')
            }
        } catch (error) {
            console.error(error);
        }

        // eslint-disable-next-line
    }, [profileBtnValue])


    return (
        <header className='flex flex-col md:flex-row items-center justify-between px-4 h-14 text-center shadow-2xl bg-[#4B0082] mb-2 text-white w-full sticky top-0 z-10'>
            <div className='text-3xl font-bold'>
                <Link to={'/'} className='hover:text-gray-400 duration-100'>Hotelians</Link>
            </div>
            <div className='text-xl '>
                <Link to={'/hotels'} className='mx-2 hover:scale-105 hover:text-slate-400'>Top-hotels</Link>
                <Link to={'/about'} className='mx-2 hover:scale-105 hover:text-slate-400'>About</Link>
                <Link to={'/contact'} className='mx-2 hover:scale-105 hover:text-slate-400'>Contact</Link>
                <select className='bg-black text-white font-semibold rounded-full p-3 cursor-pointer ' onChange={(e) => { setProfileBtnValue(e.target.value) }}>Profile
                    <option value="profile" className='cursor-pointer text-2xl'>Profile</option>
                    <option value="logout" className='cursor-pointer text-2xl' onClick={signOut}>Logout</option>
                </select>


                {/* <button onClick={toggleNav}>Toggle</button> */}
            </div>
        </header>
    )
}

export default Header;