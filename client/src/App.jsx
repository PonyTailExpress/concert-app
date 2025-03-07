import { useState } from 'react';
import Navbar from './components/navbar'; // Importing the Navbar component
// Optionally import the CSS if you didn't import it inside Navbar.jsx
//import './components/CSS/navbar'; // If you need to import styles here too

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Use the Navbar component here */}
      <Navbar />
      <div style={{ marginTop: '80px' }}> {/* Added margin to push down content */}
        <h1>Welcome to the Concert and Artist App!</h1>
        {/* Other content */}
      </div>
    </>
  );
}

export default App;

