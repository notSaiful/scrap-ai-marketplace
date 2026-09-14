import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, UserRole } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, User> = {
  buyer: {
    id: 'usr-buyer-01',
    name: 'Rahul Verma',
    email: 'rahul.verma@apexsmelting.in',
    companyName: 'Apex Smelting & Refining Corp',
    role: 'buyer',
    country: 'India',
    flag: '🇮🇳',
    isVerified: true,
    memberSince: 'Jan 2025',
  },
  seller: {
    id: 'usr-seller-02',
    name: 'Marcus Van Dijk',
    email: 'marcus@rotterdammetals.nl',
    companyName: 'Rotterdam Circular Metals Yard',
    role: 'seller',
    country: 'Netherlands',
    flag: '🇳🇱',
    isVerified: true,
    memberSince: 'Sep 2024',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('wastemarket_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('wastemarket_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('wastemarket_user');
      }
    } catch {
      // ignore localStorage quota errors
    }
  }, [user]);

  const login = async (email: string, _password: string, role: UserRole = 'buyer'): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 400));
    
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Trader User',
      email: email,
      companyName: `${email.split('@')[1]?.split('.')[0]?.toUpperCase() || 'INDUSTRIAL'} Global Corp`,
      role: role,
      country: 'India',
      flag: '🇮🇳',
      isVerified: true,
      memberSince: 'Sep 2026',
    };

    setUser(newUser);
    return true;
  };

  const signup = async (data: {
    email: string;
    phone: string;
    password: string;
    name?: string;
    companyName?: string;
    role?: UserRole;
    country?: string;
  }): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 400));
    
    const derivedName = data.name || data.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Trader User';

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: derivedName,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      role: data.role || 'buyer',
      country: data.country || 'India',
      flag: '🇮🇳',
      isVerified: true,
      memberSince: 'Sep 2026',
    };

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const quickDemoLogin = (role: UserRole) => {
    setUser(DEMO_USERS[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        quickDemoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
