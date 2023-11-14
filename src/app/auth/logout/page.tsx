"use client";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import Swal from 'sweetalert2';

function Logout() {
  const router = useRouter();

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
        const close = await signOut();
        console.log(close)
        router.push('/'); 
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  };

  return (
    <div>
      {/* <button onClick={handleLogout}>Cerrar Sesión</button> */}
      <button onClick={handleLogout}>Cerrar</button>
    </div>
  );
}

export default Logout;
