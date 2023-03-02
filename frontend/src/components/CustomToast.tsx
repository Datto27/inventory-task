import React from 'react'
import Toast from 'react-bootstrap/Toast'


interface Props {
  type: "success" | "danger";
  show: boolean;
  text: string
}

const CustomToast = ({type, show, text}:Props) => {
  return (
    <Toast show={show ? true:false}
      bg={type}
      className={`position-absolute bottom-0 end-0`}     
    >
      <Toast.Body className='text-white'>
        {text}
      </Toast.Body>
    </Toast>
  )
}

export default CustomToast