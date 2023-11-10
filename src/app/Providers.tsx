// "use client"

// import { SessionProvider } from 'next-auth/react';

// interface Props{
//     children: React.ReactNode;
// }
// function Providers({children}: Props){
//     return<SessionProvider>{children}</SessionProvider>
// }

// export default Providers

"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SessionProvider } from 'next-auth/react';
import { ThemeProviderProps } from "next-themes/dist/types"

interface ProvidersProps {
  children: React.ReactNode;
}

function Providers({ children }: ProvidersProps & ThemeProviderProps) {
  return (
    <NextThemesProvider>
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  );
}

export default Providers;
