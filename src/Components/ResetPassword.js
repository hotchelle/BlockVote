import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Form, Alert, Button } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';

// This component is responsible to reset the password for the user and whenever the email gets sent, it will direct the user to the login screen
function ResetPassword() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState("");
  const { recoverPassword } = useUserAuth();
  const navigate = useNavigate();


// This function is an async function to handle the promise taken for handling the submission and awaits until the request sent to the FirebaseAPI works
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await recoverPassword(email);
      navigate("/");
    }

    catch (err) {
      console.log(err.message);
      setError(err.message);
    }

  }
// Using BootStrap Form to strcuture the UI of the recovery box fields and labels
  return (
    <>
      <div className='p-4 box'>
        <h2 className='mb-3'>Recover Account</h2>
        {error && <Alert variant='success'>Sucess!</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-4' controrlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder='Email address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div className='d-grid gap-3'>
            <Button variant="primary" type="Submit">
              Send Verification
            </Button>
          </div>

        </Form>
        <hr />
        <div className="p-4 mt-1 text-center">
          Go back to the <Link to="/">Login Page</Link>
        </div>
      </div>

    </>
  )
}

export default ResetPassword;

