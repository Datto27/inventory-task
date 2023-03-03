import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { API_URL } from '../config'
import { InventoryI } from '../interfaces/inventory'
import CustomPagination from '../components/Home/CustomPagination'
import CustomTable from '../components/Home/CustomTable'
import FilterSelect from '../components/Home/FilterSelect'
import { useNavigate } from 'react-router-dom'
import CustomToast from '../components/CustomToast'


const Home = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [inventories, setInventories] = useState<InventoryI[]>([])
  const [page, setPage] = useState(1)
  const [location, setLocation] = useState("")

  useEffect(() => {
    setIsLoading(true)
    fetchInventories()
  }, [location, page])

  useEffect(() => {
    // error state cleaner
    const to = setTimeout(() => {
      setError("")
    }, 2000)

    return () => {
      clearTimeout(to)
    }
  }, [error])

  const fetchInventories = () => {
    axios.get(`${API_URL}/inventories?location=${location}`)
    .then((res) => {
      setInventories(res.data.data)
      setIsLoading(false)
    })
    .catch((err) => {
      // console.log(err)
      setIsLoading(false)
    })
  }

  return (
    <Container>
      <h1 className='text-center p-4'>
        Inventory Management
      </h1>
      <FilterSelect location={location} setLocation={setLocation} />
      <Container className='d-flex justify-content-end'>
        <Button variant='primary' 
          onClick={() => navigate("/add")}
        >
          დამატება
        </Button>
      </Container>
      {isLoading ? (
        <div className='d-flex justify-content-center'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <CustomTable 
          inventories={inventories} setInventories={setInventories} 
          setError={setError}
        />
      )}
      <CustomPagination page={page} setPage={setPage} />
      {error && (
        <CustomToast type='danger'
          show={error ? true:false} 
          text={error} 
        />
      )}
    </Container>
  )
}

export default Home