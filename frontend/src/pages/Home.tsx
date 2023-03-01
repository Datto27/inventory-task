import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import { APIT_URL } from '../config'
import { InventoryI } from '../interfaces/inventory'
import CustomPagination from '../components/CustomPagination'
import CustomTable from '../components/CustomTable'
import FilterSelect from '../components/FilterSelect'


const Home = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [inventories, setInventories] = useState<InventoryI[]>([])
  const [page, setPage] = useState(1)
  const [location, setLocation] = useState("")

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${APIT_URL}/inventories?location=${location}`)
    .then((res) => {
      setInventories(res.data.data)
      setIsLoading(false)
    })
    .catch((err) => {
      // console.log(err)
      setIsLoading(false)
    })
  }, [location])

  return (
    <Container>
      <h1 className='text-center p-4'>
        Inventory Management
      </h1>
      <FilterSelect location={location} setLocation={setLocation} />
      {isLoading ? (
        <div className='d-flex justify-content-center'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : null}
      <CustomTable inventories={inventories} />
      <CustomPagination page={page} setPage={setPage} />
    </Container>
  )
}

export default Home