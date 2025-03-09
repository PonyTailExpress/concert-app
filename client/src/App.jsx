import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'; 
import Concerts from './components/Concerts';
import Artists from './components/Artist';
import About from './components/About';
import ConcertDetails from './components/concertDetails';
import ArtistDetails from './components/artistDetails';
import SignInForm from './components/signIn';
import SignUpForm from './components/signUp';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/concerts/:id" element={<ConcertDetails />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/:id" element={<ArtistDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;


