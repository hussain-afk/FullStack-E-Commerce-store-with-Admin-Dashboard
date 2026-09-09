import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/adminComponents/Sidebar'

function RootLayout() {

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />

            <main className="
                min-h-screen

                ml-0
                md:ml-64

                p-4
                md:p-6

                pt-20
                md:pt-6
            ">
                <Outlet />
            </main>

        </div>
    )
}

export default RootLayout