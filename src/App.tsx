import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./pages/Layout";
import MainPage from "./pages/Mainpage";
import ProfilePage from "./pages/ProfilePage";
import NoticePage from "./pages/NoticePage";
import UploadPage from "./pages/UploadPage";
import SignInPage from "./pages/SignInPage";
import ProfileCard from "./components/ProfileCard";
import LoadingAnimation from "./components/loading/LoadingAnimation";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingAnimation />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="main" element={<MainPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profilecard" element={<ProfileCard />} />
            <Route path="notice" element={<NoticePage />} />
            <Route path="upload" element={<UploadPage />} />
          </Route>
          <Route path="signin" element={<SignInPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
