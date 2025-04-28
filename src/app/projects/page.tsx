"use client"

import DefaultLayout from '@/Components/default-layout'
import ProjectsTable from '@/Components/tables/project-tables'
import ProtectedRoute from '@/Components/user-auth/protected-route'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import Container from '@/Components/containers/main-container'
const Projects: React.FC = () => {

        return (
                <ProtectedRoute>
                        <DefaultLayout>
                                <Container className=" p-4 md:p-8 bg-gray-50">
                                        <Container className=" mx-auto space-y-6">
                                                <Container>
                                                        <h1 className="text-3xl font-bold tracking-tight">Project Dashboard</h1>
                                                        <p className="text-gray-500 mt-1">Manage and track all your projects in one place.</p>
                                                </Container>

                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle>Projects</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <ProjectsTable />
                                                        </CardContent>
                                                </Card>
                                        </Container>
                                </Container>
                        </DefaultLayout>
                </ProtectedRoute>
        )
}

export default Projects