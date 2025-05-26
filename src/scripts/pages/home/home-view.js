import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const createStoryItemTemplate = (story, index) => `
  <article class="story-item" tabindex="0" aria-labelledby="title-${index} desc-${index}">
    <img src="${story.photoUrl}" alt="Foto cerita oleh ${story.name}" class="story-img" />
    <h2 id="title-${index}">${story.name}</h2>
    <p id="desc-${index}">${story.description}</p>
    <small>${story.createdAt}</small>
    ${story.lat && story.lon ? `<p>Lokasi: ${story.lat}, ${story.lon}</p>` : ''}
  </article>
`;

const createStoryListView = (stories) => `
  <section class="container" aria-labelledby="main-heading">
    <h1 id="main-heading">Daftar Cerita</h1>
    <div id="stories-list" class="story-list">
      ${stories.map(createStoryItemTemplate).join('')}
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

  renderLoading() {
    this._container.innerHTML = '<p>Memuat cerita...</p>';
  },

  renderStories(stories) {
    this._container.innerHTML = createStoryListView(stories);
    this._renderMap(stories);
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

