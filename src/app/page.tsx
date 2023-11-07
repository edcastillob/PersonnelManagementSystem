"use client"
import { useEffect, useState } from "react";
import {  getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from 'next/navigation';



const HomePage = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

    const loadSession = async () => {
    const result = await getSession();
    setSession(result);
    
  }; 

  useEffect(() => {
    loadSession()
    router.push('/')
    router.refresh();
    console.log(session?.user)
  }, []);

  return (
    <section className="h-[calc(100vh-7rem)] justify-center items-center flex">

    <div>
      {
        session && (<h1>Welcome {session.user?.email}</h1>)
      }
      <h1 className="text-3xl">Home</h1>
    </div>
    </section>
  );
};

export default HomePage;
