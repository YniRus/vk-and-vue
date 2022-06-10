import { jsonp } from 'vue-jsonp';

export const HTTP = {
  token: process.env.VUE_APP_VK_TOKEN,
  apiVersion: 5.131,

  async vk(method = '', data = {}) {
    return await jsonp(
      `https://api.vk.com/method/${method}`,
      {
        access_token: this.token,
        v: this.apiVersion,
        ...data,
      },
    );
  },
};
