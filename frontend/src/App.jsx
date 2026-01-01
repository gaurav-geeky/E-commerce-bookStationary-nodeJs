
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './Pages/Home'

import AdminLogin from './Admin/AdminLogin'
import AdminDashboard from './Admin/AdminDashboard'
import AddProduct from './Admin/AddProduct'
import Orders from './Admin/Orders'
import ProductList from './Admin/ProductList'


import Mycart from './Pages/Mycart'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Checkout from './Pages/Checkout'
import Invoice from './Pages/Invoice'



function App() {


  return (
    <>
      <div>

        <Routes>

          <Route className="pt-[120px] sm:pt-[180px]" path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='mycart' element={<Mycart />} />
            <Route path='registration' element={<Registration />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path='checkout' element={<Checkout />} />
          <Route path='/invoice/:orderId' element={<Invoice />} />
          <Route path='adminlogin' element={<AdminLogin />} />
        </Routes>

        <Routes>
          <Route path='/admindash' element={<AdminDashboard />}>
            <Route path='addproduct' element={<AddProduct />} />
            <Route path='orderproduct' element={<Orders />} />
            <Route path='productlist' element={<ProductList />} />
          </Route>

        </Routes>



      </div>
    </>
  )
}

export default App
