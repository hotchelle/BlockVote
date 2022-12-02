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

import PollCreation from './Components/PollCreation';
import CardComponent from './Components/CardComponent';
import JoinPoll from './Components/JoinPoll';
import PlaceVote from "./Components/PlaceVote"
import Functionalities from './Components/Functionalities';
function App() {
  return (
    <Container>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/" element={<PollCreation />} />
              <Route path = "/RecoverPassword" element= {<ResetPassword/>}/>
              <Route path="/Register" element={<Register />} />
              <Route path="/Landing" element={<Landing />} />
              {/* <Route path="/Results" elements={<Results /> } /> */}
              <Route path="/Vote" element={<Vote />} />
              <Route path="/Poll" element={<CreatePoll/>} />
              <Route path="/Demo" element={<Demo />} />
              <Route path="/CardComponent" element={<CardComponent />} />
              <Route path="/Join" element={<JoinPoll />} />
              <Route path="/PlaceVote" element={<PlaceVote />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
