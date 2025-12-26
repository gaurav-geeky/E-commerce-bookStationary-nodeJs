import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import "./App.css"

const Layout = () => {
    return (
        <>
            <div>
                <div>
                    <Header />
                </div>

                <div className="page-content" >
                    <Outlet />
                </div>

                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Layout
