import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/pages/Layout";
import MainPage from "@/pages/MainPage";
import NoticePage from "@/pages/NoticePage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import MyProfilePage from "@/pages/ProfilePage/MyProfilePage";
import UploadPage from "@/pages/UploadPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import NotFoundPage from "@/pages/NotFoundPage";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <BrowserRouter>
      {loading && <LoadingPage />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="my-profile" element={<MyProfilePage />} />
          <Route path="profile/:memberId" element={<ProfilePage />} />
        </Route>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/error" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
