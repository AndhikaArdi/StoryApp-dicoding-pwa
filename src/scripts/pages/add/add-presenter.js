import AddModel from './add-model';
import AddView from './add-view';

export default class AddPresenter {
  constructor(container) {
    this._container = container;
  }

  async init() {
    AddView.init(this._container, this._handleFormSubmit.bind(this));
  }

  async _handleFormSubmit({ description, photo, lat, lon }) {
    if (!photo) {
      AddView.showError('Silakan pilih atau ambil gambar terlebih dahulu.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo, 'story.jpg');
    if (lat && lon) {
      formData.append('lat', lat);
      formData.append('lon', lon);
    }

    try {
      await AddModel.submitStory(formData);
      AddView.showSuccess('Cerita berhasil ditambahkan!');
    } catch (error) {
      AddView.showError(error.message);
    }
  }
}
