import React from 'react'
import Pagination from 'react-bootstrap/Pagination'


interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const CustomPagination = ({page, setPage}: Props) => {

  return (
    <Pagination className='d-flex justify-content-end m-3'>
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  )
}

export default CustomPagination