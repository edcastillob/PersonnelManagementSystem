"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Theme from "../theme/Theme";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownPositionOpen, setDropdownPositionOpen] = useState(false);
  const [isDropdownUbicationOpen, setDropdownUbicationOpen] = useState(false);

  const handleLogout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Are you sure you want to log out??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!, Logout",
      cancelButtonText: "No!, cancel",
    });

    if (isConfirmed) {
      try {
        await signOut();
        router.push("/");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  };
  return (
    <nav className="flex justify-between bg-gray-800 px-24 items-center py-3">
      <h1 className="text-3xl font-bold ">App</h1>
      <Theme />
      <ul className=" flex gap-x-2">
        <Link href="/">Home</Link>
        {!session ? (
          <>
            <div className="relative">
              <a
                onClick={() => {
                  setDropdownOpen(!isDropdownOpen);
                }}
              >
                Department
              </a>
              {isDropdownOpen && (
                <div className="absolute text-white text-center shadow-lg flex flex-col items-start mt-2 space-y-2">
                  <Link
                    href="/employee/department/all"
                    onClick={() => setDropdownOpen(false)}
                  >
                    All
                  </Link>
                  <Link
                    href="/employee/department/create"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Create
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <a
                onClick={() => {
                  setDropdownPositionOpen(!isDropdownPositionOpen);
                }}
              >
                Position
              </a>
              {isDropdownPositionOpen && (
                <div className="absolute text-white text-center shadow-lg flex flex-col items-start mt-2 space-y-2">
                  <Link
                    href="/employee/position/all"
                    onClick={() => setDropdownPositionOpen(false)}
                  >
                    All
                  </Link>
                  <Link
                    href="/employee/position/create"
                    onClick={() => setDropdownPositionOpen(false)}
                  >
                    Create
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <a
                onClick={() => {
                  setDropdownUbicationOpen(!isDropdownUbicationOpen);
                }}
              >
                Ubication
              </a>
              {isDropdownUbicationOpen && (
                <div className="absolute text-white text-center shadow-lg flex flex-col items-start mt-2 space-y-2">
                  <Link
                    href="/employee/ubication/all"
                    onClick={() => setDropdownUbicationOpen(false)}
                  >
                    All
                  </Link>
                  <Link
                    href="/employee/ubication/create"
                    onClick={() => setDropdownUbicationOpen(false)}
                  >
                    Create
                  </Link>
                </div>
              )}
            </div>
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
