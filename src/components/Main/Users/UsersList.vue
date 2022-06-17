<template>
  <div class="users-list">
    <template v-for="(user, index) of sortedUsers">
      <UserItem
        :key="`user-item-${index}`"
        :user="user"
        :class="{
          'user-item_selected': selectedUsers.includes(user.id),
        }"
        @click.native="onUserCheck(user.id)"
      >
      </UserItem>

      <Button
        :key="`user-item-remove-${index}`"
        class="user-item__remove"
        @click="onRemove(user.id)"
      >
        &times;
      </Button>
    </template>
  </div>
</template>

<script>
import { UTILS } from '@/services/utils';

import UserItem from '@/components/common/UserItem';
import Button from '@/components/common/Button';

export default {
  name: 'UsersList',

  components: {
    Button,
    UserItem,
  },

  props: {
    users: {
      type: Array,
      required: true,
    },

    selectedUsers: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    sortedUsers() {
      return UTILS.sortUsersByName(this.users);
    },
  },

  methods: {
    onUserCheck(userId) {
      this.$emit('check', userId);
    },

    onRemove(userId) {
      this.$emit('remove', userId);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.users-list {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: $spacing-sm;
  margin: $spacing-md 0;
  overflow: auto;

  .user-item_selected {
    background-color: $col-secondary;
  }

  .user-item__remove {
    margin-left: auto;
    margin-right: $spacing-md;
    background-color: $col-danger;
    font-size: $fs-xl;
    height: 100%;
    min-width: 50px;
  }
}
</style>
