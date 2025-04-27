import React from "react";
import Header from "./header";
import Container from "../containers/main-container";
import { ReactNode } from "react";
import Tabs from "./tabs";
import SidebarComponents from "@/components/default-layout/sidebar";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
        return (
                <>
                        <Container className="flex w-screen  min-h-screen">
                                <SidebarComponents />
                                <Container className=" w-full flex flex-col relative">
                                        <Header
                                                setIsSidebarOpen={() => { }}
                                                searchQuery=""
                                                setSearchQuery={() => { }}
                                        />
                                        <Container className="w-full pt-20">{children}</Container>
                                        <Tabs />
                                </Container>
                        </Container>
                </>
        );
};

export default DefaultLayout;
