import HomePresenter from './home-presenter.js';
import HomeView from './home-view.js';
import { isLoggedIn } from '../../data/auth-token.js';

export default class HomePage {
  async render() {
    if (!isLoggedIn()) {
      return `
        <section class="landing-container" tabindex="-1">
          <h2 id="main-heading">Selamat Datang!</h2>
          <p>Silakan login atau daftar untuk mengakses cerita.</p>
          <a href="#/login">Login</a>
          <a href="#/register">Daftar</a>
        </section>
      `;
    }
    return `<section class="container" id="main-content">Memuat...</section>`;
  }

  async afterRender() {
    if (!isLoggedIn()) return;

    const content = document.querySelector('#main-content');
    HomeView.init(content);

    const presenter = new HomePresenter({ view: HomeView });
    await presenter.init();

    const heading = document.querySelector('#main-heading');
    if (heading) heading.focus();
  }
}
