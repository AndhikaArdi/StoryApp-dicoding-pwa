import { SaveIdb } from '../../data/save-idb.js';

const SaveModel = {
  async getAllSavedStories() {
    return SaveIdb.getAllStories();
  },

  async saveStory(story) {
    return SaveIdb.saveStory(story);
  },

  async deleteSavedStory(id) {
    return SaveIdb.deleteStory(id);
  },
};

export default SaveModel;
