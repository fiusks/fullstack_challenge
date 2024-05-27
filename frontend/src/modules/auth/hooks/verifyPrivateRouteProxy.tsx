'use client'

import { useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { selectAuthToken } from '@/lib/features/authSlice';

export function VerifyPrivateRouteProxy( props: React.PropsWithChildren<{}>) {
  const { children } = props;
  
  const token = useAppSelector(selectAuthToken);
  const router = useRouter();
  const pathname = usePathname().replace(/^\//, '');
  
  useLayoutEffect(() => {
  
    const privateRoutes = [
      'account',
       'cart',
     ];

    if (privateRoutes.includes(pathname) && !token) {
       router.push('/login');
       return;
    }
  }, [pathname, router,token])

  return (
    <>
      {children}
    </>
  )
}