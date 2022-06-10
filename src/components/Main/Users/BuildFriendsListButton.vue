<template>
  <Button
    class="build-friends-list-button"
    :disabled="disabled"
    @click="onBuild"
  >
    Построить
  </Button>
</template>

<script>
import Button from '@/components/common/Button';

export default {
  name: 'BuildFriendsListButton',

  components: {
    Button,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onBuild() {
      this.$emit('build');
    },
  },
};
</script>

<style lang="scss">
.build-friends-list-button {
  margin-top: auto;
}
</style>
