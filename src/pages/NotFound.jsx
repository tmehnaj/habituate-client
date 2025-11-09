import React from 'react';
import { useNavigate } from 'react-router';


const NotFound = () => {
    const navigate = useNavigate();
    return (
         <div className='container mx-auto my-10 flex flex-col items-center justify-center space-y-2 min-h-screen text-center'>
            <figure>
                <img src="" alt="error-404" />
            </figure>
            <h2 className='font-bold text-3xl'>Oops, page not found!</h2>
            <p>The page you are looking for is not available.</p>
        <div className='flex items-center justify-between gap-3'>
                        <button onClick={() => { navigate(-1) }} className="gradient-btn-primary">Go Back!</button>
            <button onClick={() => { navigate('/') }} className="gradient-btn-primary">Go Home!</button>

        </div>


        </div>
    );
};

export default NotFound;