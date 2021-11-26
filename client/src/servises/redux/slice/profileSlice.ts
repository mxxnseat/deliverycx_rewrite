import { createSlice } from "@reduxjs/toolkit";
import ProfileEntities from "domain/entities/ProfileEntities/Profile.entities";
import { useCaseProfileEntiti } from "domain/use-case/useCaseProfile";

const profileuseCase = new useCaseProfileEntiti()

const profileSlice = createSlice({
  name: 'profile',
  initialState:ProfileEntities.getEntities,
  reducers: profileuseCase.getReduserAction,
})
export const { AuthFailAction} = profileSlice.actions
export default profileSlice