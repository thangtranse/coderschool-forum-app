import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROFILE } from "../apollo/query/user";
import { logoutAction } from "../reducer/authen";
import { setProfile } from "../reducer/profile";

function useIsLoggedIn() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.accessToken);

  const { data, error } = useQuery(GET_PROFILE, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (data) {
      dispatch(setProfile(data.profile));
      return true;
    }
    if (error) {
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
      dispatch(logoutAction());
      setIsLoggedIn(false);
    }
  }, [data, error, dispatch]);

  return isLoggedIn;
}

export default useIsLoggedIn;
