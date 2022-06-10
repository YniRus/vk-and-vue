<template>
  <div class="wall-item">
    <div class="wall-item__text">{{ item.text }}</div>

    <div
      v-if="item.attachments && item.attachments.length"
      class="wall-item__attachments"
    >
      <component
        v-for="(attachment, index) of formatAttachments(item.attachments)"
        :key="`${item.id}-attachment-${index}`"
        :is="attachment.component"
        :attachment="attachment.data"
      />
    </div>

    <div class="wall-item__footer">
      <div class="wall-item__views">Просмотров: {{getViews(item)}}</div>
      <div class="wall-item__date">{{getDate(item)}}</div>
    </div>
  </div>
</template>

<script>
import PhotoAttachment from '@/components/User/Attachments/PhotoAttachment';

export default {
  name: 'WallItem',

  components: {
    PhotoAttachment,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      supportedAttachments: {
        'photo': 'PhotoAttachment',
      },
    };
  },

  methods: {
    formatAttachments(attachments) {
      return attachments
        .filter(attachment => Object.keys(this.supportedAttachments).includes(attachment.type))
        .map(attachment => ({
          component: this.supportedAttachments[attachment.type],
          data: attachment,
        }));
    },

    getViews(item) {
      return item.views?.count || 0;
    },

    getDate(item) {
      return item.date ? new Date(item.date * 1000).toLocaleString() : 'Без даты';
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.wall-item {
  background-color: white;
  box-shadow: $box-shadow-xs;
  border-radius: $border-radius-sm;
  padding: $spacing-sm;
  display: flex;
  flex-direction: column;
  height: fit-content;

  &__footer {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__attachments {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
