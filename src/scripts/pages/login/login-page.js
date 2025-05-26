import LoginPresenter from './login-presenter';

export default class LoginPage {
  async render() {
    return `<div class="container" id="login-container"></div>`;
  }

  async afterRender() {
    const container = document.querySelector('#login-container');
    LoginPresenter.init(container);
  }
}
