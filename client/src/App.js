import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './containers/Login.tsx';
import Profile from './containers/Profile.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/" index element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
