import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

    </div>
  );
}

export default App;
