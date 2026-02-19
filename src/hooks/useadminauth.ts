"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminAuth() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminKey = localStorage.getItem('natitude_admin_access');
    // You can change 'jungle_vip_2026' to whatever password you want
    if (adminKey === 'jungle_vip_2026') {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  const login = (password: string) => {
    if (password === 'jungle_vip_2026') {
      localStorage.setItem('natitude_admin_access', 'jungle_vip_2026');
      setAuthorized(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('natitude_admin_access');
    setAuthorized(false);
    router.push('/');
  };

  return { authorized, login, logout };
}