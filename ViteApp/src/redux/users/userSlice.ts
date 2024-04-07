import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    name: string;
    email: string;
    isLogin: boolean;
    stayLogged: boolean;
}

const initialState: UserState = {
    name: "",
    email: "",
    isLogin: false,
    stayLogged: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: () => initialState,
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLogin = action.payload.isLogin;
        },
        setStayLogged: (state, action) => { 
            state.stayLogged = action.payload;
        },
        addUser: (state, action) => {
            //TODO: Implementar la lógica para registrar un nuevo usuario
        }
    },
});

export const { setUser, addUser, setStayLogged, resetUser } = userSlice.actions;
export default userSlice.reducer;