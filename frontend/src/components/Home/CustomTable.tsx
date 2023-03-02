import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { InventoryI } from '../../interfaces/inventory'
import axios from 'axios';
import { API_URL } from '../../config';


interface Props {
  inventories: InventoryI[];
  setInventories: React.Dispatch<React.SetStateAction<InventoryI[]>>
}

const CustomTable = ({inventories, setInventories}:Props) => {

  const deleteInventory = (id: number) => {
    // delete inventory by id
    axios.delete(`${API_URL}/inventories/${id}`)
    .then((res) => {
      console.log(res.data)
      setInventories((state) => state.filter((item) => item.id !== id))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <Table striped hover responsive="md" className='mt-3'>
      <thead>
        <tr>
          <th>#</th>
          <th>სახელი</th>
          <th>მდებარეობა</th>
          <th>ფასი</th>
          <th className='w-5'>ოპერაციები</th>
        </tr>
      </thead>
      <tbody>
        {inventories.map((item, i) => {
          return <tr key={i}>
            <td>{i+1}</td>
            <td className='text-nowrap'>{item.name}</td>
            <td className='text-nowrap'>{item.location}</td>
            <td>{item.price}</td>
            <td className='d-flex justify-content-center'>
              <Button variant='danger' size='sm'
                onClick={() => deleteInventory(item.id)}
              >
                წაშლა
              </Button>
            </td>
          </tr>
        })}
      </tbody>
    </Table>
  )
}

export default CustomTable