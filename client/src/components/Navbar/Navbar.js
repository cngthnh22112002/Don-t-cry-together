import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from "../../actions/authAction"
import './Navbar.css'

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;
	const dispatch = useDispatch();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const handleLogout = () => {
		dispatch( logout(navigate) );
		setUser(null);
	}
	useEffect( () => {
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);
	
    return (
	<>
	<div className="navbar-container ">
	<div class="container"> {user?
	(
		<div class="d-flex flex-column flex-shrink-0 p-3 " style={{width: "280px",height:"100vh", float:"left"}}>
		<a href="/" class="navbar-brand d-flex align-items-center mb-3 mb-md-0 me-md-auto fs-2">
			<div class="icontruck">
			<i class="bi bi-truck me-1"></i>
			</div>
			<div class="uwcremake">
				<span>UWC Remake</span>
			</div>
		</a>
		<hr/>
		<ul class="nav nav-tabs flex-column text-muted mb-auto">
			<li class="nav-item">
				<Link to="/"  class={path=="/" ? "nav-link active" : "nav-link"}>
				<div class="navpilltext">
					<i class="bi bi-bar-chart me-3"></i>
						<span>Tổng quan</span>
					</div>
				</Link>
			</li>
			<li class="nav-item">
				<Link to="/vehs"  class={path=="/vehs" ? "nav-link active" : "nav-link"}>
				<div class="navpilltext">
					<i class="bi bi-truck-front me-3"></i>
						<span>Phương tiện</span>
					</div>
				</Link>
			</li>
			<li>
				<Link to="/tasks" class={path=="/tasks" ? "nav-link active" : "nav-link"}>
				<div class="navpilltext">
					<i class="bi bi-ui-checks me-3"></i>
					<span>Phân công</span>
				</div>
				</Link>
			</li>
			<li>
				<Link to="/map" class={path=="/map" ? "nav-link active" : "nav-link"}>
				<div class="navpilltext">
					<i class="bi bi-map me-3"></i>
					<span>Bản đồ</span>
				</div>
				</Link>
			</li>
			<li>
			<Link to="/profile" class={path=="/profile" ? "nav-link active" : "nav-link"}>
				<div class="navpilltext">
					<i class="bi bi-person me-3"></i>
					<span>Nhân viên</span>
				</div>
				</Link>
			</li>
			<li>
			<Link to="/calendar" class={path=="/calendar" ? "nav-link active" : "nav-link"}>
				<div class="navpilltext">
					<i class="bi bi-calendar-check me-3"></i>
					<span>Lịch</span>
				</div>
				</Link>
			</li>
		</ul>
		<hr/>
		<ul class="nav nav-tabs flex-column text-muted mb-4">
			<li class="nav-item active">
				<a href="#" class="nav-link">
				<div class="navpilltext2">
					<i class="bi bi-telephone me-3"></i>
					<span>Trợ giúp</span>
				</div>
				</a>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link">
				<div class="navpilltext2">
					<i class="bi bi-chat-dots me-3"></i>
					<span>Liên hệ</span>
				</div>
				</a>
			</li>
		</ul>
		<div class="container">
			<div class="dropdown">
				<div class="d-flex align-items-center text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown">
					<img src={user?.image} class="rounded-circle me-2" width="32" height="32"/>
					<div class="navpilltext2">
						<strong>{user.name}</strong>	
					</div>				
				</div>
				<ul class="dropdown-menu text-small shadow">
					<li class="dropdown-item">
						<Link to="/profile" class="text-decoration-none">Profile</Link>
					</li>
					<li class="dropdown-item">
						<Link to="/auth" class="text-decoration-none">Change account</Link>
					</li>
					<li>
						<hr class="dropdown-divider"></hr>
					</li>
					<li class="dropdown-item" onClick={handleLogout}>Logout</li>
				</ul>
			</div> 
		</div>
	</div>) 
	: (
		<div class="position-relative">
		<div class="d-flex flex-column flex-shrink-0 p-1 border-right border-primary" style={{width: "280px",height:"100vh", float:"center"}}>
		<div class="welcome">
			<h2 class="welcome_text" align = "center">Welcome!</h2>
		</div>

		<Link to="/auth" align = "center">
		<div class="confirm_btn">
			<button class="btn  btn-lg" align = "center" Link to="/auth" role="button">
				<div class="cfm_text"> Confirm Your Identity </div>
			</button>
		</div>
		</Link>
		</div>
		</div>
	)}
			
			
    	</div>
	</div>
  
  
	</>
    )};

export default Navbar;