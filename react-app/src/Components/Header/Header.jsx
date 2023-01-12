import React from 'react'
// import './header.css'
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='container-fluid header_wrap'>
      <div className="col-3 head_main">
        {/* <img src={logo} className="header-logo" alt="logo" /> */}
        <div className='col-sm-3'>
          <NavLink to='/'>Home</NavLink>
        </div>
      </div>
      <div className="col-6">
        <div className="row h-100">
          <div className="col-2 head_item">
            <NavLink to='/blog'>Blog</NavLink>
          </div>
          <div className="col-2 head_item">
            <NavLink to='/posts'> Posts</NavLink>
          </div>
          <div className="col-2 head_item">
            <NavLink to='/memo'> Memo</NavLink>
          </div>
          <div className="col-2 head_item">
            <NavLink to='/count'> Count</NavLink>
          </div>
        </div>

      </div>
      <div className="col-3 head_item">
        {Boolean(false)
          ? <>Войти</>
          : <>
            <div className='me-4'>Мои заметки</div>
            <div>Выйти</div>
          </>
        }
      </div>
    </header>
  )
}
