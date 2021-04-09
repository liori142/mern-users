import React, { createContext, useState,useEffect } from 'react'
import RegisterPage from './components/pages/RegisterPage'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UsersPage from './components/pages/Users';
import User from './components/pages/User';
import LoginPage from './components/pages/LoginPage';
import apiService from './components/services/apiService';
import Footer from './components/Footer'
export const userContext = createContext();
export default function RoutePages() {
    const userName = localStorage.getItem('selectedUser');
    const [specificUserId, setSpecificUserId] = useState('');
    const [specificUserObj, setSpecificUserObj] = useState(null);
    const [loginNLogout,setLoginNLogout] = useState(localStorage.getItem('isLogged'))
    const myObjects = apiService
   
    function logoutHandler() {
        localStorage.removeItem('selectedUser');
        localStorage.removeItem('isLogged')
    }
    function getUser(id, obj) {
        setSpecificUserId(id);
        setSpecificUserObj(obj)
    }
    return (
        <userContext.Provider value={{ myObjects,setLoginNLogout}}>
            <Router >
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav nav-pills nav-fill">
                            <li className="nav-item py-4 px-5 nav-link">
                                <Link className='nav-link ' to="/">Users</Link>
                            </li>
                            {localStorage.getItem('isLogged') == 'true' ? <li className="nav-item px-5 py-4 h-100 nav-link">
                                <a className='nav-link' href="/login" onClick={logoutHandler}>Logout</a>
                            </li> : <>
                                    <li className="nav-item py-4 px-5 nav-link">
                                        <Link className='nav-link' to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item py-4 px-5 nav-link ">
                                        <Link className='nav-link' to="/register">Register</Link>
                                    </li></>
                            }
                            <li className="nav-item px-5 py-4 nav-link ">
                                <pre className="welcomeClass text-danger">{(localStorage.getItem('selectedUser')) ? 'Welcome' + ` ${userName}` : ''}</pre>
                            </li>
                        </ul>
                        <div style={{width: '100%'}}>
                            <a href="https://tech-career-alternative.firebaseapp.com"  target="_blank"><img style={{float: 'right' ,borderRadius:'8px',margin:'0 30px'}} src="/techcareericon.jpeg" width="100px"/></a>
                            <a href="https://www.younglod.com"  target="_blank"><img style={{float: 'right' ,borderRadius:'8px',margin:'0 40px'}} src="/lod-station-icon.jpeg" width="100px"/></a>
                            <a href="https://www.gov.il/he/departments/news/codein-plan"  target="_blank"><img style={{float: 'right' ,borderRadius:'8px',margin:'0 40px'}} src="/codein-icon.jpeg" width="100px"/></a>
                            </div>
                    </div>
                </nav>
                <Switch>
                    <Route component={LoginPage} path="/login" >
                        <LoginPage  />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path={`/user/${specificUserId}`}>
                        <User userObject={specificUserObj} />
                    </Route>
                    <Route path="/">
                        <UsersPage />
                    </Route>
                </Switch>
                <Footer/>
            </Router>
        </userContext.Provider>



    )
}


