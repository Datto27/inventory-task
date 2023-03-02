import axios from 'axios'
import React, {useState} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { API_URL } from '../../config'

interface Props {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>
}

const InventoryForm = ({setError, setSuccess}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  const [location, setLocation] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState<string|number>("")

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setValidated(true);
    setIsLoading(true)

    // check required inputs
    const form = e.currentTarget
    if (form.checkValidity() === false) return

    axios.post(`${API_URL}/inventories`, {
      name, location, price
    })
    .then((res) => {
      // console.log(res.data)
      setIsLoading(false)
      setLocation("")
      setName("")
      setPrice("")
      setSuccess("ინვენტარი წარმატებით დაემატა")
      setValidated(false)
    })
    .catch((err) => {
      // console.log(err.response)
      setIsLoading(false)
      setError(`ინვენტარის შენახვა ვერ მოხერხდა, ${err.response.status}`)
    })
  }

  const priceChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    if(e.target.value) {
      setPrice(e.target.value)
    } else {
      setPrice("")
    }
  }

  return (
    <Form className="inventory-form mt-4"
      noValidate 
      validated={validated} 
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label>მდებარეობა</Form.Label>
        <Form.Select aria-label="Default select example" 
          className='mb-3'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="">-</option>
          <option value="მთავარი ოფისი">მთავარი ოფისი</option>
          <option value="კავეა გალერია">კავეა გალერია</option>
          <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
          <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
          <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          მდებარეობა სავალდებულოა
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>ინვენტარის სახელი</Form.Label>
        <Form.Control type="text" placeholder="სახელი" required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          სახელი სავალდებულოა
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>ფასი</Form.Label>
        <Form.Control type="number"  placeholder="ფასი" required
          step="any"
          value={price}
          onChange={priceChangeHandler}
        />
        <Form.Control.Feedback type="invalid">
          ფასი სავალდებულოა
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='d-flex justify-content-end'>
        <Button variant="primary" type="submit" 
          size='lg'
          className='mt-2'
        >
          {isLoading ? <Spinner /> : "შენახვა"}
        </Button>
      </Form.Group>
    </Form>
  )
}

export default InventoryForm