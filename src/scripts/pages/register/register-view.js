const RegisterView = {
  getTemplate() {
    return `
      <section class="container" aria-labelledby="main-heading">
        <h2 id="main-heading">Register</h2>
        <form id="register-form" role="form">
          <label for="name">Nama</label>
          <input type="text" id="name" name="name" required>

          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>

          <label for="password">Password</label>
          <input type="password" id="password" name="password" required aria-describedby="password-help">
          <small id="password-help">Gunakan minimal 8 karakter.</small>

          <button type="submit">Register</button>
        </form>
        <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
      </section>
    `;
  },

  render(container) {
    container.innerHTML = this.getTemplate();
  },

  bindRegisterHandler(handler) {
    const form = document.querySelector('#register-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      handler({ name, email, password });
    });
  },

  showSuccess(message) {
    alert(message);
  },

  showError(message) {
    alert(message);
  },

  navigateToLogin() {
    window.location.hash = '/login';
  },
};

export default RegisterView;
