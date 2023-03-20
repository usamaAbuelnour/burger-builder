import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosFirebase from "../../HttpRequests/axiosFirebaseDB";


export const ordersThunk = createAsyncThunk('oreders/thunk', userData =>{
    let myOrders;
    let ing, total;
    let count = 0;
   return axiosFirebase.get(`orders.json?auth=${userData.token}&orderBy="userId"&equalTo="${userData.userId}"`).then(res=>{
        myOrders = Object.keys(res.data).map(key1=>Object.keys(res.data[key1])
        .map(key2=>{
            if(key2 === 'ingredients'){
                ing = res.data[key1][key2];
                count++;
                }
            if(key2 === 'total'){
                total = res.data[key1][key2];
                count++;
            }
            
            if(count !== 0 && count % 2 === 0) return {ing, total}
                
        }))
            return myOrders
           
         
    })
});



const ordersSlice = createSlice({
    name: 'orders',
    initialState: null ,
    reducers: {
        clearOrders: ()=>null
    },
    extraReducers: builder=>{
        builder.addCase(ordersThunk.fulfilled, (_, action)=>action.payload)
    }
});

export const {clearOrders} = ordersSlice.actions;
export default ordersSlice.reducer;



































