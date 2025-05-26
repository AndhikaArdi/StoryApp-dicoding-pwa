import HomeModel from './home-model.js';

export default class HomePresenter {
  constructor({ view }) {
    this.view = view;
  }

  async init() {
    try {
      this.view.renderLoading();
      const stories = await HomeModel.fetchStories();
      this.view.renderStories(stories);
    } catch (error) {
      this.view.renderError(error.message);
    }
  }

}
