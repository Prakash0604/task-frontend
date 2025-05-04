"use client"

import React from 'react'
import Container from '@/components/containers/main-container'
import DefaultLayout from '@/components/default-layout'
import CreateUser from '@/components/forms/create-user'
import { Button } from '@/components/ui/button'
import ProtectedRoute from '@/components/user-auth/protected-route'
import UserList from '@/components/users/user-page'
import {
        Dialog,
        DialogTrigger,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogDescription,
} from '@/components/ui/dialog'
import { UserPlus } from 'lucide-react'

const UserPage = () => {
        return (
                <ProtectedRoute>
                        <DefaultLayout>
                                <Container className='flex flex-col gap-4 py-12'>
                                        <Container className='flex justify-end items-center w-full px-6 gap-4'>
                                                <Dialog  >
                                                        <Container className="w-full flex justify-end   px-8">
                                                                <DialogTrigger asChild >
                                                                        <Button className='flex items-center shadow-lg dark:shadow-emerald-200'>Add users <UserPlus size={16} /></Button>
                                                                </DialogTrigger>
                                                        </Container>

                                                        <DialogContent className="sm:max-w-[600px] bg-[#F2F5F7] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-blue-500">
                                                                <DialogHeader>
                                                                        <DialogTitle></DialogTitle>
                                                                        <DialogDescription></DialogDescription>
                                                                </DialogHeader>

                                                                <CreateUser />


                                                        </DialogContent>
                                                </Dialog>
                                        </Container>

                                        <UserList />
                                </Container>
                        </DefaultLayout>
                </ProtectedRoute>
        )
}

export default UserPage
