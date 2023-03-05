import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { API_URL } from '../../config'

interface Props {
  setError?: React.Dispatch<React.SetStateAction<string>>;
  setSuccess?: React.Dispatch<React.SetStateAction<string>>
}

const InventoryForm = ({
  setError=()=>{}, 
  setSuccess=()=>{}
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  const [location, setLocation] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState<string|number>("")
  const [runAutomate, setRunAutomate] = useState(false) // state for crate inventories automated
  const [createdItems, setCreatedItems] = useState(0) // items created during automated requests
  const locations = [
    "მთავარი ოფისი", "კავეა გალერია", "კავეა თბილისი მოლი", "კავეა ისთ ფოინთი", "კავეა სითი მოლი"
  ]

  useEffect(() => {
    // console.log(runAutomate)
    if(runAutomate) {
      autoFillInputs()
    }
  }, [runAutomate])

  useEffect(() => {
    if(runAutomate && location && name && price) {
      runAutomateTasks()
    }
  }, [location, name, price])

  const runAutomateTasks = () => { // recursive function
    // console.log(runAutomate)
    const to = setTimeout(() => {
      createInventory().then(() => setCreatedItems(state => state+1))
      clearTimeout(to)
    }, 100)
  }

  const autoFillInputs = () => {
    let min = Math.ceil(0);
    let max = Math.floor(locations.length-1);
    const randomLoc = locations[Math.floor(Math.random() * (max - min + 1)) + min]
    setLocation(randomLoc)
    setName("test"+createdItems)
    setPrice(10)
  }

  const priceChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    if(e.target.value) {
      setPrice(e.target.value)
    } else {
      setPrice("")
    }
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)

    console.log("run")

    // check required inputs
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
      return setIsLoading(false)
    }

    createInventory()
  }

  const createInventory = async () => {
    try {
      const res = await axios.post(`${API_URL}/inventories`, {
        name, location, price
      })
      setIsLoading(false)
      setLocation("")
      setName("")
      setPrice("")
      setSuccess("ინვენტარი წარმატებით დაემატა")
      // trigger useEffect
      if(runAutomate) {
        autoFillInputs()
      }
      setValidated(false)
    } catch(err:any) {
      // console.log(err.response)
      setRunAutomate(false)
      setIsLoading(false)
      setError(`ინვენტარის შენახვა ვერ მოხერხდა, ${err.response.status}`)
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
        <Form.Select id="location" 
          className='mb-3'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="">-</option>
          {locations.map((loc, i) => {
            return <option key={i} value={loc}>{loc}</option>
          })}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          მდებარეობა სავალდებულოა
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>ინვენტარის სახელი</Form.Label>
        <Form.Control type="text" id='name'
          placeholder="სახელი" required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          სახელი სავალდებულოა
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>ფასი</Form.Label>
        <Form.Control type="number" id='price'
          placeholder="ფასი" required
          step="any"
          value={price}
          onChange={priceChangeHandler}
        />
        <Form.Control.Feedback type="invalid">
          სავალდებულოა მიუთითოთ რიცხვითი მნიშვნელობა
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='d-flex justify-content-between align-items-center mt-2'>
        <div className='d-flex algin-items-center'>
          <Button variant='outline' className='btn-outline-warning'
            onClick={() => setRunAutomate(!runAutomate)}
          >
            {runAutomate ? "Stop":"Automate"}
          </Button>
          {runAutomate ? (
            <p className='m-1'>Created {createdItems} inventories</p>
          ) : null}
        </div>
        <Button variant="primary" type="submit" 
          size='lg'
        >
          {isLoading ? <Spinner /> : "შენახვა"}
        </Button>
      </Form.Group>
    </Form>
  )
}

export default InventoryForm