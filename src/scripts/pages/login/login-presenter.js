import LoginModel from './login-model.js';
import LoginView from './login-view.js';

const LoginPresenter = {
  init(container) {
    LoginView.render(container);
    LoginView.bindLoginHandler(this.handleLogin);
  },

  async handleLogin({ email, password }) {
    try {
      await LoginModel.authenticate(email, password);
      LoginView.showSuccess('Login berhasil!');
      LoginView.navigateToHome();
    } catch (error) {
      LoginView.showError('Login gagal: ' + error.message);
    }
  },
};

export default LoginPresenter;
