import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { isLoggedIn, clearToken } from '../data/auth-token';

import { generateSubscribeButtonTemplate, generateUnsubscribeButtonTemplate } from '../template';
import { isServiceWorkerAvailable } from '../utils';
import { 
  isCurrentPushSubscriptionAvailable, 
  subscribe , 
  unsubscribe
} from '../utils/notification-helper';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
    this.updateNavbar();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });
    });
  }

  async updateNavbar() {
    const navList = document.querySelector('#nav-list');
    const isUserLoggedIn = isLoggedIn();

    navList.innerHTML = '';

    navList.innerHTML += '<li><a href="#/">Beranda</a></li>';
    navList.innerHTML += '<li><a href="#/about">About</a></li>';

    if (isUserLoggedIn) {
      navList.innerHTML += '<li><a href="#/save">Tersimpan</a></li>';
      navList.innerHTML += '<li><a href="#/add">Tambah Cerita</a></li>';
      navList.innerHTML += '<li><a href="#/logout">Logout</a></li>';
      navList.innerHTML += `<li id="subscribe-button-container">${generateSubscribeButtonTemplate()}</li>`;
    } else {
      navList.innerHTML += '<li><a href="#/login">Login</a></li>';
    }
  }

  async #setupPushNotification() {
    const pushNotificationTools = document.getElementById('subscribe-button-container');

    if (!pushNotificationTools) {
      return;
    }

    const isSubscribed = await isCurrentPushSubscriptionAvailable();
    if (isSubscribed) {
      pushNotificationTools.innerHTML = generateUnsubscribeButtonTemplate();
      document.getElementById('unsubscribe-button').addEventListener('click', () => {
        unsubscribe().finally(() => {
          this.#setupPushNotification();
        });
      });
 
      return;
    }

    pushNotificationTools.innerHTML = generateSubscribeButtonTemplate();
    document.getElementById('subscribe-button').addEventListener('click', () => {
      subscribe().finally(() => {
        this.#setupPushNotification();
      });
    });
  }

  async renderPage() {
    await this.updateNavbar();

    const url = getActiveRoute();
    const page = routes[url];
  
    if (document.startViewTransition) {
      await document.startViewTransition(async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      });
    } else {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    }

    if (isServiceWorkerAvailable()) {
      this.#setupPushNotification();
    }
  }
}

window.addEventListener('hashchange', () => {
  const route = getActiveRoute();
  if (route === '/logout') {
    clearToken();
    window.location.hash = '/';
  }
});

export default App;
