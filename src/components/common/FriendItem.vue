<template>
  <UserItem
    :user="friend"
    class="friend-item"
    :style="`--friends: ${ friend.friends.length }`"
  >
    <template #extra-info>
      · Друзей: {{ friend.friends.length }}
    </template>
  </UserItem>
</template>

<script>
import UserItem from '@/components/common/UserItem';

export default {
  name: 'FriendItem',

  components: {
    UserItem,
  },

  props: {
    friend: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.friend-item {
  background-color: rgba(8, 173, 205, calc((var(--friends)) * 10 / 100));
}
</style>
