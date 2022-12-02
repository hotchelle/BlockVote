import './App.css';
import Login from './Components/Login';
import Vote from './Components/Vote';
import Landing from './Components/Landing';
import { Routes, Route } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import Register from './Components/Register';
import { UserAuthContextProvider } from "./context/UserAuthContext"
import Home from './Components/Home';
import ResetPassword from './Components/ResetPassword';
import CreatePoll from './Components/CreatePoll';
import Results from './Components/Results'
import ResultsAdpater from './Components/ResultsAdapter';
import PollCreation from './Components/PollCreation';
import CardComponent from './Components/CardComponent';
import JoinPoll from './Components/JoinPoll';
import PlaceVote from "./Components/PlaceVote"
import Charter from './Components/Charter';
import BarGraph from './Components/BarGraph';


function App() {
  return (
    <Container>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/" element={<Login/>}/>
              <Route path= "/Charter" element={<Charter/>}/>
              <Route path='/BarGraph' element={<BarGraph/>}/>
              <Route path="/PollCreation" element={<PollCreation />} />
              <Route path = "/RecoverPassword" element= {<ResetPassword/>}/>
              <Route path="/Register" element={<Register />} />
              <Route path= "/Results" element={<Results/>}/>
              <Route path="/Landing" element={<Landing />} />
              <Route path="/ResultsAdapter" element={<ResultsAdpater />} />
              <Route path="/Vote" element={<Vote />} />
              <Route path="/Poll" element={<CreatePoll/>} />
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
