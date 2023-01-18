import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

export default function Main() {

  return (

    // <div className="main_page">
    <div className="container_ocean ocean">
      <div className="main_wrapper">
        <video className="clipped-video" muted loop autoPlay>
          <source src="./video/video_waves3.mp4">
          </source>
        </video>
        <svg className='main_svg' height="100%" width="100%">
          <clipPath id="text-overlay" width="100%" height="100%">
            <text className='main_svg_text' id="title" x="0" y="80" dy="1.2em" fontSize={'14vw'}>Whatman</text>
          </clipPath>
        </svg>
      </div>
      <div className="text_block">
        <div className="text_block_one">
          <p className='main_text_one'>Работайте эффективнее </p>
        </div>
        <div className="text_block_two">
          <p className='main_text_two'>с любой точки мира</p>
        </div>
      </div>
      <div className="block_comein">
        <Link to={'/auth'}>
          <button type='submit'>Войти</button>
        </Link>
      </div>
    </div>
    // </div>

  )
}
