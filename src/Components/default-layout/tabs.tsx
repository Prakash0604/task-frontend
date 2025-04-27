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
        { name: 'Dashboard', link: '/', icon: Home },
        { name: 'About', link: '/about', icon: Info },
        { name: 'Contact', link: '/contact', icon: Phone },
        { name: 'Login', link: '/login', icon: LogIn },
];

const Tabs = () => {
        return (
                <Container className="xl:hidden flex absolute bottom-0 left-0 w-full md:py-4 py-2 md:px-8 px-4 z-50">
                        <Container className=" w-full p-4 rounded-full flex items-center  border border-gray-200">
                                {menu.map((item, index) => (
                                        <Link
                                                key={`${item.name}-${index}`}
                                                href={item.link}
                                                className="flex flex-col w-full items-center justify-center"
                                        >
                                                <item.icon className="text-black w-6 h-6" />
                                                <span className="text-black text-sm">{item.name}</span>
                                        </Link>
                                ))}
                        </Container>
                </Container>
        );
};

export default Tabs;