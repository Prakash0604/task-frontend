import React from 'react'
import Header from './header'
import Container from '../containers/main-container'
import { ReactNode } from 'react';
import Sidebar from './sidebar';
import Tabs from './tabs';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
        return (
                <>
                        <Container className='flex w-screen  min-h-screen'>
                                <Sidebar />
                                <Container className=' w-full flex flex-col relative'>
                                        <Header />
                                        <Container className='w-full pt-20'>
                                                {children}
                                        </Container>
                                        <Tabs />
                                </Container>
                        </Container >

                </>
        )
}

export default DefaultLayout