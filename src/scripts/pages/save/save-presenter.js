import SaveModel from './save-model.js';

export default class SavePresenter {
  constructor({ view }) {
    this.view = view;
  }

  async init() {
    this.view.renderLoading();

    try {
      const stories = await SaveModel.getAllSavedStories();
      this.view.renderStories(stories);
      this.view.setUnsaveHandler(this._handleUnsaveStory.bind(this));
    } catch (error) {
      this.view.renderError(`Gagal memuat cerita tersimpan: ${error.message}`);
    }
  }

  async _handleUnsaveStory(id) {
    try {
      await SaveModel.deleteSavedStory(id);
      const updatedStories = await SaveModel.getAllSavedStories();
      this.view.renderStories(updatedStories);
    } catch (error) {
      this.view.renderError(`Gagal menghapus cerita tersimpan: ${error.message}`);
    }
  }
}
