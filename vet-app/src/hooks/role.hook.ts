import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { IRole, emptyRole } from "models/role.model";
import {
  addRoleSuccess,
  editRoleSuccess,
  fetchRolesAsync,
  setActiveRole,
} from "../redux/role.slice";
import { RoleService } from "services/role.service";
import { useFormErrors } from "./shared/form-error.hook";
const useRole = () => {
  const roles = useSelector<IRootState, IRole[]>((state) => state.role.roles);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.role.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.role.initialFetch
  );
  const role = useSelector<IRootState, IRole>((state) => state.role.role);

  const dispatch = useDispatch();
  const { setformError } = useFormErrors()

  const loadRoles = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchRolesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addRole = async (role: IRole) => {
    return await RoleService.create(role)
      .then((roleResponse) => {
        dispatch(addRoleSuccess(roleResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  const setRole = (role: IRole) => {
    dispatch(setActiveRole(role));
  };

  const getRole = (roleId: string) => {
    const role = roles.find((p) => p.id === roleId);
    if (!role) {
      return emptyRole;
    }
    return role;
  };

  const editRole = async (role: IRole) => {
    return await RoleService.update(role)
      .then((roleResponse) => {
        dispatch(editRoleSuccess(roleResponse.data));
        setRole(roleResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  useEffect(() => {
    loadRoles();
  }, [role, roles, isLoading, initialFetch, loadRoles]);

  return {
    role,
    roles,
    isLoading,
    initialFetch,
    addRole,
    editRole,
    setRole,
    getRole
  };
};

export { useRole };
