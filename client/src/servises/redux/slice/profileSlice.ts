import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProfileEntities from "domain/entities/ProfileEntities/Profile.entities";
import { useCaseProfileEntiti } from "domain/use-case/useCaseProfile";
import RequestProfile from "servises/repository/Axios/Request/Request.Profile";

const profileuseCase = new useCaseProfileEntiti()

export const fetchUser = createAsyncThunk(
  'user/create',
  async (_, {dispatch,rejectWithValue }) => {
    try {
      
      const result = await RequestProfile.register()
      return result.data
      
    } catch (error: any) {
      dispatch(AuthFailAction())
      return rejectWithValue(error.response.data)
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState:ProfileEntities.getEntities,
  reducers: profileuseCase.getReduserAction,
  extraReducers: (builder) =>profileuseCase.getExtraReducersAction(builder)
      .ProfileAction(fetchUser)
})
export const { AuthFailAction,setProfileAction} = profileSlice.actions
export default profileSlice