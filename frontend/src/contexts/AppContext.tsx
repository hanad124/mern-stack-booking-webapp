import React from "react";
import toast from "react-hot-toast";

type AppContext = {
  showToastr: (message: string, type: "SUCCESS" | "ERROR") => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const showToastr = (message: string, type: "SUCCESS" | "ERROR") => {
    if (type === "SUCCESS") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <AppContext.Provider value={{ showToastr }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context as AppContext;
};
