export default class AboutPresenter {
  constructor(view) {
    this._view = view;
  }

  async init() {
    try {
      const aboutData = {
        description: "Aplikasi Berbagi Cerita adalah platform web interaktif yang memungkinkan pengguna untuk membagikan pengalaman, kisah, atau momen berharga dalam bentuk cerita singkat disertai foto dan lokasi. Dengan antarmuka yang sederhana dan ramah pengguna, aplikasi ini mendukung komunitas untuk saling terhubung melalui cerita-cerita autentik dari berbagai penjuru. Fitur seperti peta interaktif, pengunggahan gambar langsung dari kamera, serta tampilan daftar cerita yang dinamis menjadikan pengalaman berbagi dan membaca cerita semakin hidup dan menyenangkan.",
        profile: {
          name: "Kandela Andhika Ardi",
          bio: "Seorang mahasiswa Universitas Dian Nuswantoro jurusan Teknologi Informatika yang menyukai bidang Frot-end dan Back-end Developer."
        }
      };

      this._view.showAboutContent(aboutData);
    } catch (error) {
      this._view.showError(error.message);
    }
  }
}
