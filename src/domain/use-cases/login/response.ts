export interface LoginReportResponse {
  user: User;
}

interface User {
  token?: string;
  email?: string;
  name?: string;
  lastNames?: string;
}
