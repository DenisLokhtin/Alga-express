import usersSlice from "../slices/usersSlice";

export const {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  clearError,
  userDateRequest,
  userDateSuccess,
  userDateFailure,
  editUserDataRequest,
  editUserDataSuccess,
  editUserDataFailure,
  editPassportRequest,
  editPassportSuccess,
  editPassportFailure,
  logout,
} = usersSlice.actions;