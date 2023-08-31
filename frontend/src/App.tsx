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
import MyProfileBoardsPage from "./pages/MyProfileBoardsPage";
import ProfileBoardsPage from "./pages/ProfileBoardsPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
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
          <Route path="my-profile/boards" element={<MyProfileBoardsPage />} />
          <Route path="my-profile/scrapped" element={<MyProfileBoardsPage />} />
          <Route path="profile/:memberId" element={<ProfilePage />} />
          <Route
            path="profile/:memberId/boards"
            element={<ProfileBoardsPage />}
          />
        </Route>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/error" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
