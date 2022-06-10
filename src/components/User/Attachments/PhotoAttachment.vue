<template>
  <div class="photo-attachment">
    <a :href="getPhoto(true)" target="_blank">
      <img :src="getPhoto()">
    </a>
  </div>
</template>

<script>
export default {
  name: 'PhotoAttachment',

  props: {
    attachment: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getPhoto(last = false) {
      return last
        ? this.attachment.photo.sizes[this.attachment.photo.sizes.length - 1].url || ''
        : this.attachment.photo.sizes[0].url || '';
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.wall {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: $spacing-sm;
}
</style>
