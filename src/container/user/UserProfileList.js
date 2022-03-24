import React, {useEffect, useState} from 'react';
import s from './Users.module.scss';
import {Button, TextareaAutosize} from "@mui/material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import {useNavigate, useParams} from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import {Box, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchAsyncCreate, fetchAsyncUsersId, selectIdPage, setEdit} from "../../store/userSlice";
import Loading from "../../components/loading";

const UserProfileList = () => {
    const {status, error, edit} = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(selectIdPage);
    const {id} = useParams();
    useEffect(() => {
        if (id && id !== '') {
            dispatch(fetchAsyncUsersId(id));
        }

        return () => {

        }
    }, [dispatch, id])
    const [values, setValues] = useState({
        name: "", email: "", username: "", street: "", city: "", zipcode: "", phone: "", website: ""
    });
    const {name, email, username, street, city, zipcode, phone, website} = values;
    const [showUser, setShowUser] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({name: "", email: "", username: "", street: "", city: "", zipcode: "", phone: "", website: ""});
        dispatch(fetchAsyncCreate({values}));
        setShowUser(true);
        console.log(values);
    }

    return (
        <>
            <div className={s.contentDiv}>
                <div className={s.contentPro}>
                    <div className={s.partProfile}>
                        <div className={s.edit}>
                            <Button variant="contained" endIcon={<ModeEditOutlinedIcon/>} className={s.edit}
                                    onClick={() => dispatch(setEdit({edit: true}))}>
                                edit
                            </Button>

                        </div>
                        {edit ? <form action="">
                                <div className={s.boxInput}>
                                    <Box
                                        sx={{
                                            width: 400, maxWidth: '100%',

                                        }}
                                    >

                                        <TextField fullWidth label={'name'} id="name" style={{
                                            position: 'absolute',
                                            marginTop: '60px',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",

                                        }}
                                                   autoFocus
                                                   value={name}
                                                   onChange={(e) => setValues({...values, name: e.target.value})}/>

                                        <TextField fullWidth label={'username'} id="UserName" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '120px'
                                        }}
                                                   autoFocus
                                                   value={username}
                                                   onChange={(e) => setValues({
                                                       ...values,
                                                       username: e.target.value
                                                   })}

                                        />

                                        <TextField fullWidth label={'email'} id="email" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '180px',

                                        }}
                                                   autoFocus
                                                   value={email}
                                                   onChange={(e) => setValues({...values, email: e.target.value})}
                                        />

                                        <TextField fullWidth label={'street'} id="street" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '240px'
                                        }}
                                                   autoFocus
                                                   value={street}
                                                   onChange={(e) => setValues({...values, street: e.target.value})}
                                        />

                                        <TextField fullWidth label={'city'} id="city" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '300px'
                                        }}
                                                   autoFocus
                                                   value={city}
                                                   onChange={(e) => setValues({...values, city: e.target.value})}
                                        />

                                        <TextField fullWidth label={'zipcode'} id="zipCode" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '360px'
                                        }}
                                                   autoFocus
                                                   value={zipcode}
                                                   onChange={(e) => setValues({...values, zipcode: e.target.value})}
                                        />

                                        <TextField fullWidth label={'phone'} id="phone" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '420px'
                                        }} autoFocus
                                                   value={phone}
                                                   onChange={(e) => setValues({...values, phone: e.target.value})}
                                        />

                                        <TextField fullWidth label={'website'} id="website" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '480px'
                                        }}
                                                   autoFocus
                                                   value={website}
                                                   onChange={(e) => setValues({
                                                       ...values,
                                                       website: e.target.value
                                                   })}/>


                                    </Box>
                                </div>
                                <Button variant="contained" type='submit' endIcon={<SendIcon/>} className={s.send}
                                        onClick={handleSubmit}>
                                    Send
                                </Button>

                            </form>
                            : !showUser && users.length === 0 ? (<Loading/>) : (
                                <form action="">
                                    <Box
                                        sx={{
                                            width: 400, maxWidth: '100%',

                                        }}
                                    >
                                        <TextField fullWidth label={users.name} id="name" style={{
                                            position: 'absolute',
                                            marginTop: '60px',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",

                                        }}
                                                   autoFocus
                                                   value={name}
                                                   onChange={(e) => setValues({...values, name: e.target.value})}/>

                                        <TextField fullWidth label={users.username} id="UserName" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '120px'
                                        }}
                                                   autoFocus
                                                   value={username}
                                                   onChange={(e) => setValues({...values, username: e.target.value})}

                                        />

                                        <TextField fullWidth label={users.email} id="email" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '180px',

                                        }}
                                                   autoFocus
                                                   value={email}
                                                   onChange={(e) => setValues({...values, email: e.target.value})}
                                        />

                                        <TextField fullWidth label={users.address['street']} id="street" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '240px'
                                        }}
                                                   autoFocus
                                                   value={street}
                                                   onChange={(e) => setValues({...values, street: e.target.value})}
                                        />

                                        <TextField fullWidth label={users.address['city']} id="city" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '300px'
                                        }}
                                                   autoFocus
                                                   value={city}
                                                   onChange={(e) => setValues({...values, city: e.target.value})}
                                        />

                                        <TextField fullWidth label={users.address['zipcode']} id="zipCode" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '360px'
                                        }}
                                                   autoFocus
                                                   value={zipcode}
                                                   onChange={(e) => setValues({...values, zipcode: e.target.value})}
                                        />

                                        <TextField fullWidth label={users.phone} id="phone" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '420px'
                                        }} autoFocus
                                                   value={phone}
                                                   onChange={(e) => setValues({...values, phone: e.target.value})}
                                        />

                                        <TextField fullWidth label={users.website} id="website" style={{
                                            position: 'absolute',
                                            backgroundColor: "#CCD1D1",
                                            width: "500px",
                                            marginTop: '480px'
                                        }}
                                                   autoFocus
                                                   value={website}
                                                   onChange={(e) => setValues({...values, website: e.target.value})}/>


                                    </Box>
                                    <Button variant="contained" type='submit' endIcon={<SendIcon/>} className={s.send}
                                            onClick={handleSubmit}>
                                        Send
                                    </Button>

                                </form>


                            )}



                        <div className={s.textArea}>
                            <TextareaAutosize
                                aria-label="minimum height"
                                maxRows={3}
                                placeholder="Comments"
                                style={{
                                    width: 500, height: 90, backgroundColor: "#CCD1D1", marginLeft: 5, marginTop: 540
                                }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfileList;