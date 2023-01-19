import { createContext, ReactNode, useReducer } from 'react';
import alertReducer from './AlertReducer';

interface AlertContextType {
  alert: { msg: string; type: string } | null;
  setAlert: (msg: string, type: string) => void;
}

const AlertContext = createContext<AlertContextType>({} as AlertContextType);

interface GithubProviderType {
  children: ReactNode;
}

export const AlertProvider = ({ children }: GithubProviderType) => {
  const initialState: null | { msg: string; type: string } = null;
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg: string, type: string) => {
    dispatch({
      type: 'SET_ALERT',
      payload: {
        msg,
        type,
      },
    });
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>{children}</AlertContext.Provider>
  );
};

export default AlertContext;
