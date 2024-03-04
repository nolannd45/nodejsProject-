import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../contexts/auth';
// import Loader from './Loader/Loader';

const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { authUser } = useAuth();



    useEffect(() => {
        if (authUser) {
            navigate('/')
            // console.log("Signed IN");
        }
        // eslint-disable-next-line
    }, [authUser]);

    const loginHandler = async () => {
        if (email.length < 5 || !password) return;
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            toast.success(`Successfully logged in`)
        } catch (error) {
            console.error('Error From loginHandler', error);
            toast.error(`Login Failed : ${error.message}`);
        }
    };
    const loginWithGoogle = async () => {
        try {
            // console.log(provider);
            const user = await signInWithPopup(auth, provider);
            console.log(user);
            toast.success(`Successfully logged in`)
            if (user) {
                navigate('/');

            }

        } catch (error) {
            console.log('Error From loginWithGoogle', error);
            toast.error(`Login Failed : ${error.message}`);
        }
    };

    const loginWithGithub = async () => {
        try {
            // console.log(provider);
            const user = await signInWithPopup(auth, githubProvider);
            console.log(user);
            toast.success(`Successfully logged in`)
            // navigate('/')

        } catch (error) {
            console.error('Error From loginWithGitHub', error);
            toast.error(`Login Failed : ${error.message}`);
        }
    };
    // isLoading || (!isLoading && authUser) ? 'Loading...' :
    return (
        <>
            <section className="h-full">
                <h1 className='text-3xl font-bold text-yellow-300'>Hotelians</h1>
                <div className="container px-6 pt-10 text-white">
                    <div
                        className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                        {/* <!-- Left column container with background--> */}
                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                            <img
                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="w-full"
                                alt="anImage"
                            />
                        </div>

                        {/* <!-- Right column container with form --> */}
                        <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                            <form onSubmit={(e) => e.preventDefault()}>
                                {/* <!-- Email input --> */}

                                <div className="relative mb-6 mt-6 flex flex-col" data-te-input-wrapper-init>
                                    <label className='text-start '
                                        htmlFor="email"
                                    >Email Address
                                    </label>
                                    <input
                                        className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                                        minLength={5}
                                        type="email"
                                        id="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {/* <!-- Password input --> */}
                                <div className="relative mb-6 flex flex-col" data-te-input-wrapper-init>
                                    <label className='text-start'
                                        htmlFor="password"
                                    >Password
                                    </label>
                                    <input
                                        className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                                        minLength={5}
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* <!-- Remember me checkbox --> */}
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue checked:bg-blue checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-500 dark:checked:border-blue dark:checked:bg-blue dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="checkbox"
                                            value=""
                                            id="checkbox"
                                        />
                                        <label
                                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="checkbox">
                                            Remember me
                                        </label>
                                    </div>

                                    {/* <!-- Forgot password link --> */}
                                    <Link
                                        to={'/forgot-password'}
                                        className="text-blue transition duration-150 ease-in-out hover:text-blue-500 focus:text-blue-500 active:text-blue-700"
                                    >Forgot password ?</Link
                                    >
                                </div>
                                <div className="create-account mb-4">
                                    <span >Don't have account ? <Link to={'.././sign-up'} className='underline text-blue transition duration-150 ease-in-out hover:text-blue-500 focus:text-blue-500 active:text-blue-700 mx-2'>Signup Here</Link></span>
                                </div>
                                {/* <!-- Submit button --> */}
                                <button

                                    className="inline-block w-full rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    onClick={loginHandler}
                                >
                                    Sign in
                                </button>

                                {/* <!-- Divider --> */}
                                <div
                                    className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p
                                        className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                        OR
                                    </p>
                                </div>

                                {/* <!-- Social login buttons --> */}
                                <Link
                                    className="flex items-center justify-center px-4 py-3 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-700 focus:outline-none bg-white my-3"
                                    onClick={loginWithGithub}
                                >
                                    <span>
                                        <svg
                                            className="w-5 h-5 text-gray-700 fill-current group-hover:text-white"
                                            viewBox="0 0 16 16"
                                            version="1.1"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span className="text-sm font-medium text-gray-800 group-hover:text-white">Github</span>

                                </Link>
                                <Link
                                    className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white bg-blue-800 hover:text-black hover:bg-slate-200 shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-500 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-500 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"

                                    onClick={loginWithGoogle}
                                >
                                    <span className='mx-2'> <FcGoogle size={24} /></span>
                                    Continue with Google
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Login