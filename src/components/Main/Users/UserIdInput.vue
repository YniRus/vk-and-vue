<template>
  <div class="user-id-input">
    <input
      :value="userId"
      @input="onInput"
      @keydown.enter="onSubmit"
    >
    <Button
      @click="onSubmit"
      :disabled="!userId"
    >
      Добавить
    </Button>
  </div>
</template>

<script>
import Button from '@/components/common/Button';

export default {
  name: 'UserIdInput',

  components: {
    Button,
  },

  data() {
    return {
      userId: '',
    };
  },

  methods: {
    onInput(event) {
      this.userId = String(event.target.value);
    },

    onSubmit() {
      this.$emit('submit', this.userId);
      this.userId = '';
    },
  },
};
</script>

<style lang="scss">
$input-height: 32px;

.user-id-input {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 6px;

  > input {
    height: $input-height;
    line-height: $input-height;
    border-radius: 6px;
    border: none;
    font-size: 14px;
    padding: 0 6px;

    &:focus, &:focus-visible {
      border: none;
      outline: none;
    }
  }

  > button {
    color: white;
    border-radius: 6px;
    border: none;
    background-color: #08adcd;
    font-size: 14px;
    cursor: pointer;
  }

}
</style>
