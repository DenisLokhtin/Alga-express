import usersSlice from "../slices/usersSlice";

export const {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  clearError,
  userDateResponse,
  userDateSuccess,
  userDateFailure,
  editUserDataRequest,
  editUserDataSuccess,
  editUserDataFailure,
  logout,
} = usersSlice.actions;