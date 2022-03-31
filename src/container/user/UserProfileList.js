import React, {useEffect, useState} from 'react';
import s from './Users.module.scss';
import {Button, TextareaAutosize} from "@mui/material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import {Box, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchAsyncUpdate, fetchAsyncUsersId, selectIdPage, setEdit} from "../../store/userSlice";
import Loading from "../../components/loading";
import {useForm} from "react-hook-form";
import {useDebouncedCallback} from 'use-debounce';
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";



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
    const location = useLocation();


    let schema = yup.object().shape({
        email: yup.string().email().required(),
        username: yup.string().required(),
        name: yup.string().required(),
        website: yup.string().url().required(),
        phone: yup.number().required,
        street: yup.string().required(),
        city: yup.string().required(),
        zipcode: yup.number().required(),

    });
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        ...yupResolver(schema),

    });


    const onSubmit = useDebouncedCallback(() => {
            dispatch(fetchAsyncUpdate({id, values}));
            reset();
            navigate('/card')


    }, 250);


    return (<>
        <div className={s.contentDiv}>
            <div className={s.contentPro}>
                <div className={s.partProfile}>
                    <div className={s.edit}>
                        <Button variant="contained" endIcon={<ModeEditOutlinedIcon/>} className={s.edit}
                                onClick={() => dispatch(setEdit({edit: true}))}>
                            edit
                        </Button>

                    </div>
                    {edit ? <form onSubmit={handleSubmit(onSubmit)}>

                            <div className={s.boxInput}>
                                <Box
                                    sx={{
                                        width: 400, maxWidth: '100%',

                                    }}
                                >
                                    < TextField fullWidth label={'name'} id="name" style={{
                                        position: 'absolute', marginTop: '50px', backgroundColor: "#CCD1D1", width: "500px",


                                    }}
                                                placeholder={'Name'}
                                                autoFocus
                                                name={name}
                                                value={name}
                                                {...register('name', {
                                                    required: 'Required field', pattern: {
                                                        value: /^([^0-9]*)$/,
                                                        message:'Dont Use Number'
                                                    }
                                                })}
                                                onChange={(e) => setValues({...values, name: e.target.value})}
                                                error={!!errors.name}
                                                helperText={errors?.name?.message}/>

                                    <TextField fullWidth label={'username'} id="UserName" style={{
                                        position: 'absolute', backgroundColor: "#CCD1D1", width: "500px", marginTop: '140px'
                                    }}
                                               autoFocus
                                               name={username}
                                               placeholder={`Username`}
                                               value={username}
                                               {...register('username', {
                                                   required: 'Required field', pattern: {
                                                       value: /^([^0-9]*)$/,
                                                       message:'dont use number'
                                                   }
                                               })}
                                               onChange={(e) => setValues({...values, username: e.target.value})}
                                               error={!!errors.username}
                                               helperText={errors?.username?.message}

                                    />
                                    {/*emailPage*/}
                                    <TextField fullWidth label={email} id="email" style={{
                                        position: 'absolute',
                                        backgroundColor: "#CCD1D1",
                                        width: "500px",
                                        marginTop: '230px',

                                    }}

                                               name={email}
                                               placeholder={`Email...`}
                                               autoFocus
                                               {...register('email', {
                                                   required: 'Required field', pattern: {
                                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                       message:'Enter a valid email',
                                                   }
                                               })}

                                               onChange={(e) => setValues({...values, email: e.target.value})}
                                               error={!!errors?.email}
                                               helperText={errors?.email ? errors.email.message : null}

                                    />


                                    <TextField fullWidth label={'street'} id="street" style={{
                                        position: 'absolute', backgroundColor: "#CCD1D1", width: "500px", marginTop: '320px'
                                    }}
                                               placeholder={'Street'}
                                               autoFocus
                                               value={street}
                                               onChange={(e) => setValues({...values, street: e.target.value})}
                                               error={!!errors?.street}
                                               helperText={errors?.street ? errors.street.message : null}
                                    />

                                    <TextField fullWidth label={'city'} id="city" style={{
                                        position: 'absolute', backgroundColor: "#CCD1D1", width: "500px", marginTop: '410px'
                                    }}
                                               placeholder={'City'}
                                               autoFocus
                                               value={city}
                                               onChange={(e) => setValues({...values, city: e.target.value})}
                                    />

                                    <TextField fullWidth label={'zipcode'} id="zipCode" style={{
                                        position: 'absolute', backgroundColor: "#CCD1D1", width: "500px", marginTop: '500px'
                                    }}
                                               placeholder={'Zipcode'}
                                               autoFocus
                                               value={zipcode}
                                               onChange={(e) => setValues({...values, zipcode: e.target.value})}
                                    />
                                    {/*PhonePage*/}
                                    <TextField fullWidth
                                               required
                                               label={'phone'} id="phone" style={{
                                        position: 'absolute', backgroundColor: "#CCD1D1", width: "500px", marginTop: '590px'
                                    }}
                                               placeholder={'Phone'}
                                               autoFocus
                                               value={phone}
                                               {...register('phone', {
                                                   required: 'Required field', pattern: {
                                                       value: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                                                       message:'Invalid phone number',
                                                   }
                                               })}

                                               onChange={(e) => setValues({...values, phone: e.target.value})}
                                               error={!!errors?.phone}
                                               helperText={errors?.phone ? errors.phone.message : null}
                                    />
                                    {/*WebsitePage*/}
                                    <TextField fullWidth
                                               required
                                               label={'website'} id="website" style={{
                                        position: 'absolute', backgroundColor: "#CCD1D1", width: "500px", marginTop: '680px'
                                    }}
                                               placeholder={'Website'}
                                               autoFocus
                                               name={website}
                                               {...register('website', {
                                                   required: 'Required field', pattern: {
                                                       value: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
                                                       message:"Please enter website"
                                                   }
                                               })}
                                               error={!!errors?.website}
                                               helperText={errors?.website ? errors.website.message : null}
                                               onChange={(e) => setValues({...values, website: e.target.value})}/>


                                </Box>
                            </div>
                            <Button variant="contained" type='submit' endIcon={<SendIcon/>} className={s.send}
                            >
                                Send
                            </Button>

                        </form>

                        : !showUser && users.length === 0 ? (<Loading/>) : (<form action="">
                                <Box
                                    sx={{
                                        width: 400, maxWidth: '100%',

                                    }}
                                >
                                    <TextField fullWidth label={users.name} id="name" style={{
                                        position: 'absolute',
                                        marginTop: '50px',
                                        backgroundColor: "#CCD1D1",
                                        width: "500px",

                                    }}
                                               autoFocus
                                               value={name}
                                    />

                                    <TextField fullWidth label={users.username} id="UserName" style={{
                                        position: 'absolute',
                                        backgroundColor: "#CCD1D1",
                                        width: "500px",
                                        marginTop: '140px'
                                    }}
                                               autoFocus
                                               value={username}


                                    />

                                    <TextField fullWidth label={users.email} id="email" style={{
                                        position: 'absolute',
                                        backgroundColor: "#CCD1D1",
                                        width: "500px",
                                        marginTop: '230px',

                                    }}
                                               autoFocus
                                               value={email}

                                    />

                                    <TextField fullWidth label={users.address['street']} id="street" style={{
                                        position: 'absolute',
                                        backgroundColor: "#CCD1D1",
                                        width: "500px",
                                        marginTop: '320px'
                                    }}
                                               autoFocus
                                               value={street}

                                    />

                                    <TextField fullWidth label={users.address['city']} id="city" style={{
                                        position: 'absolute',
                                        backgroundColor: "#CCD1D1",
                                        width: "500px",
                                        marginTop: '410px'
                                    }}
                                               autoFocus
                                               value={city}

                                    />

                                    <TextField fullWidth label={users.address['zipcode']} id="zipCode" style={{
                                        position: 'absolute',
                                        backgroundColor: "#CCD1D1",
                                        width: "500px",
                                        marginTop: '500px'
                                    }}
                                               autoFocus
                                               value={zipcode}

                                    />

                                    <TextField fullWidth label={users.phone} id="phone" style={{
                                        position: 'absolute',
                                        backgroundColor: "#CCD1D1",
                                        width: "500px",
                                        marginTop: '590px'
                                    }} autoFocus
                                               value={phone}

                                    />

                                    <TextField fullWidth label={users.website} id="website" style={{
                                        position: 'absolute',
                                        backgroundColor: "#CCD1D1",
                                        width: "500px",
                                        marginTop: '680px'
                                    }}
                                               autoFocus
                                               value={website}
                                    />


                                </Box>
                                <Button variant="contained" type='submit' endIcon={<SendIcon/>} className={s.send}
                                >
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
                                width: 500, height: 90, backgroundColor: "#CCD1D1", marginLeft: 5, marginTop: 725
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    </>);
};

export default UserProfileList;
