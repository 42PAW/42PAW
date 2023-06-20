import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<div>Layout</div>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
