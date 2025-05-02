"use client"


import DefaultLayout from '@/components/default-layout'
import ProtectedRoute from '@/components/user-auth/protected-route'
import UserList from '@/components/users/user-page'
import React from 'react'

const UserPage = () => {


        return (
                <ProtectedRoute>
                        <DefaultLayout>
                                <UserList />
                        </DefaultLayout>
                </ProtectedRoute>
        )
}

export default UserPage