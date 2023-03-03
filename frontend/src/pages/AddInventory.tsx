import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'
import CustomToast from '../components/CustomToast'
import InventoryForm from '../components/AddInventory/InventoryForm'

const AddInventory = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  useEffect(() => {
    // success state cleaner
    const to = setTimeout(() => {
      setSuccess("")
    }, 1000)

    return () => {
      clearTimeout(to)
    }
  }, [success])

  useEffect(() => {
    // error state cleaner
    const to = setTimeout(() => {
      setError("")
    }, 2000)

    return () => {
      clearTimeout(to)
    }
  }, [error])

  return (
    <Container className='add-inventory-page pt-5'>
      <h1 className='text-center m-5'>
        Add New Inventory
      </h1>
      <Button className='home-btn'
        onClick={() => navigate("/")}
      >
        <i className="bi bi-arrow-left-circle"></i>
        <span className='m-2'>მთავარი</span>
      </Button>
      <InventoryForm setError={setError} setSuccess={setSuccess} />
      {success && (
        <CustomToast type='success' text={success} show={success ? true:false} />
      )}
      {error && (
        <CustomToast type='danger' text={error} show={error ? true:false} />
      )}
    </Container>
  )
}

export default AddInventory