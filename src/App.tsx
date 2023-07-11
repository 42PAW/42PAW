import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./pages/Layout";
import MainPage from "./pages/Mainpage";
import ProfilePage from "./pages/ProfilePage";
import NoticePage from "./pages/NoticePage";
import UploadPage from "./pages/UploadPage";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="main" element={<MainPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="notice" element={<NoticePage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="signin" element={<SignInPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
