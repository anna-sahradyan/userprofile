import React from 'react';
import s from "../../container/user/Users.module.scss";
import {Box, Typography} from "@mui/material";

const Card = () => {
    return (
        <>
            <div className={s.contentDiv}>
                <div className={s.contentPro}>
                    <div className={s.partArrow}>
                        <img src='img/go.jpg'alt={'arrow'} style={{width:'100%',marginTop:'3px',position:'absolute'}}/>
                        <Box>
                            <Typography variant="h4" component="div" gutterBottom style={{position:"absolute",marginTop:"10px",transform: 'translate(50%, 50%)'}}>
                                Changes are saved!!!
                            </Typography>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;