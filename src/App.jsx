import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import GameDetailView from "./views/GameDetailView";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:id" element={<GameDetailView />} />
      </Routes>
    </Router>
  );
}

export default App;
