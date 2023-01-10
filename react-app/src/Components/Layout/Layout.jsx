import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout() {
  return (

    <>
      {console.log('Render Layout')}
      <Navbar></Navbar>
      <Outlet></Outlet>
    </ >
  )
}
