import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { InventoryI } from '../../interfaces/inventory'

interface Props {
  item: InventoryI;
  i: number;
  deleteItem: (id:number) => Promise<void>
}

const InventoryTableRow = ({i, item, deleteItem}:Props) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <tr key={i}>
      <td>{i+1}</td>
      <td className='text-nowrap'>{item.name}</td>
      <td className='text-nowrap'>{item.location}</td>
      <td>{item.price}</td>
      <td className='d-flex justify-content-center'>
        {isLoading ? (
          <Button variant="danger" size="sm">
            <Spinner size='sm' />
          </Button>
        ) : (
          <Button variant='danger' size='sm'
            onClick={() => {
              setIsLoading(true)
              deleteItem(item.id)
                .then(() => setIsLoading(false))
            }}
          >
            წაშლა
          </Button>
        )}
      </td>
    </tr>
  )
}

export default InventoryTableRow