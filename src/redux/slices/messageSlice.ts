import { createSlice } from '@reduxjs/toolkit'
import { Message } from '../../Models/message.model';


const initalMessage:Message=new Message("Success","not nothing")

const messageSlice = createSlice({
    initialState: { message: initalMessage },
    name: 'massage',
    reducers: {
        setMessage:(state,action)=>{
        state.message.text=action.payload.text
        state.message.type=action.payload.type
        },
    }
})

export default messageSlice.reducer;
export const { setMessage} = messageSlice.actions;