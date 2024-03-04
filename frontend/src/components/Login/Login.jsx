import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../utils/API.js";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
// import Loader from './Loader/Loader';

const Login = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  const [popup, setPopup] = useState();
  const navigate = useNavigate();

  function load() {
    log(pseudo, password);
  }

  async function log(pseudo, password) {
    let result = await API.login(pseudo, password);

    if (!result.token) {
      setPopup(result);
    } else {
      localStorage.setItem("token", result["token"]);
      localStorage.setItem("user", JSON.stringify(result["user"]));
      if (localStorage.getItem("user")) {
        navigate("/");
        navigate(0);
      }
    }
  }

  // isLoading || (!isLoading && authUser) ? 'Loading...' :
  return (
    <>
      <section className="h-full">
        <h1 className="text-3xl font-bold text-yellow-300">Akkor Hotel Itd</h1>
        <div className="container px-6 pt-10 text-white">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
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
                {popup ? <Alert severity="error">{popup}</Alert> : ""}
                {/* <!-- Pseudo input --> */}

                <div
                  className="relative mb-6 mt-6 flex flex-col"
                  data-te-input-wrapper-init
                >
                  <label className="text-start " htmlFor="pseudo">
                    Pseudo
                  </label>
                  <input
                    className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
                    type="pseudo"
                    id="pseudo"
                    placeholder="Pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                  />
                </div>
                {/* <!-- Password input --> */}
                <div
                  className="relative mb-6 flex flex-col"
                  data-te-input-wrapper-init
                >
                  <label className="text-start" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all duration-200"
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
                      htmlFor="checkbox"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="create-account mb-4">
                  <span>
                    Don't have account ?{" "}
                    <Link
                      to={".././sign-up"}
                      className="underline text-blue transition duration-150 ease-in-out hover:text-blue-500 focus:text-blue-500 active:text-blue-700 mx-2"
                    >
                      Signup Here
                    </Link>
                  </span>
                </div>
                {/* <!-- Submit button --> */}
                <button
                  className="inline-block w-full rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={load}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
