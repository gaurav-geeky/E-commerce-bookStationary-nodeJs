import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import "./App.css"

const Layout = () => {

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <div>
                <div>
                    <Header setSearchQuery={setSearchQuery} />
                </div>

                <div className="page-content" >
                    <Outlet context={{ searchQuery }} />
                </div>

                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Layout
