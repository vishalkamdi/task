import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Stories from './component/Stories';
import StoryDetails from './component/StoryDetails';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Stories />} />
                <Route path="/story/:id" element={<StoryDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
