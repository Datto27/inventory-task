import React from 'react'
import Form from 'react-bootstrap/Form'

interface Props {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>
}

const FilterSelect = ({location, setLocation}:Props) => {
  
  return (
    <Form.Select aria-label="Default select example" className='mb-5'
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    >
      <option value="">მდებარეობა</option>
      <option value="მთავარი ოფისი">მთავარი ოფისი</option>
      <option value="კავეა გალერია">კავეა გალერია</option>
      <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
      <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
      <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
    </Form.Select>
  )
}

export default FilterSelect