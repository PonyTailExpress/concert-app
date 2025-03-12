import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Concerts from "./pages/Concerts";
import Artists from "./pages/Artist";
import About from "./pages/About";
import ConcertDetails from "./pages/concertDetails";
import ArtistDetails from "./pages/artistDetails";
import SignInForm from "./pages/signIn";
import SignUpForm from "./pages/signUp";
import LikedConcerts from "./pages/LikedConcerts";
import LikedArtists from "./pages/LikedArtists";
import AddConcert from "./pages/addConcert";
import CreatedConcerts from "./pages/createdConcerts";
import EditConcert from "./pages/editConcert";
import ProtectedRoute from "./components/protectedRoute";

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

        {/* Add more routes as needed above */}

        {/* Protected Routes */}

        <Route
          path="/likedconcerts"
          element={
            <ProtectedRoute>
              <LikedConcerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/likedartists"
          element={
            <ProtectedRoute>
              <LikedArtists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addconcert"
          element={
            <ProtectedRoute>
              <AddConcert />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createdevents"
          element={
            <ProtectedRoute>
              <CreatedConcerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createdevents/:id"
          element={
            <ProtectedRoute>
              <EditConcert />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
