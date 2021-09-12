import './App.css'
import styled from 'styled-components'
import React, { useState } from 'react'

const randomAmount = Math.floor(Math.random() * (3 - 1 + 1)) + 1

const randomIndex = () => {
  const indexes = []
  for (let i = 1; i <= randomAmount; i++) {
    const randomNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1
    if (indexes.length >= randomAmount) return
    indexes.push(randomNumber)
  }
  return indexes
}

const getSquares = () => {
  const squeres = []
  const indexes = randomIndex()
  for (let i = 0; i < 6; i++) {
    const color =
      '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()
    const square = { id: i, color: indexes.includes(i) ? 'blue' : color }
    squeres.push(square)
  }
  return squeres
}

function App() {
  const [squares, setSquares] = useState(getSquares)
  const [selectedSquares, setSelectedSquares] = useState([])
  const [message, setMessage] = useState('')

  const handleClick = id => {
    setSelectedSquares(prev => {
      return prev.find(el => el.id === id)
        ? prev.filter(el => el.id !== id)
        : [...prev, squares.find(el => el.id === id)]
    })
  }

  const handleSubmit = () => {
    if (selectedSquares.length <= 0) return
    if (selectedSquares.find(el => el.color !== 'blue')) {
      setMessage('selected not only blue squares')
      return
    }
    const length = squares.filter(el => el.color === 'blue').length
    if (length > selectedSquares.length) {
      setMessage('not all blue squares selected')
      return
    }
    setSelectedSquares([])
    setSquares(getSquares)
  }
  return (
    <div className="App">
      <Container>
        {squares.length > 0 &&
          squares.map(square => (
            <Label
              key={square.id}
              color={square.color}
              checked={selectedSquares.some(el => el.id === square.id)}
              onClick={() => handleClick(square.id)}
            />
          ))}
      </Container>
      <p>{message}</p>
      <Button type="submit" on onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default App

const Square = ({ square }) => {
  const [checked, setChecked] = useState(false)

  const handleClick = () => setChecked(!checked)
  return (
    <>
      <Label color={square.color} checked={checked} onClick={handleClick}></Label>
    </>
  )
}

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`
const Label = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${props => props.color};
  display: flex;
  margin: 10px;
  border: 4px solid;
  border-color: ${props => (props.checked ? 'orange' : props.color)};
`
const Button = styled.button`
  border: 1px solid;
`
