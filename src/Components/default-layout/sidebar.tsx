import React from 'react';
import Container from '../containers/main-container';
import { Home, Info, Phone, LogIn } from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
        name: string;
        link: string;
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const menu: MenuItem[] = [
        { name: "Dashboard", link: "/", icon: Home },
        { name: "About", link: "/about", icon: Info },
        { name: "Contact", link: "/contact", icon: Phone },
        { name: "Login", link: "/login", icon: LogIn },
];

const Sidebar = () => {
        return (
                <Container className="max-h-screen xl:w-[22%] bg-[var(--taskmandu-background)] xl:flex hidden border-r border-gray-200 py-12 px-6 flex-col items-center ">
                        <h1 className="text-xl font-bold text-[var(--taskmandu-primary)]">TaskMandu</h1>
                        <Container className="grid grid-cols-2 gap-4 h-[40%] w-full">
                                {menu.map((item, index) => (
                                        <div
                                                key={`${item.name}-${index}`}
                                                className="rounded-md  flex items-center justify-center"
                                        >
                                                <Link href={item.link} className="flex items-center flex-col justify-center">
                                                        <item.icon className="text-black" />
                                                        <h1 className="text-black">{item.name}</h1>
                                                </Link>
                                        </div>
                                ))}
                        </Container>
                </Container>
        );
};

export default Sidebar;