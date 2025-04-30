"use client"


import DefaultLayout from '@/components/default-layout'
import ProtectedRoute from '@/components/user-auth/protected-route'
import useUsersStore from '@/store/user-store/get-user-store'

import React, { useEffect } from 'react'

const UserPage = () => {
        const { users, fetchUsers } = useUsersStore()
        useEffect(() => {
                if (!users || users.length === 0) {
                        fetchUsers()
                }
        }, [users, fetchUsers])

        return (
                <ProtectedRoute>
                        <DefaultLayout>
                                <div>UserPage</div>
                        </DefaultLayout>
                </ProtectedRoute>
        )
}

export default UserPage