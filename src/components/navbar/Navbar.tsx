"use client"


import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { Session } from "next-auth";

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  
  const loadSession = async () => {
    const result = await getSession();
    setSession(result);
    
  };
 

  useEffect(() => {
    loadSession()
  
  }, []);

  const handleLogout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro de que deseas cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'No, cancelar',
    });

    if (isConfirmed) {
      try {
        await signOut();
        loadSession();
        router.push('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  };
console.log(session)
  return (
    <nav className="flex justify-between bg-gray-800 px-24 items-center py-3">
      <h1 className="text-3xl font-bold ">App</h1>
      <ul className=" flex gap-x-2">
        <Link href="/">Home</Link>
        {!session ? (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>LogOut</button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

