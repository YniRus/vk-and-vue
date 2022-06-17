import { jsonp } from 'vue-jsonp';

export const VK_API = {
  token: process.env.VUE_APP_VK_TOKEN,
  apiVersion: 5.131,
  baseUrl: 'https://api.vk.com/',

  async request(method = '', data = {}) {
    return await jsonp(
      `${this.baseUrl}/method/${method}`,
      {
        access_token: this.token,
        v: this.apiVersion,
        ...data,
      },
    );
  },

  async getUser(userId, fields = ['sex', 'bdate', 'photo_50']) {
    const response = await this.request('users.get', {
      user_ids: userId,
      fields: fields.join(','),
    });

    return {
      error: response?.error?.error_msg,
      user: response?.response?.[0],
    };
  },

  async getUserFriends(userId, fields = ['sex', 'bdate', 'photo_50']) {
    const response = await VK_API.request('friends.get', {
      user_id: userId,
      fields: fields.join(','),
    });

    return {
      error: response?.error?.error_msg,
      friends: response?.response?.items || [],
    };
  },

  async getUserWall(userId, count = 20) {
    const response = await VK_API.request('wall.get', {
      owner_id: userId,
      count: count,
    });

    return {
      error: response?.error?.error_msg,
      items: response?.response?.items || [],
    };
  },
};
