import RegisterModel from './register-model';
import RegisterView from './register-view';

const RegisterPresenter = {
  init(container) {
    RegisterView.render(container);
    RegisterView.bindRegisterHandler(this.handleRegister);
  },

  async handleRegister({ name, email, password }) {
    try {
      await RegisterModel.createAccount(name, email, password);
      RegisterView.showSuccess('Registrasi berhasil! Silakan login.');
      RegisterView.navigateToLogin();
    } catch (err) {
      RegisterView.showError('Registrasi gagal: ');
    }
  },
};

export default RegisterPresenter;
