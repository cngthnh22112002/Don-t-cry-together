import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar.js"
import Home from "./components/Home/Home.js"
import Auth from './components/Auth/Auth.js';
import Map from './components/Map/Map.js';
import Employees from './components/Employees/Employees.js';
import MCPs from './components/MCPs/MCPs.js';
import Vehicles from './components/Vehicles/Vehicles.js';
import Profile from './components/Profile/index.js';
import Calendar from './components/calendar/calendar.js'
//import Tasks from './components/Tasks/Tasks.js'
import Tasks from './components/Tasks1/Task'
import './App.css'

const App = () => {
	
    return (
		
		<BrowserRouter>
			<div class="row justify-content-start">
				<div class="col-auto">
					<Navbar />
				</div>
				<div class="col">
					<Routes>
						<Route exact path="/"  element={<Home />} />
						<Route exact path="/auth" element={<Auth />} />
						<Route exact path="/emps" element ={<Employees />} />
						<Route exact path="/vehs" element ={<Vehicles />} />
						<Route exact path="/mcps" element ={<MCPs />} />
						<Route exact path="/tasks" element ={<Tasks />} />
						<Route exact path="/map" element ={<Map />} />
						<Route exact path="/profile" element={<Profile />} />
						<Route path="/calendar" element={<Calendar />} />
						
					</Routes>
				</div>
			</div>
		</BrowserRouter>

		
    )};

export default App;

