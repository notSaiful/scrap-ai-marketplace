export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
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
    email: string;
    phone: string;
    password: string;
    name?: string;
    companyName?: string;
    role?: UserRole;
    country?: string;
  }) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => void;
  logout: () => void;
  quickDemoLogin: (role: UserRole) => void;
}
