import AddPresenter from './add-presenter';
import { isLoggedIn } from '../../data/auth-token';

export default class AddPage {
  async render() {
    if (!isLoggedIn()) {
      return `
        <section class="container">
          <h2>Akses Ditolak</h2>
          <p>Anda harus login terlebih dahulu untuk menambahkan cerita.</p>
          <a href="#/login">Login Sekarang</a>
        </section>
      `;
    }

    return `<section class="container" id="add-page-content" aria-labelledby="main-heading"></section>`;
  }

  async afterRender() {
    if (!isLoggedIn()) return;

    const container = document.querySelector('#add-page-content');
    const presenter = new AddPresenter(container);
    presenter.init();
  }
}
