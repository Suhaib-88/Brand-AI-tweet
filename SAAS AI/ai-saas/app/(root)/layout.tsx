import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'


export default function RootLayout({
    children
}: {children: React.ReactNode}){
    return (
    <main className='root'>
        <div className='wrapper'>
            {children}
        </div>
    </main>)
}