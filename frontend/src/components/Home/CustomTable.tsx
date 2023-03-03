import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { InventoryI } from '../../interfaces/inventory'
import axios from 'axios';
import { API_URL } from '../../config';
import InventoryTableRow from './InventoryTableRow';
import { rows } from '../../constants/inventory';


interface Props {
  inventories: InventoryI[];
  setInventories: React.Dispatch<React.SetStateAction<InventoryI[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  page: number
}

// invetories table
const CustomTable = ({
  inventories, setInventories, setError, page
}:Props) => {

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
          // console.log((page-1) * 20 + i+1)
          return <InventoryTableRow key={i} 
            th={(page-1) * rows + i+1} 
            item={item}
            deleteItem={deleteInventory}
          />
        })}
      </tbody>
    </Table>
  )
}

export default CustomTable