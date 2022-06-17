<template>
  <div class="users">
    <UserIdInput
      @submit="onUserIdSubmit"
    />

    <UsersList
      :users="users"
      :selected-users="selectedUsers"
      @check="onUserCheck"
      @remove="onUserRemove"
    />

    <BuildFriendsListButton
      :disabled="!selectedUsers.length"
      @build="onFriendsListBuild"
    />
  </div>
</template>

<script>
import UserIdInput from '@/components/Main/Users/UserIdInput';
import UsersList from '@/components/Main/Users/UsersList';
import BuildFriendsListButton from '@/components/Main/Users/BuildFriendsListButton';

export default {
  name: 'Users',

  components: {
    UserIdInput,
    UsersList,
    BuildFriendsListButton,
  },

  data() {
    return {
      selectedUsers: [],
    };
  },

  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  methods: {
    addToSelectedUsers(userId) {
      this.selectedUsers.push(userId);
    },

    removeFromSelectedUsers(userId) {
      this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
    },

    onUserIdSubmit(userId) {
      this.$emit('add-user', userId);
    },

    onUserRemove(userId) {
      this.$emit('remove-user', userId);
      this.removeFromSelectedUsers(userId);
    },

    onUserCheck(userId) {
      this.selectedUsers.includes(userId)
        ? this.removeFromSelectedUsers(userId)
        : this.addToSelectedUsers(userId);
    },

    onFriendsListBuild() {
      this.$emit('friends-list-build', this.selectedUsers);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.users {
  padding: $spacing-md;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
