import { logoutAction } from "../authen";
import { persistor } from "../index";

export const Logout = () => (dispatch) => {
  dispatch(logoutAction());
  persistor.purge();
};
