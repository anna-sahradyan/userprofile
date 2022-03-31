import React from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import UserProfileList from "./container/user/UserProfileList";
import Home from "./components/Home";
import Card from "./components/userDumb/Card";


const App = () => {

    return (
        <>

        <div className='wrapper'>
            <Header/>
            <div className='main'>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/userprofile/:id'} element={<UserProfileList/>}/>
                    <Route path={'/card'} element={<Card/>}/>
                </Routes>

            </div>
        </div>
    </>);
};

export default App;