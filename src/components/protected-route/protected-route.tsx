import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "redux/hooks";
import { getUser as getUserSelector } from "redux/selectors";
import { getUserThunk } from "redux/user/thunks";

export const ProtectedRoute: FC<{ element: ReactElement }> = ({ element }) => {
  const { profile } = useTypedSelector(getUserSelector);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const dispatch = useTypedDispatch();

  const init = useCallback(async () => {
    await dispatch(getUserThunk());
    setUserLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  if (!isUserLoaded) {
    return null;
  }

  return profile ? element : <Navigate to="/login" replace />;
};
