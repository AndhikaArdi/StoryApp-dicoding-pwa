export default class AboutView {
  getTemplate() {
    return `
      <section class="container" id="about-section" aria-labelledby="main-heading">
        <h1 id="main-heading" tabindex="-1">About</h1>
        <div id="about-content">Memuat...</div>
      </section>
    `;
  }

  showAboutContent({ description, profile }) {
    const target = document.getElementById('about-content');
    if (target) {
      target.innerHTML = `
        <p><strong>Deskripsi Aplikasi:</strong> ${description}</p>
        <h2>Profil Saya</h2>
        <p><strong>Nama:</strong> ${profile.name}</p>
        <p><strong>Bio:</strong> ${profile.bio}</p>
      `;
    }
  }

  showError(message) {
    const target = document.getElementById('about-content');
    if (target) {
      target.innerHTML = `<p class="error">Gagal memuat konten: ${message}</p>`;
    }
  }
}
