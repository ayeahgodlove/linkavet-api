import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "../redux/store";
import { IUserRole } from "../models/user-role.model";
import {
  addUserRoleSuccess,
  editUserRoleSuccess,
  fetchUserRolesAsync,
  setActiveUserRole,
} from "../redux/user-role.slice";
import { UserRoleService } from "../services/user-role.service";
import { useFormErrors } from "./shared/form-error.hook";
const useUserRole = () => {
  const userRoles = useSelector<IRootState, IUserRole[]>((state) => state.userRole.userRoles);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.userRole.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.userRole.initialFetch
  );
  const userRole = useSelector<IRootState, IUserRole>((state) => state.userRole.userRole);

  const dispatch = useDispatch();
  const { setformError } = useFormErrors()

  const loadUserRoles = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchUserRolesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addUserRole = async (userRole: IUserRole) => {
    return await UserRoleService.create(userRole)
      .then((userRoleResponse) => {
        dispatch(addUserRoleSuccess(userRoleResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  const setUserRole = (userRole: IUserRole) => {
    dispatch(setActiveUserRole(userRole));
  };

  const editUserRole = async (userRole: IUserRole) => {
    return await UserRoleService.update(userRole)
      .then((userRoleResponse) => {
        dispatch(editUserRoleSuccess(userRoleResponse.data));
        setUserRole(userRoleResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  useEffect(() => {
    // loadUserRoles();
  }, [userRole, userRoles, isLoading, initialFetch]);

  return {
    userRole,
    userRoles,
    isLoading,
    initialFetch,
    addUserRole,
    editUserRole,
    setUserRole,
  };
};

export { useUserRole };
