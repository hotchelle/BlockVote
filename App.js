import './App.css';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import Register from './components/Register';
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import ResetPassword from './components/ResetPassword';

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
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
