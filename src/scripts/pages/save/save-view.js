const createSavedStoryItemTemplate = (story, index) => `
  <article class="story-item" tabindex="0" aria-labelledby="saved-title-${index} saved-desc-${index}">
    <img src="${story.photoUrl}" alt="Foto cerita oleh ${story.name}" class="story-img" />
    <h2 id="saved-title-${index}">${story.name}</h2>
    <p id="saved-desc-${index}">${story.description}</p>
    <small>${story.createdAt}</small>
    ${story.lat && story.lon ? `<p>Lokasi: ${story.lat}, ${story.lon}</p>` : ''}
    <button class="unsave-button" data-id="${story.id}">Hapus Cerita Tersimpan</button>
  </article>
`;

const SaveView = {
  init(container) {
    this._container = container;
  },

  renderLoading() {
    this._container.innerHTML = '<p>Memuat cerita tersimpan...</p>';
  },

  renderEmpty() {
    this._container.innerHTML = `
      <section class="container" id="saved-empty-message">
        <p>Anda belum menyimpan cerita apapun.</p>
      </section>
    `;
  },

  renderStories(stories) {
    if (!stories.length) {
      this.renderEmpty();
      return;
    }

    this._container.innerHTML = `
      <section class="container" aria-labelledby="saved-main-heading">
        <h1 id="saved-main-heading">Cerita Tersimpan</h1>
        <div id="saved-stories-list" class="story-list">
          ${stories.map(createSavedStoryItemTemplate).join('')}
        </div>
      </section>
    `;

    this._attachUnsaveButtons();
  },

  renderError(message) {
    this._container.innerHTML = `<p class="error">${message}</p>`;
  },

  _attachUnsaveButtons() {
    const unsaveButtons = this._container.querySelectorAll('.unsave-button');
    unsaveButtons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.id;
        this._onUnsaveClick(id);
      });
    });
  },

  setUnsaveHandler(handler) {
    this._onUnsaveClick = handler;
  }
};

export default SaveView;
