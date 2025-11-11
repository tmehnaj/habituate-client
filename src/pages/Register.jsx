import React, { useContext, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { AuthContext } from '../context/Context';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Register = () => {
  const [show, setShow] = useState(false);
    const [error, setError] = useState('');
  const { createUser, setUser, googleSignIn, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
  //  console.log(e.target);
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    //clean
    setError('');

    //regular expression for password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordPattern.test(password)) {
      setError('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter');
      return;
    }
    createUser(email, password)
      .then(result => {
        const newUser = result.user;
        setUser(newUser);
        setLoading(false);
        toast.success('Your account has been created successfully!');
        e.target.reset();
        navigate('/');
      })
      .catch(err => {
       let errorMessage = err.message;
        
        // Check for common Firebase errors and provide a user-friendly message
        if (err.code === 'auth/email-already-in-use') {
            errorMessage = 'This email is already in use.';
        } else if (err.code === 'auth/invalid-email') {
            errorMessage = 'The email address is not valid.';
        } else if (err.code === 'auth/weak-password') {
            errorMessage = 'The password must be at least 6 characters.';
        }
        
      toast.error(errorMessage);
       setLoading(false);
      })
  }


   const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const newUser = result.user;
        setUser(newUser);
        // setLoading(false);
        // toast.success('LogIn Successful!');
        navigate('/');
      })
      .catch(err => {
        // toast.error(err.message);
        // console.log(err);  
        setError(err.message);
        // setLoading(false);
      })

  }
  return (
    <div className="container mx-auto my-20 flex items-center justify-center  relative overflow-hidden">
               <title>Sign Up</title>
               <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-accent-content">
                   <div className="max-w-lg text-center lg:text-left">
                       <h1 className="text-5xl font-extrabold drop-shadow-lg">Welcome to Habituate! </h1>
                   </div>
   
                   <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
                       <h2 className=" mb-2 text-center">Sign Up Now</h2>
   
                       <form onSubmit={handleSubmit} className="space-y-4">
                         
                          {/* name */}
                             <div>
                               <label className="block text-sm mb-1">Name</label>
                               <input
                                  //  onChange={handleEmailOnChange}
                                   type="text"
                                   name="name"
                                   placeholder="Your Name"
                                   className="input input-bordered w-full bg-white/20 text-accent-content focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-lg"
                               />
                           </div>
                           {/* photo */}
                              <div>
                               <label className="block text-sm mb-1">Photo Url</label>
                               <input
                                  //  onChange={handleEmailOnChange}
                                   type="text"
                                   name="photo"
                                   placeholder="Photo URL"
                                   className="input input-bordered w-full bg-white/20 text-accent-content focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-lg"
                               />
                           </div>
                           {/* email */}
                            <div>
                               <label className="block text-sm mb-1">Email</label>
                               <input
                                  //  onChange={handleEmailOnChange}
                                   type="email"
                                   name="email"
                                   required
                                   placeholder="Enter your Email"
                                   className="input input-bordered w-full bg-white/20 text-accent-content focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-lg"
                               />
                           </div>
                            {/* password */}
                           <div className="relative">
                               <label className="block text-sm mb-1">Password</label>
                               <input
                                   type={show ? "text" : "password"}
                                   name="password"
                                   required
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
                               <p className="hover:underline cursor-pointer" > Forget password</p>
                           </div>
   
                           <button type='submit' className="btn2">SignUp</button>
                           {/* error */}
                           {
                               error? <p className='text-red-700 font-semibold'>{error}</p> : ''
                           }
                   
   
                       </form>
   
   
   
                       {/* Divider */}
                       <div className="flex w-full flex-col">
                           <div className="divider">or</div>
                       </div>
   
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
                           Continue with Google </button>
                            <p>Already have an account? Please <Link to="/login" className='underline text-primary py-2'>LogIn</Link></p>
                   </div>
               </div>
   
           </div>
  );
};

export default Register;