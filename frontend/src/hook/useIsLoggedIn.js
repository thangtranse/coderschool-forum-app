import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROFILE } from "../apollo/query/user";
import { persistor } from "../reducer";
import { logoutAction } from "../reducer/authen";
import { setProfile } from "../reducer/profile";

function useIsLoggedIn() {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const { data, error } = useQuery(GET_PROFILE, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (data) {
      dispatch(setProfile(data.profile));
      return true;
    }
    if (error) {
      persistor.purge();
      dispatch(logoutAction());
      return false;
    }
  });

  useEffect(() => {
    if (data) {
      dispatch(setProfile(data.profile));
      setIsLoggedIn(true);
    }
    if (error) {
      persistor.purge();
      dispatch(logoutAction());
      setIsLoggedIn(false);
    }
  }, [data, error, dispatch]);

  return isLoggedIn;
}

export default useIsLoggedIn;
