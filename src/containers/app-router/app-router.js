import React from 'react';
import { createBrowserHistory } from "history";
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';
import HomePage from 'containers/home-page/home-page';

const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router location={history}>
      <Routes>
        <Route Component={HomePage} path="/" key="HomePage" />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRouter;
