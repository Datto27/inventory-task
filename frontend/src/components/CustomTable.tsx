import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { InventoryI } from '../interfaces/inventory'


interface Props {
  inventories: InventoryI[]
}

const CustomTable = ({inventories}:Props) => {
  return (
    <Table striped hover responsive="md">
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
              <Button variant='danger' size='sm'>
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