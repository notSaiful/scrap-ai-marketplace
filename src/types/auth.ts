export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
  role: UserRole;
  country: string;
  flag: string;
  isVerified: boolean;
  avatar?: string;
  memberSince: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  signup: (data: {
    name: string;
    email: string;
    companyName: string;
    role: UserRole;
    country: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  quickDemoLogin: (role: UserRole) => void;
}
