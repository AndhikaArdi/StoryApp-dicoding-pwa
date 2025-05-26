import { openDB } from 'idb';

const DB_NAME = 'storyapp-db';
const STORE_NAME = 'saved-stories';
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

export const SaveIdb = {
  async getAllStories() {
    return (await dbPromise).getAll(STORE_NAME);
  },

  async saveStory(story) {
    return (await dbPromise).put(STORE_NAME, story);
  },

  async getStory(id) {
    return (await dbPromise).get(STORE_NAME, id);
  },

  async deleteStory(id) {
    return (await dbPromise).delete(STORE_NAME, id);
  },
};
