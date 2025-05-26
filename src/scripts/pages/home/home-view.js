import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import SaveModel from '../save/save-model.js';

const createStoryItemTemplate = (story, index, savedStories) => {
  const isSaved = savedStories.some(s => s.id === story.id);
  return `
    <article class="story-item" tabindex="0" aria-labelledby="title-${index} desc-${index}">
      <img src="${story.photoUrl}" alt="Foto cerita oleh ${story.name}" class="story-img" />
      <h2 id="title-${index}">${story.name}</h2>
      <p id="desc-${index}">${story.description}</p>
      <small>${story.createdAt}</small>
      ${story.lat && story.lon ? `<p>Lokasi: ${story.lat}, ${story.lon}</p>` : ''}
      <button class="save-button" data-id="${story.id}" aria-pressed="${isSaved}">
        ${isSaved ? 'Cerita Tersimpan' : 'Simpan Cerita'}
      </button>
    </article>
  `;
};

const createStoryListView = (stories, savedStories) => `
  <section class="container" aria-labelledby="main-heading">
    <h1 id="main-heading">Daftar Cerita</h1>
    <div id="stories-list" class="story-list">
      ${stories.map((story, index) => createStoryItemTemplate(story, index, savedStories)).join('')}
    </div>
    <section class="map-section">
      <h2>Peta Lokasi Cerita</h2>
      <div id="story-map" style="height: 400px; width: 100%;"></div>
    </section>
  </section>
`;

const HomeView = {
  init(container) {
    this._container = container;
  },

  async renderLoading() {
    this._container.innerHTML = '<p>Memuat cerita...</p>';
  },

  async renderStories(stories) {
    const savedStories = await SaveModel.getAllSavedStories();

    this._container.innerHTML = createStoryListView(stories, savedStories);
    this._renderMap(stories);

    this._container.querySelectorAll('.save-button').forEach((button) => {
      button.addEventListener('click', async (event) => {
        const id = button.getAttribute('data-id');
        const story = stories.find(s => s.id.toString() === id);
        if (!story) return;

        const isAlreadySaved = savedStories.some(s => s.id === story.id);

        if (isAlreadySaved) {
          alert('Cerita sudah tersimpan.');
        } else {
          try {
            await SaveModel.saveStory(story);
            button.textContent = 'Cerita Tersimpan';
            button.setAttribute('aria-pressed', 'true');
            savedStories.push(story);
          } catch (error) {
            alert('Gagal menyimpan cerita: ' + error.message);
          }
        }
      });
    });
  },

  renderError(message) {
    this._container.innerHTML = `<p class="error">Gagal memuat cerita: ${message}</p>`;
  },

  _renderMap(stories) {
    const map = L.map('story-map').setView([-2.5489, 118.0149], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
    });

    stories.forEach((story) => {
      if (story.lat && story.lon) {
        L.marker([story.lat, story.lon])
          .addTo(map)
          .bindPopup(`<strong>${story.name}</strong><br>${story.description}`);
      }
    });
  }
};

export default HomeView;

