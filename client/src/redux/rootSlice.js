import { createSlice } from "@reduxjs/toolkit";
const rootSlice = createSlice({
    name: 'root',
    initialState:{
        loading:false,
        portfolioData:null,
        reloadData: false,
    },
    reducers:{
        showLoading:(state, action)=>{
            state.loading=true;
        },
        HideLoading:(state, action)=>{
            state.loading=false;
        },
        SetPortfolioData:(state, action)=>{
            state.portfolioData=action.payload;
        },
        ReloadData:(state, action)=>{
            state.reloadData = action.payload;
        }
    }
});
export default rootSlice.reducer;
export const{showLoading,HideLoading,SetPortfolioData, ReloadData}= rootSlice.actions;