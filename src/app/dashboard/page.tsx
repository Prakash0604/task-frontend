"use client"

import ProtectedRoute from '@/components/user-auth/protected-route'
import React from 'react'
const Dashboard = () => {
        return (
                <ProtectedRoute>
                        <div>Dashboard</div>
                </ProtectedRoute>
        )
}

export default Dashboard