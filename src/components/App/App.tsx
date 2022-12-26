import AppPaths from 'common/routes';
import HomePage from 'pages/HomePage/';
import NotFoundPage from 'pages/NotFoundPage/';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path={AppPaths.HOME} element={<HomePage />} />
        <Route path={AppPaths.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
