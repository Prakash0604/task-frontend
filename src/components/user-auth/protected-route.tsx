"use client"

import useAuthStore from '@/store/user-auth/user-auth-store';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import SkeletonLoader from '../loading/skleton-loading';
import { getUser, removeUser } from '@/utlis';

interface ProtectedRouteProps {
        children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
        const router = useRouter();
        const { profile, isLoading, fetchProfile } = useAuthStore();
        useEffect(() => {
                const checkAuth = async () => {
                        const token = getUser();
                        if (!token) {
                                router.replace('/login');
                                return;
                        }

                        if (!profile) {
                                try {
                                        await fetchProfile();
                                } catch {
                                        removeUser();
                                        router.replace('/login');
                                }
                        }
                };

                checkAuth();
        }, [profile, fetchProfile, router]);
        if (isLoading) {
                return <SkeletonLoader />
        }
        return <>{children}</>;
};

export default ProtectedRoute;
