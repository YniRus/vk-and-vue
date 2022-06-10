<template>
  <div
    v-if="user"
    class="user fill"
  >
    <div class="user-block fill">
      <div class="user-block__content user-and-friends-info fill">
        <FriendItem :friend="user"/>

        <h3>Друзья</h3>
        <div class="user__friends-list">
          <UserItem
            v-for="(friend, index) in user.friends"
            :key="`friend-item-${index}`"
            :user="friend"
          />
        </div>

        <Button @click="navigate('Main')">На главную</Button>
      </div>
    </div>
    <div class="user-block fill">
      <Wall
        class="user-block__content fill"
        :items="wall"
      />
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/services/http';

import FriendItem from '@/components/common/FriendItem';
import Button from '@/components/common/Button';
import UserItem from '@/components/common/UserItem';
import Wall from '@/components/User/Wall';

export default {
  name: 'User',

  components: {
    Wall,
    UserItem,
    Button,
    FriendItem,
  },

  props: {
    user: {
      type: Object,
    },
  },

  data() {
    return {
      wall: [],
    };
  },

  created() {
    this.user ? this.getUserWall() : this.navigate('Main');
  },

  methods: {
    navigate(route) {
      this.$router.push({ name: route });
    },

    setWall(items) {
      this.wall = items;
    },

    async getUserWall() {
      const response = await HTTP.vk('wall.get', {
        owner_id: this.user.id,
        count: 20,
      });

      response?.error && this.onError(response?.error?.error_msg);
      response?.response && this.setWall(response?.response?.items);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.user {
  display: flex;
  flex-direction: row;
  align-items: stretch;

  .user-block {
    padding: $spacing-md;
    box-sizing: border-box;

    &:not(:last-child) {
      padding-right: 0;
    }

    &:first-child {
      flex-shrink: 2;
    }

    &:last-child {
      flex-shrink: 1;
    }

    &__content {
      background-color: $col-bg;
      box-shadow: $box-shadow-xs;
      border-radius: $border-radius-md;
      padding: $spacing-md;
      box-sizing: border-box;
    }

    .user-and-friends-info {
      display: flex;
      flex-direction: column;

      > button {
        margin-top: auto;
        width: 100%;
      }
    }

    .user__friends-list {
      overflow: auto;
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: $spacing-sm;
    }
  }
}
</style>
