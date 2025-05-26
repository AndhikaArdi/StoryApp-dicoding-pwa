import { getStories } from '../../data/api';
import { getToken } from '../../data/auth-token';

const HomeModel = {
  async fetchStories() {
    return getStories(getToken());
  }
};

export default HomeModel;
