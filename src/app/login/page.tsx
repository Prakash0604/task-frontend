"use client"
import Container from '@/components/containers/main-container'
import LoginForm from '@/components/forms/login-form'
import LoginSVG from '@/components/forms/login-svg'
import PublicRoute from '@/components/user-auth/public-route'
import React from 'react'
const page = () => {
        return (
                <PublicRoute>
                        <Container className='max-w-screen overflow-hidden flex  justify-between '>
                                <Container className='w-[65%] md:flex items-center justify-center hidden'>
                                        <LoginSVG />
                                </Container>
                                <LoginForm />
                        </Container>
                </PublicRoute>
        )
}

export default page