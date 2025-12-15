
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './Pages/Home'

import AdminLogin from './Admin/AdminLogin'
import AdminDashboard from './Admin/AdminDashboard'
import AddProduct from './Admin/AddProduct'

function App() {


  return (
    <>
      <div>

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
          </Route>
          
          <Route path='adminlogin' element={<AdminLogin />} />
        </Routes>

        <Routes>
          <Route path='/admindash' element={<AdminDashboard />}>
            <Route path='addproduct' element={<AddProduct />} />
          </Route>

        </Routes>



      </div>
    </>
  )
}

export default App
