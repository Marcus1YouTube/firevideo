import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import WatchVideo from "./pages/watchVideo";
import UploadVideo from "./pages/uploadVideo";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/watch" element={<div className="oops"><h1>OOPS!! Ya didint gave me the ID for the video! To go back to the home page, press this  <Link to="/">link to go back!</Link></h1></div>} />
        <Route path="/watch/:videoId" element={<WatchVideo />} />
        <Route path="*" element={<div className="oops"><h1>OOPS!! 404 Page Not Found! To go back to the home page, press this  <Link to="/">link to go back!</Link></h1></div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
