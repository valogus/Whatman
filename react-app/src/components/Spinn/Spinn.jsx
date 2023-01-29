import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function Spinn() {
  return (
    <div className='position-absolute top-50 start-50'>

      <Spinner animation="border" variant="success" />
    </div>
  )
}
