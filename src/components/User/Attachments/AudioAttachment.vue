<template>
  <div
    class="audio-attachment"
    :title="getTitle()"
  >
    <a :href="getAudio()" target="_blank">
      <div class="audio-attachment__sign">𝄞</div>
    </a>
  </div>
</template>

<script>
import { VK_API } from '@/services/vkApi';

export default {
  name: 'AudioAttachment',

  props: {
    attachment: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getAudio() {
      return `${VK_API.baseUrl}/audio${this.attachment.audio.owner_id}_${this.attachment.audio.id}`;
    },

    getTitle() {
      return `${this.attachment.audio.artist} - ${this.attachment.audio.title}`;
    },
  },
};
</script>

<style lang="scss">
.audio-attachment {
  a {
    text-decoration: none;
    font-size: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
  }
}
</style>
