import React from 'react';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';

const App = () => {
  return (
    <>
      <Home/>
      <Routes>
        <Route path="/" element={<CreateRule />} />
        <Route path="/combine" element={<CombineRules />} />
        <Route path="/evaluate" element={<EvaluateRule />} />
      </Routes>
    </>
  );
};

export default App;
