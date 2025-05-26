import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const createAddFormTemplate = () => `
  <h1 id="main-heading" tabindex="-1">Tambah Cerita</h1>
  <form id="add-story-form" role="form">
    <label for="description">Deskripsi Cerita</label>
    <textarea id="description" name="description" required aria-required="true" aria-describedby="desc-help"></textarea>
    <small id="desc-help">Tuliskan cerita atau pengalaman Anda.</small>

    <fieldset aria-labelledby="image-options-label">
      <legend id="image-options-label">Gambar</legend>
      <div id="image-options">
        <button type="button" id="choose-file-button">Pilih dari File</button>
        <button type="button" id="use-camera-button">Gunakan Kamera</button>
      </div>
      <input type="file" id="file-input" accept="image/*" style="display:none" />
      <div id="camera-container" style="display:none">
        <video id="camera-preview" autoplay playsinline></video>
        <button type="button" id="capture-button">Ambil Gambar</button>
      </div>
      <canvas id="snapshot" style="display:none;"></canvas>
      <img id="image-preview" src="" alt="Pratinjau gambar" style="display:none; max-width: 100%;" />
    </fieldset>

    <fieldset aria-labelledby="location-label">
      <legend id="location-label">Lokasi (opsional)</legend>
      <div id="map" style="height: 300px;"></div>
      <input type="hidden" id="lat" name="latitude" />
      <input type="hidden" id="lon" name="longitude" />
    </fieldset>

    <button type="submit">Kirim Cerita</button>
  </form>
`;

const AddView = {
  init(container, onSubmit) {
    this._container = container;
    this._container.innerHTML = createAddFormTemplate();

    this._form = this._container.querySelector('#add-story-form');
    this._description = this._form.querySelector('#description');
    this._fileInput = this._form.querySelector('#file-input');
    this._chooseFileBtn = this._form.querySelector('#choose-file-button');
    this._useCameraBtn = this._form.querySelector('#use-camera-button');
    this._cameraContainer = this._form.querySelector('#camera-container');
    this._video = this._form.querySelector('#camera-preview');
    this._canvas = this._form.querySelector('#snapshot');
    this._captureButton = this._form.querySelector('#capture-button');
    this._imagePreview = this._form.querySelector('#image-preview');
    this._lat = this._form.querySelector('#lat');
    this._lon = this._form.querySelector('#lon');
    this._mapElement = this._form.querySelector('#map');

    this._currentImageBlob = null;
    this._stream = null;

    this._setupMap();
    this._setupCameraControls();
    this._setupImageInput();

    this._form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        description: this._description.value,
        photo: this._currentImageBlob,
        lat: this._lat.value,
        lon: this._lon.value,
      };

      await onSubmit(data);
    });

    window.addEventListener('hashchange', () => this._stopCamera());
  },

  showSuccess(message) {
    alert(message);
    window.location.hash = '/';
  },

  showError(message) {
    alert(`Gagal menambahkan cerita: ${message}`);
  },

  _setupImageInput() {
    this._chooseFileBtn.addEventListener('click', () => {
      this._stopCamera();
      this._fileInput.click();
    });

    this._fileInput.addEventListener('change', () => {
      const file = this._fileInput.files[0];
      if (file) {
        this._stopCamera();
        this._currentImageBlob = file;
        this._showImagePreview(URL.createObjectURL(file));
      }
    });
  },

  _setupCameraControls() {
    this._useCameraBtn.addEventListener('click', () => this._startCamera());
    this._captureButton.addEventListener('click', () => {
      const ctx = this._canvas.getContext('2d');
      this._canvas.width = this._video.videoWidth;
      this._canvas.height = this._video.videoHeight;
      ctx.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height);
      this._canvas.toBlob((blob) => {
        this._currentImageBlob = blob;
        this._showImagePreview(this._canvas.toDataURL('image/jpeg'));
        this._stopCamera();
      }, 'image/jpeg');
    });
  },

  _showImagePreview(src) {
    this._imagePreview.src = src;
    this._imagePreview.style.display = 'block';
    this._canvas.style.display = 'none';
    this._fileInput.value = '';
  },

  _startCamera() {
    this._stopCamera();
    this._cameraContainer.style.display = 'block';
    this._imagePreview.style.display = 'none';

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this._stream = stream;
        this._video.srcObject = stream;
      })
      .catch((err) => this.showError('Gagal mengakses kamera: ' + err.message));
  },

  _stopCamera() {
    if (this._stream) {
      this._stream.getTracks().forEach((track) => track.stop());
      this._stream = null;
    }
    this._video.srcObject = null;
    this._cameraContainer.style.display = 'none';
  },

  _setupMap() {
    const map = L.map(this._mapElement).setView([-2.5, 118], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
    });

    let marker;
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      this._lat.value = lat;
      this._lon.value = lng;

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }
    });
  },
};

export default AddView;
