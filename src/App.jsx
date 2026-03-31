import React from "react";
import Home from "./Home";
import { Routes, Route } from 'react-router-dom';
import Resources from './Resources';
import Settings from './Settings';
import Survey from './Survey';
import TodaysWorkout from './TodaysWorkout';




export default () => (
  <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Survey" element={<Survey />} />
        <Route path="/TodaysWorkout" element={<TodaysWorkout />} />
      </Routes>
  </> 
);