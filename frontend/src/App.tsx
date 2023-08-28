import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "@/pages/Layout";
import LoadingAnimation from "@/components/loading/LoadingAnimation";

import MainPage from "@/pages/MainPage";
import NoticePage from "@/pages/NoticePage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import MyProfilePage from "@/pages/ProfilePage/MyProfilePage";
import UploadPage from "@/pages/UploadPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardPage from "@/pages/DashboardPage";
// const MainPage = lazy(() => import("@/pages/Mainpage"));
// const NoticePage = lazy(() => import("@/pages/NoticePage"));
// const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
// const UploadPage = lazy(() => import("@/pages/UploadPage"));
// const SignUpPage = lazy(() => import("@/pages/SignUpPage/SignUpPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingAnimation />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="notice" element={<NoticePage />} />
            <Route path="my-profile" element={<MyProfilePage />} />
            <Route path="profile/:memberId" element={<ProfilePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/error" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
