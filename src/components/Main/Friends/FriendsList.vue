<template>
  <div class="friends-list">
    <FriendItem
      v-for="(friend, index) of sortedFriends"
      :key="`friend-${index}`"
      :friend="friend"
      @click.native="onFriendSelect(friend)"
    />
  </div>
</template>

<script>
import { UTILS } from '@/services/utils';

import FriendItem from '@/components/common/FriendItem';

export default {
  name: 'FriendsList',

  components: {
    FriendItem,
  },

  props: {
    friends: {
      type: Array,
      required: true,
    },
  },

  computed: {
    sortedFriends() {
      return UTILS.sortUsersByName(this.friends);
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

.friends-list {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: $spacing-sm;
  flex-direction: column;
  overflow: auto;

  @media (max-width: 1520px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
}
</style>
