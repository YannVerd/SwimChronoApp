import { createContext, useState } from "react";

export interface IUserContext {
    user: IUser | null; 
    setUser: React.Dispatch<React.SetStateAction<IUser| null>>;
  }

export interface IDataContext {
    data: any | null;  
    setData: React.Dispatch<React.SetStateAction<any | null>>;
}
export interface IUser{
  id: string;
  username: string;
  email: string;
}

export const UserContext = createContext<IUserContext | null>(null);
export const DatasContext = createContext<IDataContext | null>(null);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);  // Utilisateur initial
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
};

export const DataProvider = ({children}: {children: React.ReactNode})=>{
    const [data, setData]= useState<any | null>(null);
    return(
        <DatasContext.Provider value={{ data, setData }}>
            {children}
        </DatasContext.Provider>
    )
}