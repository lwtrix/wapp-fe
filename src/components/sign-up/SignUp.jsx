import React from 'react'
import { Form, Button } from 'react-bootstrap'

import './sign-up.css'

const SignUp = () => {
  return (
    <div className='sign-up my-3 mx-2'>
        <h2 className='title'>Sign Up</h2>
        <div className="inputs-container mb-2">
        <Form.Group className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='johndoe@gmail.com'/>
        </Form.Group>
        <Form.Group className='mb-2'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' placeholder='johndoe99'/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='***********'/>
        </Form.Group>
        </div>
        <Button className='sign-up-btn'>Submit</Button>
    </div>
  )
}

export default SignUp