import React, {useEffect, useState} from 'react';
import s from './Container.module.scss';
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchAsyncGetUsers, selectUsers} from "../store/userSlice";
import Users from '../components/userDumb/Users'
import Loading from "../components/loading";

const ProfileList = () => {
    const {status, error} = useSelector(state => state.user);
    const users = useSelector(selectUsers);
    const [flag, setFlag] = useState(false)
    const [sortUser, setSortUser] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncGetUsers())

    }, [dispatch]);
    const sortResult = (field) => {
        const copySort = users.concat();
        setSortUser(copySort);
        const sortData = copySort.sort((a, b) => {
            const companyName = a.company[field] > b.company[field];
            const cityName = a.address[field] > b.address[field];
            return companyName || cityName ? 1 : -1;
        });

        setSortUser(sortData)
        setFlag(true);


    }


    return (
        <>
            <div className={s.contentDiv}>
                <div className={s.content}>
                    <Button variant="contained" disableElevation
                            style={{position: 'absolute', marginTop: '140px', width: '200px'}}
                            onClick={() => sortResult('city')}>
                        Sort By City
                    </Button>
                    <Button variant="contained" disableElevation
                            style={{position: 'absolute', marginTop: '60px', width: '200px'}}
                            onClick={() => sortResult('name')}>
                        Sort By Company
                    </Button>
                    <div className={s.partUsers}>
                        <div className={s.statusPage}>
                         {status === 'loading' && <h2><Loading/></h2>}
                            {error && <h2>An Error occurred:{error}</h2>}
                        </div>
                        <div className={s.card}>
                            {(flag ? sortUser.map((item, index) => <Users key={`${item}_${index}`} name={item.name}
                                                                          city={item.address['city']}
                                                                          company={item.company['name']} id={item.id}
                            />) : (users.map((item, index) => <Users key={`${item}_${index}`} name={item.name}
                                                                     city={item.address['city']}
                                                                     company={item.company['name']} id={item.id}
                                                                   />)))}

                        </div>
                        <p>Ten user found:{users.length}</p>
                    </div>

                </div>
            </div>

        </>
    );
};

export default ProfileList;