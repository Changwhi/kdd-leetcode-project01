import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserRoleContextType {
  isAdmin: boolean;
  groupId: number;
  setIsAdmin: (isAdmin: boolean) => void;
  setGroupId: (groupId: number) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<number>(0)

  return (
    <UserRoleContext.Provider value={{ isAdmin, groupId, setIsAdmin, setGroupId }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
