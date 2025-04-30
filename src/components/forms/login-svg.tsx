import React from 'react'
import loginImage from '@/assets/login.svg'
import Image from 'next/image'
const LoginSVG = () => {
        return (
                <Image src={loginImage} alt='login' height={600} width={600} className='object-cover ' />
        )
}

export default LoginSVG