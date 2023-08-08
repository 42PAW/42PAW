import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "@/pages/Layout";
import LoadingAnimation from "@/components/loading/LoadingAnimation";

import MainPage from "@/pages/MainPage";
import NoticePage from "@/pages/NoticePage";
import ProfilePage from "@/pages/ProfilePage";
import UploadPage from "@/pages/UploadPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
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
            <Route path="notice" element={<NoticePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
