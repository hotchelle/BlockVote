import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from '../context/UserAuthContext';

const Register = () => {
    //Setting the email value
    const [email, setEmail] = useState("");
    //TODO: Store the Age value of the user
    const [Age, setAge] = useState("");
    //Setting the password value of the user
    const [password, setPassword] = useState("");

    //Setting the errors that could be issues incase of a wrong submission/access
    const [error,setError] = useState("");

    // Using the context created to obtain the function value to handle signing up for the user
    const { signUp } = useUserAuth();

    // Using the navigate hook to route the application to different pages
    const navigate = useNavigate();

// This function is an async function to handle the promise taken for handling the submission and awaits until the request sent to the FirebaseAPI works
    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        setError("");
        try{
            await signUp(email,password);
            navigate("/");
        }
        catch(err)
        {
            setError(err.message);   
        }
    }
    // Using BootStrap Form to strcuture the UI of the Register box fields and labels

    return (
        <>
            <div className='p-4 box'>
                <h2 className='mb-3'>Register</h2>
                {error && <Alert variant= "danger" >{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controrlId="formBasicEmail">
                        <Form.Control
                        type="email"
                        placeholder='Email address'
                        onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controrlId="formBasicAge">
                        <Form.Control
                        type="age"
                        placeholder='Age'
                        onChange={(e) => setAge(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controrlId="formBasicPassword">
                        <Form.Control
                        type="password"
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} />

                    
                    </Form.Group>

                    <div className='d-grid gap-2'>
                        <Button variant="primary" type="Submit">
                            Sign up
                        </Button>
                    </div>
                </Form>

            </div>
            <div className="p-4 box mt-3 text-center">
                Already have an account? <Link to="/">Login</Link>
            </div>
        </>
    )
};

export default Register;



