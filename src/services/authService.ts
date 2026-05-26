export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends AuthUser {
  password: string;
}

const USERS_KEY = 'cv-builder-pro:auth-users';
const SESSION_KEY = 'cv-builder-pro:auth-session';

function getUsers(): StoredUser[] {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as StoredUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toAuthUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export const authService = {
  getCurrentUser(): AuthUser | null {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      return null;
    }
  },

  async login(email: string, password: string): Promise<AuthUser> {
    await new Promise((resolve) => setTimeout(resolve, 450));
    const user = getUsers().find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    );

    if (!user) {
      throw new Error('E-mail ou senha inválidos.');
    }

    const authUser = toAuthUser(user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    return authUser;
  },

  async register(name: string, email: string, password: string): Promise<AuthUser> {
    await new Promise((resolve) => setTimeout(resolve, 550));
    const users = getUsers();
    const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      throw new Error('Já existe uma conta com este e-mail.');
    }

    const user: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };

    saveUsers([...users, user]);
    const authUser = toAuthUser(user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    return authUser;
  },

  async recoverPassword(email: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const user = getUsers().find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('Nenhuma conta encontrada com este e-mail.');
    return 'Enviamos as instruções de recuperação para seu e-mail.';
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },
};
