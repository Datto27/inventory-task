import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { rows } from '../../constants/inventory';


interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}

const CustomPagination = ({page, setPage, count}: Props) => {
  const pagesCount = Math.ceil(count / rows)
  let showLeftElipsis = page >= 4
  let showRightElipsis = pagesCount-3 >= page

  
  const onNextPage = () => {
    if(page < pagesCount) setPage(state => state+1)
  }

  const onPrevPage = () => {
    if(page > 1) setPage(state => state-1)
  }

  const onPageNumber = (num:number) => {
    setPage(num)
  }

  // first three number after 1, inside pagination 
  const StartNumbers = () => (
    <>
      <Pagination.Item active={page===2}
        onClick={() => onPageNumber(2)}
      >
        {2}
      </Pagination.Item>
      <Pagination.Item active={page===3}
        onClick={() => onPageNumber(3)}
      >
        {3}
      </Pagination.Item>
      <Pagination.Item active={page===4}
        onClick={() => onPageNumber(4)}
      >
        {4}
      </Pagination.Item>
    </>
  )

  // page numbers after page becomes more than first three pages and less then last three pages
  const MiddleNumbers = () => (
    <>
      <Pagination.Item active={false}
        onClick={() => onPageNumber(page-1)}
      >
        {page-1}
      </Pagination.Item>
      <Pagination.Item active={true}
        onClick={() => onPageNumber(page)}
      >
        {page}
      </Pagination.Item>
      <Pagination.Item active={false}
        onClick={() => onPageNumber(page+1)}
      >
        {page+1}
      </Pagination.Item>
    </>
  )

  // last three numbers before last page number
  const EndNumbers = () => (
    <>
      <Pagination.Item active={page===pagesCount-3}
        onClick={() => onPageNumber(pagesCount-3)}
      >
        {pagesCount-3}
      </Pagination.Item>
      <Pagination.Item active={page===pagesCount-2}
        onClick={() => onPageNumber(pagesCount-2)}
      >
        {pagesCount-2}
      </Pagination.Item>
      <Pagination.Item active={page===pagesCount-1}
        onClick={() => onPageNumber(pagesCount-1)}
      >
        {pagesCount-1}
      </Pagination.Item>
    </>
  )

  return (
    <Pagination className='d-flex justify-content-end m-4 mb-5'>
      <Pagination.Prev onClick={onPrevPage} />
      <Pagination.Item active={page===1 ? true:false}
        onClick={() => onPageNumber(1)}
      >
        {1}
      </Pagination.Item>

      {showLeftElipsis && <Pagination.Ellipsis />}

      {page < 4 && <StartNumbers />}
      {page >= 4 && pagesCount-page >= 3 &&  <MiddleNumbers />}
      {pagesCount-page < 3 && <EndNumbers />}

      {showRightElipsis && <Pagination.Ellipsis />}

      <Pagination.Item active={page===pagesCount ? true:false}
        onClick={() => onPageNumber(pagesCount)}
      >
        {pagesCount}
      </Pagination.Item>
      <Pagination.Next onClick={onNextPage} />
    </Pagination>
  )
}

export default CustomPagination