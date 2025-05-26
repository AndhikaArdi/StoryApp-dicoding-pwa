import AboutPresenter from './about-presenter';
import AboutView from './about-view';

export default class AboutPage {
  constructor() {
    this._view = new AboutView();
    this._presenter = new AboutPresenter(this._view);
  }

  async render() {
    return this._view.getTemplate();
  }

  async afterRender() {
    const container = document.querySelector('.landing-container');
    if (container) container.focus();

    await this._presenter.init();
  }
}
