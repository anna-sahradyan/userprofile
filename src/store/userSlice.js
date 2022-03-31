import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//getUser
export const fetchAsyncGetUsers = createAsyncThunk('user/fetchAsyncUsers', async function (_, {rejectWithValue}) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        if (!response.ok) {
            throw new Error('Server Error!');
        }
        const data = await response.json();

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }

})
//idPage
export const fetchAsyncUsersId = createAsyncThunk('user/fetchAsyncUsersId', async function (id, {rejectWithValue}) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
            throw new Error('Server Error!');
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }

});
//update

export const fetchAsyncUpdate = createAsyncThunk('user/fetchAsyncUpdate', async function ({id,values}, {rejectWithValue}) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT', headers: {
                Accept: 'application/json', "Content-Type": 'application/json'
            }, body: JSON.stringify({
                name: values.name,
                username: values.username,
                email: values.email,
                street: values.street,
                city: values.city,
                zipcode: values.zipcode,
                phone: values.phone,
                website: values.website

            })

        });
        if (!response.ok) {
            throw new Error('Server Error!');
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }

});
const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}
const userSlice = createSlice({
    name: 'user', initialState: {
        user: [],
        selectId: [],
        status: null,
        error: null,
        edit: false,
        name: "",
        username: "",
        email: "",
        street: "",
        city: "",
        zipcode: "",
        phone: "",
        website: "",
    }, reducers: {
        setEdit: (state, action) => {
            state.edit = action.payload.edit;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.zipcode = action.payload.zipcode;
            state.website = action.payload.website;
            state.city = action.payload.city;
            state.street = action.payload.street;

        }

    }, extraReducers: {
        [fetchAsyncGetUsers.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchAsyncGetUsers.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.user = action.payload;
        },

        [fetchAsyncUpdate.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchAsyncUpdate.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.user = action.payload;
        },

        [fetchAsyncUsersId.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchAsyncUsersId.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.selectId = action.payload;


        },

        [fetchAsyncGetUsers.rejected]: setError,
        [fetchAsyncUpdate.rejected]: setError,
        [fetchAsyncUsersId.rejected]: setError,


    }
});
export const {setEdit} = userSlice.actions;
export const selectIdPage = state => state.user.selectId;
export const selectUsers = state => state.user.user;
export default userSlice.reducer;