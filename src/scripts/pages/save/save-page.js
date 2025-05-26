import SavePresenter from './save-presenter.js';
import SaveView from './save-view.js';
import { isLoggedIn } from '../../data/auth-token.js';

export default class SavePage {
  async render() {
    if (!isLoggedIn()) {
      return `
        <section class="landing-container" tabindex="-1">
          <h2 id="main-heading">Akses Ditolak</h2>
          <p>Anda harus login untuk melihat cerita tersimpan.</p>
          <a href="#/login">Login</a>
        </section>
      `;
    }

    return `<section id="main-content" class="container">Memuat...</section>`;
  }

  async afterRender() {
    if (!isLoggedIn()) return;

    const content = document.querySelector('#main-content');
    SaveView.init(content);

    const presenter = new SavePresenter({ view: SaveView });
    await presenter.init();

    const heading = document.querySelector('#main-heading');
    if (heading) heading.focus();
  }
}
