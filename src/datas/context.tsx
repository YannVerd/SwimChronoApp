import { Button, IconButton, Snackbar, SnackbarCloseReason } from "@mui/material";
import React from "react";
import { createContext, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';


export interface IUserContext {
    user: IUser | null; 
    setUser: React.Dispatch<React.SetStateAction<IUser| null>>;
  }

export interface IDataContext {
    data: any | null;  
    setData: React.Dispatch<React.SetStateAction<any | null>>;
    snack: ISnack;
    setSnack: React.Dispatch<React.SetStateAction<ISnack>>
  
}
export interface IUser{
  id: string;
  username: string;
  email: string;
}

export interface ISnack{
  open: boolean;
  message: string
}

export const UserContext = createContext<IUserContext | null>(null);
export const DatasContext = createContext<IDataContext | null>(null);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);  // intial user
    
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
};

export const DataProvider = ({children}: {children: React.ReactNode})=>{
    const [data, setData]= useState<any | null>(null);
    const [snack, setSnack] = useState<ISnack>({open: false, message: ""})

    const handleClose = (
      event: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSnack((oldValue) => ({
        ...oldValue,
        open:false,
        message: "",

      }));
    };
  
    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
    return(
        <DatasContext.Provider value={{ data, setData, snack, setSnack }}>
          <Snackbar
            open={snack.open}
            autoHideDuration={4000}
            onClose={handleClose}
            message={snack.message}
            action={action}
            
      />
            {children}
        </DatasContext.Provider>
    )
}