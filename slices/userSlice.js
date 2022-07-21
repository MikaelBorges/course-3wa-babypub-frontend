import { createSlice } from "@reduxjs/toolkit"; //on importe notre modèle de slice

const initialState = {
  infos: {},
  isLogged: false,
};

//on crée notre slice (objet de notre state)
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.infos = action.payload; // update the state with the action commin in named "payload"
      state.isLogged = true;
    },
    setLogout: (state) => {
      state.infos = {};
      state.isLogged = false;
    },
  },
});

//on indique ici que nos fonctions de notre slices sont des actions qu'on export pour pouvoir les utiliser avec useDispatch() dans nos composants
export const { setUser, setLogout } = userSlice.actions;

// selectors on export notre state pour pouvoir l'utiliser dans nos composants avec useSelector()
export const selectUser = (state) => state.user;

export default userSlice.reducer;