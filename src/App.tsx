import React from 'react'
import './App.css'
import Form from './Components/Form'

function App() {
  const [isValid, setIsValid] = React.useState(false)

  const validateName = (name: string) => {
    return (
      name.length > 0 &&
      name.length < 100 &&
      name.includes(' ') &&
      name.split(' ').length === 2
    )
  }

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const validate = () => {
    const nameField = document.getElementById('_name') as HTMLInputElement
    const emailField = document.getElementById('_email') as HTMLInputElement

    if (nameField && emailField) {
      const name = nameField.value
      const email = emailField.value

      const nameIsValid = validateName(name)
      const emailIsValid = validateEmail(email)

      setIsValid(nameIsValid && emailIsValid)
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted')
    console.log(event.currentTarget.children)
    validate()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Playwrite Test</h1>
      {isValid ? (
        <div style={{ color: 'green' }}>Form is valid</div>
      ) : (
        <div style={{ color: 'red' }}>Form is invalid</div>
      )}
      <Form onSubmit={onSubmit} />
    </div>
  )
}

export default App
