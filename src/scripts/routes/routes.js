import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import AddPage from '../pages/add/add-page';
import LoginPage from '../pages/login/login-page';
import RegisterPage from '../pages/register/register-page';
import SavePage from '../pages/save/save-page';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/add': new AddPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/save': new SavePage(),
};

export default routes;