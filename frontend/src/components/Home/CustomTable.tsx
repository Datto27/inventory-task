import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { InventoryI } from '../../interfaces/inventory'
import axios from 'axios';
import { API_URL } from '../../config';
import InventoryTableRow from './InventoryTableRow';


interface Props {
  inventories: InventoryI[];
  setInventories: React.Dispatch<React.SetStateAction<InventoryI[]>>
  setError: React.Dispatch<React.SetStateAction<string>>
}

// invetories table
const CustomTable = ({inventories, setInventories, setError}:Props) => {

  const deleteInventory = async (id: number) => {
    // delete inventory by id
    try {
      const res = await axios.delete(`${API_URL}/inventories/${id}`)
      setInventories((state) => state.filter((item) => item.id !== id))
    } catch(err) {
      // console.log(err)
      setError("წაშლა ვერ მოხერხდა")
    }
  }

  return (
    <Table striped hover responsive="md" className='mt-3'>
      <thead>
        <tr>
          <th>#</th>
          <th>სახელი</th>
          <th>მდებარეობა</th>
          <th>ფასი</th>
          <th style={{width:"10%"}}>ოპერაციები</th>
        </tr>
      </thead>
      <tbody>
        {inventories.map((item, i) => {
          return <InventoryTableRow key={i} 
            i={i} 
            item={item}
            deleteItem={deleteInventory}
          />
        })}
      </tbody>
    </Table>
  )
}

export default CustomTable