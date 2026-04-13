export class User {
  id: number;
  name: string;
  lastname: string;
  username: string;
  password?: string;
  hash?: string | null;
  role_admin?: boolean;
  created_at: Date;
}
