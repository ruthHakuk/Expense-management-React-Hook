import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../Models/user.model'

const defualtUser:any = localStorage.getItem('User')
const objUser:User=JSON.parse(defualtUser)
const userSlice = createSlice({
    initialState: { user: objUser },
    name: 'user',
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

    }

})

export default userSlice.reducer
export const { setUser} = userSlice.actions;
