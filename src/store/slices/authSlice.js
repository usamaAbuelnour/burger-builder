import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as axiosAuth from '../../HttpRequests/axiosFirebaseAuth';



export const signUp = createAsyncThunk('auth', (authData)=>{
    return axiosAuth.signUp.post(null, authData).then(res=>res.data, err=>err.response.data.error.message);
});

export const signIn = createAsyncThunk('auth', authData =>{
    return axiosAuth.signIn.post(null, authData).then(res=>res.data, err=>err.response.data.error.message);
});


const initialState = {
    token: !localStorage.length ? null : localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    error: null,
    loading: false,
    signInSource: 'link'
}; 

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetErr(state){state.error=null},
        signOut(state){
            localStorage.removeItem('token');
            state.token = null;
        },
        signInSource(state, action){state.signInSource = action.payload}
    },
    extraReducers: builder=>{
        builder.addCase(signUp.fulfilled || signIn.fulfilled, (state, action)=>{
            if(typeof(action.payload)==='object'){
                localStorage.setItem('token', action.payload.idToken);
                state.token = localStorage.getItem('token');
                localStorage.setItem('userId', action.payload.localId);
                state.userId = localStorage.getItem('userId');
                state.error = null;
                
            }
            else{
                state.token = null;
                state.error = action.payload;
            }
            state.loading=false;
        })
        .addCase(signUp.pending || signIn.pending, (state)=>{state.loading=true})
    }
});
export const {resetErr, signOut, signInSource} = authSlice.actions;
export default authSlice.reducer;

