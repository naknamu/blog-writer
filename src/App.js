import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
