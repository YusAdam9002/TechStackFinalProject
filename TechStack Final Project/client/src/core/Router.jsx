import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../components/Shared/Home';
import Login from "../components/Shared/Login";
import Profile from "../components/Student/Profile/Profile";
import SearchUsers from "../components/Employer/Search/SearchUsers";
import FooterBar from "./FooterBar";

import { useEffect, useMemo } from "react";
import Register from "../components/Shared/Register";
import HeaderBar from "./HeaderBar";
import LandingPage from "./LandingPage";
import ErrorPage from "./ErrorPage";
import Chat from "../components/Employer/Chat/Chat";
import EmployerJobs from "../components/Employer/Jobs/EmployerJobs"
import StudentJobs from "../components/Student/Jobs/StudentJobs"

const Router = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={
                    <div style={{ marginBottom: '110px' }}>
                        <HeaderBar /><FooterBar /><Home />
                    </div>
                } />
                <Route path='/chat' element={
                    <div style={{ marginBottom: '110px' }}>
                        <HeaderBar /><FooterBar /><Chat />
                    </div>
                } />

                <Route
                    path='/jobs'
                    element={
                        <div style={{ marginBottom: '110px' }}>
                            <HeaderBar /><FooterBar />{props.role == 2 ? <StudentJobs /> : < EmployerJobs/>}
                        </div>
                    }
                />

                {props.role == 2 ? // Student
                    <>
                        <Route
                            path='/profile'
                            element={
                                <div style={{ marginBottom: '110px' }}>
                                    <HeaderBar /><FooterBar /><Profile />
                                </div>
                            }
                        />
                    </>
                    : null}
                {props.role == 1 ? // Employer
                    <>
                        <Route
                            path='/search'
                            element={
                                <div style={{ marginBottom: '110px' }}>
                                    <HeaderBar /><FooterBar /><SearchUsers />
                                </div>
                            }
                        />
                    </>
                    : null}
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Router;