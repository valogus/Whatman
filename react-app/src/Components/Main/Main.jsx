import React from 'react'
import './style.css'

export default function Main() {

  return (

    // <div className="main_page">
    <div className="container_ocean">
      <div className="main_wrapper">
        <video className="clipped-video" muted loop autoPlay>
          <source src="https://design2seo.com/assets/blog/svg-clipping/video_waves3.mp4">
          </source>
        </video>
        <svg className='main_svg' height="100%" width="100%">
          <clipPath id="text-overlay" width="100%" height="100%">
            <text className='main_svg_text' id="title" x="0" y="80" dy="1.58em" fontSize={'14vw'}>Whatman</text>
          </clipPath>
        </svg>
      </div>
      <div className="text_block">
        <p className='main_text'>Облачный сервис<br></br>управления проектами</p>
      </div>
    </div>
    // </div>

  )
}
