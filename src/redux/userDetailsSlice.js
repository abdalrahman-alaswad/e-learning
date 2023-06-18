import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"

export const getReviews = createAsyncThunk(
    'userDetailsSlice/getReviews',
    async ({ pending }) => {
        const res = await axios.get(`https://awesomeapp-1-e9667851.deta.app/review/filter/${pending}`,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            });
        return res.data;
    }
)
export const sendReviews = createAsyncThunk(
    'userDetailsSlice/sendReviews',
    async ({ rate, content, userID }) => {
        const res = await axios.post('https://awesomeapp-1-e9667851.deta.app/review', { rate, content, userID },
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            });
        return res.data;
    }
)
export const getUserDetails = createAsyncThunk(
    'userDetailsSlice/getUserDetails',
    async ({ userID }) => {
        const res = await axios.get(`https://awesomeapp-1-e9667851.deta.app/user/id/${userID}`,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            });
        return res.data;
    }
)
export const editProfile = createAsyncThunk(
    'userDetailsSlice/editProfile',
    async ({ userID, email, password, passwordConfirm, fullName, phone, avatar }) => {
        const res = await axios.put(`https://awesomeapp-1-e9667851.deta.app/user/${userID}`,
            { email, password, passwordConfirm, fullName, phone, avatar },
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            });
        return res.data;
    }
)
export const reservationsDisplay = createAsyncThunk(
    'userDetailsSlice/reservationsDisplay',
    async () => {
        const res = await axios.get(`https://awesomeapp-1-e9667851.deta.app/request`,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            });
        return res.data;
    }
)


const userDetailsSlice = createSlice({
    name: "userDetailsSlice",
    initialState: {
        succsess: false,
        reviews: [],
        error: "",
        userDetail: [],
        reservations: [],
        table: []
    },
    reducers: {
        register: (state, action) => {
            const fullName = action.payload.fullName
            const email = action.payload.email
            const password = action.payload.password
            const passwordConfirm = action.payload.passwordConfirm
            const phone = action.payload.phone
            axios.post("https://awesomeapp-1-e9667851.deta.app/register", { fullName, email, password, passwordConfirm, phone }
            )
                .then(res => {
                    Cookies.set("userToken", res.data.token)
                    Cookies.set("userRole", res.data.role)
                    Cookies.set("userName", res.data.fullName)
                    Cookies.set("userId", res.data._id)

                })
                .catch(err => {
                    console.log(err)
                })
        },
        login: (state, action) => {
            const email = action.payload.email
            const password = action.payload.password
            axios.post("https://awesomeapp-1-e9667851.deta.app/login", {
                email, password
            })
                .then(res => {
                    Cookies.set("userToken", res.data.token)
                    Cookies.set("userRole", res.data.role)
                    Cookies.set("userId", res.data.id)
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    extraReducers: {
        [getReviews.pending]: (state) => {

        },
        [getReviews.fulfilled]: (state, { payload }) => {
            state.reviews = payload

        },
        [getReviews.rejected]: (state, action) => {
            state.error = action.error.message

        },
        [sendReviews.pending]: (state) => {

        },
        [sendReviews.fulfilled]: (state, action) => {

        },
        [sendReviews.rejected]: (state, action) => {
            state.error = action.error.message

        },
        [getUserDetails.pending]: (state) => {

        },
        [getUserDetails.fulfilled]: (state, { payload }) => {
            state.userDetail = payload
        },
        [getUserDetails.rejected]: (state, action) => {
            state.error = action.error.message
            console.log(action)
        },
        [editProfile.pending]: (state) => {

        },
        [editProfile.fulfilled]: (state, action) => {
            console.log(action)
        },
        [editProfile.rejected]: (state, action) => {
            state.error = action.error.message
            console.log(action)
        },
        [reservationsDisplay.pending]: (state) => {

        },
        [reservationsDisplay.fulfilled]: (state, { payload }) => {
            state.reservations = payload
        },
        [reservationsDisplay.rejected]: (state, action) => {
            state.error = action.error.message
            console.log(action)
        },
    }
})
const { actions, reducer } = userDetailsSlice;
export const { register, login } = actions;
export default reducer