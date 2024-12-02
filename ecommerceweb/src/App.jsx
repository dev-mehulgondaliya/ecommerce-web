import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './components/home/Home'
import Login from './components/home/auth/Login'
import Signup from './components/home/auth/Signup'
import ProductList from './components/product/ProductList'
import ProductDetails from './components/product/ProductDetails'
import Cart from './components/product/Cart'
import ProtectedRoutes from './shared/ProtectedRoutes'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      
      
      <Route path="/products" element={<ProtectedRoutes Component={ProductList} />} >
      </Route>
      <Route path="/cart" element={< ProtectedRoutes Component={Cart} />} >
      </Route>
      <Route path="/products/:id" element={<ProtectedRoutes Component={ProductDetails} />} />

    </Routes>
  </BrowserRouter>
  )
}

export default App
