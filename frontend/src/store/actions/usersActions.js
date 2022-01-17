import usersSlice from "../slices/usersSlice";

export const {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  clearError,
  googleLoginRequest,
  logout,
} = usersSlice.actions;