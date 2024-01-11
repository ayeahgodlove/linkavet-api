import { useDispatch, useSelector } from "react-redux";
import { setActiveTheme } from "redux/shared/theme.slice";
import { IRootState } from "redux/store";

const useTheme = () => {
  const dispatch = useDispatch();

  const isDarkMode = useSelector<IRootState, boolean>(
    (state) => state.theme.isDarkMode
  );
  
  const handleSetTheme = async () => {
    dispatch(setActiveTheme(!isDarkMode));
  };

  return {
    handleSetTheme,
    isDarkMode
  };
};

export { useTheme };
