import { login } from '../../data/auth';
import { setToken } from '../../data/auth-token';

const LoginModel = {
  async authenticate(email, password) {
    const { loginResult } = await login({ email, password });
    setToken(loginResult.token);
    return loginResult;
  },
};

export default LoginModel;
