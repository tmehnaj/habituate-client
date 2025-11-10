import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import logoImg from '../assets/logo.png'
import userIcon from '../assets/user.png'
import { AuthContext } from '../context/Context';
import { FaUser } from 'react-icons/fa';
import { IoLogIn } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Navbar = () => {
  const {user, loading, logOutUser} = useContext(AuthContext);

  const links = <>
    <NavLink to='/'><li className="px-2 pb-0.5 border-b-2 border-transparent">Home</li></NavLink>
     <NavLink to='/about'><li className="px-2 pb-0.5 border-b-2 border-transparent">About</li></NavLink>
    <NavLink to='/apps'><li className="px-2 pb-0.5 border-b-2 border-transparent">Community</li></NavLink>
    <NavLink to='/installation'><li className="px-2 pb-0.5 border-b-2 border-transparent">MyHabits</li></NavLink>
  </>

  const handleLogOut = ()=>{
    
    logOutUser()
      .then(() => {
        toast.success('Log Out Successfully!');
        // setLoading(false);
      })
      .catch(err => {
       // console.log(err);
      })
  }
  
  

  return (
    <nav className=" bg-base-100 shadow-sm">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pr-3 pl-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              {links}
            </ul>
          </div>
          <Link to="/"><div className='flex gap-2 items-center'>
            <img className='h-10 w-10' src={logoImg} alt="" />
            <span className="text-xl font-bold text-primary">Habituate</span>
          </div></Link>
          {/* <a className="text-xl font-medium">Book Palace</a> */}
        </div>
        {/* <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        {links}
        </ul>
      </div> */}
        <div className="navbar-end">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {links}
            </ul>
          </div>

          
           {loading ? (
          <span></span>
        ) : user ? (
        
 <div className="dropdown dropdown-end z-50">
  <div
    tabIndex={0}
    role="button"
    className="btn btn-ghost btn-circle avatar hover:opacity-90 transition"
  >
    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
      <img
        src={user?.photoURL || userIcon}
        alt="User avatar"
        referrerPolicy="no-referrer"
        className="object-cover w-full h-full"
      />
    </div>
  </div>

  <div
    tabIndex={-1}
    className="dropdown-content menu shadow-lg border border-gray-200 bg-white rounded-lg mt-3 w-72 px-6 py-6 space-y-6 transition-all text-center"
  >
    {/* Profile Info */}
    <div className="border-b border-accent-content pb-5">
      <p className="text-lg font-semibold text-neutral">
        {user?.displayName}
      </p>
      <p className="text-sm text-accent-content break-all mt-1">
        {user?.email}
      </p>
    </div>

    {/* Buttons Side-by-Side */}
    <div>
      <div className="grid grid-cols-2 gap-3 ">
        <Link to="/myProfile"><button className="w-full btn1">
          Profile
        </button></Link>

        <button onClick={handleLogOut} className="w-full btn1-fill">
          Logout
        </button>
      </div>
    </div>
  </div>
</div>

        ) : (
          <Link
            to={"/login"}
            className="btn1"
          >
            {" "}
            <IoLogIn /> Login
          </Link>
        )}

          {/* <Link to="/login">
            <button className="btn1"> LogIn </button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;