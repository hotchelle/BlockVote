import './App.css';
import Login from './Components/Login';
import Vote from './Components/Vote';
import Landing from './Components/Landing';
import { Routes, Route } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import Register from './Components/Register';
import { UserAuthContextProvider } from "./context/UserAuthContext"
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import ResetPassword from './Components/ResetPassword';
import Demo from './Components/Functionalities';
import CreatePoll from './Components/CreatePoll';
import Results from './Components/Results'

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/home" element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }/>
              <Route path="/" element={<Login />} />
              <Route path = "/RecoverPassword" element= {<ResetPassword/>}/>
              <Route path="/Register" element={<Register />} />
              <Route path="/Landing" element={<Landing />} />
              <Route path="/Results" elements={<Results /> } />
              <Route path="/Vote" element={<Vote />} />
              <Route path="/Poll" element={<CreatePoll/>} />
              <Route path="/Demo" element={<Demo />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
