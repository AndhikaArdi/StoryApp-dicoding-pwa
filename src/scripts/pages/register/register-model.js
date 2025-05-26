import { register } from '../../data/auth';

const RegisterModel = {
  async createAccount(name, email, password) {
    return await register({ name, email, password });
  },
};

export default RegisterModel;
