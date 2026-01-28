interface User {
  email: string;
  password: string;
  name?: string;
}

const STORAGE_KEY = 'income_inequality_users';
const CURRENT_USER_KEY = 'current_user';

export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): boolean => {
  const users = getUsers();
  if (users.find(u => u.email === user.email)) {
    return false; // User already exists
  }
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return true;
};

export const validateLogin = (email: string, password: string): boolean => {
  // Demo credentials
  if (email === 'demo@project.com' && password === 'Dashboard123') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ email, name: 'Demo User' }));
    return true;
  }
  
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return true;
  }
  return false;
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
