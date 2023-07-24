import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./pages/Layout";
import LoadingAnimation from "./components/loading/LoadingAnimation";

const MainPage = lazy(() => import("./pages/Mainpage"));
const NoticePage = lazy(() => import("./pages/NoticePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const UploadPage = lazy(() => import("./pages/UploadPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));

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
            <Route path="signin" element={<SignInPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
