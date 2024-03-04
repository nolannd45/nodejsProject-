import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../../contexts/auth";



const Signup = () => {
  const navigate = useNavigate();

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const { setAuthUser } = useAuth();
  const { authUser } = useAuth();

  // useEffect(() => {
  //     if (authUser) {
  //         if (authUser.displayName) {
  //             if (authUser.displayName !== undefined) {
  //                 navigate('/')
  //             }
  //         }
  //         console.log("Signed IN");
  //     }
  //     // eslint-disable-next-line
  // }, [authUser]);

  useEffect(() => {
    if (authUser) {
      navigate("/");
      console.log("Signed IN");
    }
    // eslint-disable-next-line
  }, [authUser]);

  const signupHandler = async () => {
    setFullName(`${fName} ${lName}`);

    // let fullName = `${fName} ${lName}`;
    if (email.length < 5 || !fullName || password !== cPassword) return;

    try {
      const user = await createUserWithEmailAndPassword(auth, email, cPassword);

      const success = await updateProfile(auth.currentUser, {
        displayName: fullName,
      });

      if (success) {
        setAuthUser({
          userId: user.uid,
          Email: user.email,
          Name: fullName,
        });
        toast.success(`Signup successful`);
        // toast.success(`Login successful`)
      }
    } catch (error) {
      console.log("Error From signupHandler", error);
      toast.error(`Signup Failed : ${error.message}`);
    }
  };
  


  // if (authUser) {
  //     if (authUser.displayName) {
  //         if (authUser.displayName !== undefined) {
  //             navigate('/')
  //         }
  //     }
  //     console.log("Signed IN");
  // }

  return (
    <>
      <section className="h-full">
        <div className="container px-6 pt-20">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* <!-- Left column container with background--> */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone"
              />
            </div>

            {/* <!-- Right column container with form --> */}
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12 text-white">
              <form onSubmit={(e) => e.preventDefault()}>
                {/* <!-- Name input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <div className="flex gap-2 ">
                    <div>
                      <label className="" htmlFor="fname">
                        First Name
                      </label>
                      <input
                        className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                        type="text"
                        id="fName"
                        placeholder="First Name"
                        required
                        minLength={2}
                        value={fName}
                        onChange={(e) => setfName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="" htmlFor="lName">
                        Last Name
                      </label>
                      <input
                        className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                        type="text"
                        id="lname"
                        placeholder="Last Name"
                        value={lName}
                        onChange={(e) => setlName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- Email input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <label className="" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                    id="email"
                    placeholder="Email address"
                    required
                    minLength={2}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <div className="flex gap-2 ">
                    <div>
                      <label className="" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                        type="password"
                        id="password"
                        placeholder="Password"
                        minLength={8}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="" htmlFor="cPassword">
                        Confirm Password
                      </label>
                      <input
                        className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                        type="password"
                        id="cPassword"
                        placeholder="Confirm Password"
                        minLength={8}
                        required
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {cPassword === password || cPassword.length < 1 ? (
                  ""
                ) : (
                  <span className="text-red-600 text-center pb-2">
                    Confirm Password not matched!
                  </span>
                )}

                <div className="create-account mb-4">
                  <span>
                    Already have account ?{" "}
                    <Link
                      to={".././login"}
                      className="underline text-blue transition duration-150 ease-in-out hover:text-blue-500 focus:text-blue-500 active:text-blue-700 mx-2"
                    >
                      Login Here
                    </Link>
                  </span>
                </div>
                {/* <!-- Submit button --> */}
                <button
                  className="inline-block w-full rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={signupHandler}
                >
                  Sign up
                </button>

                {/* <!-- Divider --> */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                    OR
                  </p>
                </div>
               
            
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
