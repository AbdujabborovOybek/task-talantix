import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<h1>About</h1>} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
});
