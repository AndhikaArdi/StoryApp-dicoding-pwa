const LoginView = {
  getTemplate() {
    return `
      <section class="container" aria-labelledby="main-heading">
        <h2 id="main-heading">Login</h2>
        <form id="login-form" role="form">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
          <button type="submit">Login</button>
        </form>
        <p>Belum punya akun? <a href="#/register">Register di sini</a></p>
      </section>
    `;
  },

  render(container) {
    container.innerHTML = this.getTemplate();
  },

  bindLoginHandler(handler) {
    const form = document.querySelector('#login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;
      handler({ email, password });
    });
  },

  showSuccess(message) {
    alert(message);
  },

  showError(message) {
    alert(message);
  },

  navigateToHome() {
    window.location.hash = '/';
  },
};

export default LoginView;
