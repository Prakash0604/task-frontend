"use client"

import DefaultLayout from '@/components/default-layout'
import { Skeleton } from '@/components/ui/skeleton'
import ProtectedRoute from '@/components/user-auth/protected-route'
import useClientsStore from '@/store/clients-store/get-clients-store'
import React from 'react'

const Clients = () => {
        const { clients, fetchClients, isLoading } = useClientsStore()
        React.useEffect(() => {
                if (!clients || clients.length === 0) {
                        fetchClients()
                }
        }, [clients, fetchClients])
        console.log(clients)
        return (
                <>
                        <ProtectedRoute>
                                <DefaultLayout>
                                        {
                                                isLoading ? (
                                                        <Skeleton />
                                                ) : (
                                                        <div>page</div>
                                                )
                                        }
                                </DefaultLayout>
                        </ProtectedRoute>
                </>
        )
}

export default Clients