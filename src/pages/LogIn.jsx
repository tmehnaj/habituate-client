import React, { useContext, useRef, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router';

import { toast } from 'react-toastify';
import { AuthContext } from '../context/Context';

const LogIn = () => {
    const [show, setShow] = useState(false);
      const { signInUser, googleSignIn, setUser, setLoading } = useContext(AuthContext);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();

  const handleEmailOnChange = (e) => {
    const email = e.target.value;
    const regxForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailDomains = [
      // Popular public email providers
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      "aol.com",
      "protonmail.com",
      "zoho.com",

      // Educational domains
      "harvard.edu",
      "mit.edu",
      "stanford.edu",
      "ox.ac.uk",

      // Government domains
      "usa.gov",
      "gov.uk",
      "bangladesh.gov.bd",

      // Organization / NGO
      "unicef.org",
      "who.int",
      "redcross.org",

      // Example company domains
      "google.com",
      "microsoft.com",
      "tesla.com"
    ];
    const domain = email.split('@')[1];
    ;
    if (!email.trim()) { setError('Email is required') }
    else if (!email.includes('@')) { setError('Email must contain @') }
    else if (email.startsWith('@') || email.endsWith('@')) { setError('email can not starts or ends with @') }
    else if (!emailDomains.includes(domain)) { setError('please provide a correct domain') }
    else if (!regxForEmail.test(email)){ setError('please enter a valid email address!') }
    else{setError('')}
  }


  const handleLogIn = (e) => {
    //console.log('event from login button',e);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    //clean
    setError('');
    signInUser(email, password)
      .then(result => {
        const loggedInUser = result.user;
        setUser(loggedInUser);
        toast.success('Log In Successfully!');
        e.target.reset();
        setLoading(false);
        navigate(location?.state || '/');
      })
      .catch(err => {
        //  console.log(err.message);

        if (err.code === 'auth/invalid-email') {
          setError('Invalid email address. Please enter a valid one.');
        }
        else if (err.code === 'auth/user-disabled') {
          setError('This account has been disabled. Please contact support.');
        }
        else if (err.code === 'auth/user-not-found') {
          setError('No user found with this email.');
        }
        else if (err.code === 'auth/wrong-password' || err.message.includes('invalid-credential')) {
          setError('Wrong email or password.');
        }
        else if (err.code === 'auth/too-many-requests') {
          setError('Too many failed attempts. Please try again later.');
        }
        else if (err.code === 'auth/network-request-failed') {
          setError('Network error. Check your internet connection.');
        }
        else {
          setError('Something went wrong. Please try again later.');
        }
        setLoading(false);
      })
  }


  
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const newUser = result.user;
        setUser(newUser);
        setLoading(false);
        // toast.success('LogIn Successful!');
        navigate('/#');
      })
      .catch(err => {
        // toast.error(err.message);
        // console.log(err);
        setError(err.message);
        setLoading(false);
      })

  }


    return (
        <div className="min-h-[calc(100vh-20px)] flex items-center justify-center  relative overflow-hidden">
            {/* Animated glow orbs
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-xl bottom-10 right-10 animate-pulse"></div>
      </div> */}


            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-accent-content">
                {/* Left section */}
                <div className="max-w-lg text-center lg:text-left">
                    <h1 className="text-5xl font-extrabold drop-shadow-lg">
                        Welcome Back!
                    </h1>

                </div>

                {/* Login card */}
                <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
                    <form onSubmit={handleLogIn} className="space-y-4">
                        <h2 className=" mb-2 text-center">
                            LogIn Now
                        </h2>

                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input
                                onChange={handleEmailOnChange}
                                type="email"
                                name="email"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your Email"
                                className="input input-bordered w-full bg-white/20 text-accent-content focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-lg"
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm mb-1">Password</label>
                            <input
                                type={show ? "text" : "password"}
                                name="password"
                                placeholder="Enter Your Password"
                                autoComplete="off"
                                autoCorrect="off"
                                className="input input-bordered w-full bg-white/20 text-accent-content focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-lg"
                            />
                            <span
                                onClick={() => setShow(!show)}
                                className="absolute right-3 top-9 cursor-pointer z-50"
                            >
                                {show ? <FaEye /> : <IoEyeOff />}
                            </span>
                             <p
                            className="hover:underline cursor-pointer"
                        >
                            Forget password?
                        </p>
                        </div>

                       

                        <button type="submit" className="btn2">
                            Login
                        </button>

                         {/* error */}
              {
                error ? <p className='text-red-700 font-semibold'>{error}</p> : ''
              }

                        {/* Divider */}
                        <div className="flex w-full flex-col">
                            <div className="divider">or</div>
                        </div>
                        {/* <div className="flex items-center justify-center gap-2 my-2">
                <div className="h-px w-16 bg-white/30"></div>
                <span className="text-sm text-white/70">or</span>
                <div className="h-px w-16 bg-white/30"></div>
              </div> */}

                        {/* Google Signin */}
                        <button
                        onClick={handleGoogleSignIn}
                            type="button"
                            className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-1.5 rounded-lg w-full font-semibold transition-colors cursor-pointer outline-2 outline-primary hover:bg-accent hover:text-white"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="google"
                                className="w-5 h-5"
                            />
                            Continue with Google
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default LogIn;