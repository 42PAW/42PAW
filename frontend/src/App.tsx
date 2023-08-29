import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/pages/Layout";
import MainPage from "@/pages/MainPage";
import NoticePage from "@/pages/NoticePage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import MyProfilePage from "@/pages/ProfilePage/MyProfilePage";
import UploadPage from "@/pages/UploadPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardPage from "@/pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="my-profile" element={<MyProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/error" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
