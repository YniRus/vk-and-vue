<template>
  <div class="video-attachment">
    <a :href="getVideo()" target="_blank">
      <img :src="getVideoPreview()">
    </a>
  </div>
</template>

<script>
import { VK_API } from '@/services/vkApi';

export default {
  name: 'VideoAttachment',

  props: {
    attachment: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getVideo() {
      return `${VK_API.baseUrl}/video${this.attachment.video.owner_id}_${this.attachment.video.id}`;
    },

    getVideoPreview() {
      return this.attachment.video.image[0].url || '';
    },
  },
};
</script>
