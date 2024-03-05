import React from 'react'
import { useParams } from 'react-router-dom'

const Dashtask = () => {
    const { userId } = useParams();

    return (
        <div className='bg-gradient-to-r from-purple-800 to-pink-500 flex items-center justify-center h-screen'>
            <div className="flex flex-col items-center">
                <h1 className="text-9xl font-bold text-white">Usuario {userId}</h1>
                <h2 className="text-4xl font-bold text-white mt-10">Se inició sesión, aquí se presentará el Dashboard</h2>
            </div>
        </div>
    )
}

export default Dashtask