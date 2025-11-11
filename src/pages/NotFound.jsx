import React from 'react';
import { useNavigate } from 'react-router';
import notFoundImg from '../assets/not-found.jpg'

const NotFound = () => {
    const navigate = useNavigate();
    return (
         <div className='container mx-auto mt-5 mb-15 flex flex-col items-center justify-center space-y-2 min-h-screen text-center'>
            <figure>
                <img src={notFoundImg} alt="error-404" />
            </figure>
            <h1 className='font-bold text-5xl text-neutral'>Oops, page not found!</h1>
            <p className='text-accent-content my-3'>The page you are looking for is not available.</p>
        <div className='flex items-center justify-between gap-3 '>
                        <button onClick={() => { navigate(-1) }} className="btn1">Go Back!</button>
            <button onClick={() => { navigate('/') }} className="btn1-fill">Go Home!</button>

        </div>


        </div>
    );
};

export default NotFound;