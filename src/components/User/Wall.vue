<template>
  <div class="wall">
    <WallItem
      v-for="(item, index) of items"
      :item="item"
      :key="`wall-item-${index}`"
    />
  </div>
</template>

<script>
import WallItem from '@/components/User/WallItem';

export default {
  name: 'Wall',

  components: {
    WallItem,
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.wall {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: $spacing-sm;
  overflow: auto;
}
</style>
