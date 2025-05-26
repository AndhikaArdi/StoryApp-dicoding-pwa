import { postStory } from '../../data/api';
import { getToken } from '../../data/auth-token';

const AddModel = {
  async submitStory(formData) {
    return postStory(formData, getToken());
  }
};

export default AddModel;
