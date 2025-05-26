import RegisterPresenter from './register-presenter';

export default class RegisterPage {
  async render() {
    return `<div class="container" id="register-container"></div>`;
  }

  async afterRender() {
    const container = document.querySelector('#register-container');
    RegisterPresenter.init(container);
  }
}
