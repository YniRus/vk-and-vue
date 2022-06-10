<template>
  <div class="main fill">
    <div class="main-block fill">
      <Users
        class="main-block__content fill"
        :users="users.list"
        @add-user="addUser"
        @remove-user="removeUser"
        @friends-list-build="buildFriendsList"
      />
    </div>
    <div class="main-block fill">
      <Friends
        class="main-block__content fill"
        :friends="friends.list"
        @select="goToFriendPage"
      />
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/services/http';

import Users from '@/components/Main/Users/Users';
import Friends from '@/components/Main/Friends/Friends';

export default {
  name: 'Main',

  components: {
    Users,
    Friends,
  },

  data() {
    return {
      users: {
        list: [],
        ids: [],
      },

      friends: {
        list: [],
        ids: [],
      },
    };
  },

  methods: {
    onError(error) {
      alert(error);
    },

    applyUser(user) {
      if (user) {
        if (!this.users.ids.includes(user.id)) {
          this.users.list.push(user);
          this.users.ids.push(user.id);
        }
      }
    },

    removeUser(userId) {
      this.users.list = this.users.list.filter(user => user.id !== userId);
      this.users.ids = this.users.ids.filter(id => id !== userId);
    },

    applyFriends(friends, userId) {
      for (const friend of friends) {
        if (this.friends.ids.includes(friend.id)) {
          const foundFriend = this.friends.list.find(f => f.id === friend.id);
          foundFriend.friends.push(userId);
        } else {
          this.friends.list.push({ ...friend, friends: [userId] });
          this.friends.ids.push(friend.id);
        }
      }
    },

    goToFriendPage(friend) {
      this.$router.push({
        name: 'User',
        params: {
          user: {
            ...friend,
            friends: this.getUsersInfo(friend.friends),
          },
        },
      });
    },

    getUsersInfo(usersIds) {
      return usersIds
        .map(userId => this.users.list.find(user => user.id === userId))
        .filter(Boolean);
    },

    async buildFriendsList(usersIds) {
      this.friends.list = [];
      this.friends.ids = [];

      for (const userId of usersIds) {
        const response = await HTTP.vk('friends.get', {
          user_id: userId,
          fields: ['sex', 'bdate', 'photo_50'].join(','),
        });

        response?.error && this.onError(response?.error?.error_msg);
        response?.response && this.applyFriends(response?.response?.items, userId);
      }
    },

    async addUser(userId) {
      const response = await HTTP.vk('users.get', {
        user_ids: userId,
        fields: ['sex', 'bdate', 'photo_50'].join(','),
      });

      response?.error && this.onError(response?.error?.error_msg);
      response?.response && this.applyUser(response?.response?.[0]);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.main {
  display: flex;
  flex-direction: row;
  align-items: stretch;

  .main-block {
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
    }
  }
}
</style>
