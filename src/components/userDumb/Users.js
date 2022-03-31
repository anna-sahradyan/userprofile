import React from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {purple} from '@mui/material/colors';
import {deepPurple} from '@mui/material/colors';
import {NavLink} from "react-router-dom";


const ColorButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[900],
    '&:hover': {
        backgroundColor: deepPurple[500],
    },
}));


const Users = (props) => {
    return (
        <>

            <ul>
                <li><b>Name:</b><span>{props.name}</span></li>
                <li><b>City:</b><span>{props.city}</span></li>
                <li><b>Company:</b><span>{props.company}</span></li>
                <Stack spacing={3} direction="row">
                    <NavLink to={`/userprofile/${props.id}`}><ColorButton variant="contained"> see profile</ColorButton></NavLink>

                </Stack>

            </ul>


        </>
    );
};

export default Users;
