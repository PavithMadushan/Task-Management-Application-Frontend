export type UserRole = 'Admin' | 'User';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedOn: string;   
  status: UserStatus;
  avatarUrl?: string;
}