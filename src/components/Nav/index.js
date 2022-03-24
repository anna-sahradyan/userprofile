import React from 'react';
import {NavLink} from "react-router-dom";
import s from '../Header/Header.module.scss';

const Nav = () => {

    return (
        <>
            <nav className={s.nav}>
            <ul>
                <NavLink to={'/'}><li>Home</li></NavLink>
               <NavLink to={'/userprofile/:id'} ><li>UserProfile</li></NavLink>


            </ul>
            </nav>
        </>
    );
};

export default Nav;