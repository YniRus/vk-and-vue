<template>
  <div class="friends">
    <FriendsList
      :friends="friends"
      @select="onFriendSelect"
    />
  </div>
</template>

<script>
import FriendsList from '@/components/Main/Friends/FriendsList';

export default {
  name: 'Friends',

  components: {
    FriendsList,
  },

  props: {
    friends: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onFriendSelect(friend) {
      this.$emit('select', friend);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.friends {
  padding: $spacing-md;
  box-sizing: border-box;

  overflow: hidden;
}
</style>
