import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const links = <>
        <NavLink to='/'><li className="px-2 pb-0.5 border-b-2 border-transparent">Home</li></NavLink>
      <NavLink to='/apps'><li className="px-2 pb-0.5 border-b-2 border-transparent">Apps</li></NavLink>
      <NavLink to='/installation'><li className="px-2 pb-0.5 border-b-2 border-transparent">Installation</li></NavLink>
      </>

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
            <img className='h-10 w-10' src="" alt="" />
            <span className="text-xl font-medium text-transparent bg-clip-text bg-linear-[-75deg,#9F62F2,#632EE3]">Habituate</span>
            </div></Link>
        {/* <a className="text-xl font-medium">Book Palace</a> */}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        {links}
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="https://github.com/tmehnaj">
        <button className="gradient-btn-primary">Contribute</button>
        </Link>
      </div>
    </div>
    </nav>
    );
};

export default Navbar;