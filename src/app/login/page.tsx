"use client"

import LoginForm from '@/components/forms/login-form'
import PublicRoute from '@/components/user-auth/public-route'
import React from 'react'

const page = () => {
        return (
                <PublicRoute>
                        <LoginForm />
                </PublicRoute>
        )
}

export default page