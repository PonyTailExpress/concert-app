import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Concerts from "./components/Concerts";
import Artists from "./components/Artist";
import About from "./components/About";
import ConcertDetails from "./components/concertDetails";
import ArtistDetails from "./components/artistDetails";
import SignInForm from "./components/signIn";
import SignUpForm from "./components/signUp";
import LikedConcerts from "./components/LikedConcerts";
import LikedArtists from "./components/LikedArtists";
import AddConcert from "./components/AddConcert";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/concerts/:id" element={<ConcertDetails />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/:id" element={<ArtistDetails />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/likedconcerts" element={<LikedConcerts />} />
        <Route path="/likedartists" element={<LikedArtists />} />
        <Route path="/addconcert" element={<AddConcert />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
