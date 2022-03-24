import React from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import UserProfileList from "./container/user/UserProfileList";
import Home from "./components/Home";
import EditList from "./container/edit/EditList";

const App = () => {
    return (
        <>
        <div className='wrapper'>
            <Header/>
            <div className='main'>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/userprofile/:id'} element={<UserProfileList/>}/>
                </Routes>

            </div>
        </div>
    </>);
};

export default App;