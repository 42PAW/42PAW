import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/Mainpage";
import MainPage2 from "./pages/Mainpage2";
import MainPage3 from "./pages/Mainpage3";

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/main2" element={<MainPage2 />}></Route>
          <Route path="/main3" element={<MainPage3 />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
