import React,{useState} from 'react'

function Header({search}) {
  const [valueInput,setValueInput] = useState('')

  const inputChange = (inputValue) => {
    setValueInput(inputValue.target.value)
  }

  const submitting = (event) => {
    event.preventDefault();
    search(valueInput)
  }

  return (
    <div>
      <form className='formDiv' onSubmit={submitting}>
          <label>Search Movie</label>
          <input value={valueInput} type='text' placeholder='Enter the Movie Name' onChange={inputChange}/>
          <button type="submit" className="search-btn">Search</button>
      </form>
    </div>
  )
}

export default Header