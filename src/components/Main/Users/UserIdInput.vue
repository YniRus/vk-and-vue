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
@import '~@/styles/variables.scss';

.user-id-input {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: $spacing-sm;

  > input {
    height: $input-height;
    line-height: $input-height;
    border-radius: $border-radius-md;
    border: none;
    font-size: $fs-md;
    padding: 0 $spacing-sm;

    &:focus,
    &:focus-visible {
      border: none;
      outline: none;
    }
  }
}
</style>
