<template>
  <button
    class="button"
    :class="{ 'disabled': disabled }"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.button {
  color: $col-white;
  border-radius: $border-radius-md;
  height: $input-height;
  border: none;
  background-color: $col-primary;
  font-size: $fs-md;
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    background-color: mix($col-primary, $col-white, 50%);
  }
}
</style>
