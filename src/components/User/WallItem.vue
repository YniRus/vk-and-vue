<template>
  <div class="wall-item">
    <div
      v-if="item.text"
      class="wall-item__text"
    >
      {{ item.text }}
    </div>

    <div
      v-if="attachments && attachments.length"
      class="wall-item__attachments"
    >
      <component
        v-for="(attachment, index) of formatAttachments(attachments)"
        :key="`${item.id}-attachment-${index}`"
        :is="attachment.component"
        class="wall-item__attachment"
        :attachment="attachment.data"
      />
    </div>

    <div class="wall-item__footer">
      <div class="wall-item__counters">
        <div class="wall-item__views">Просмотров: {{ getViews(item) }}</div>
        <div class="wall-item__likes">Лайков: {{ getLikes(item) }}</div>
      </div>
      <div class="wall-item__date">{{ getDate(item) }}</div>
    </div>
  </div>
</template>

<script>
import PhotoAttachment from '@/components/User/Attachments/PhotoAttachment';
import VideoAttachment from '@/components/User/Attachments/VideoAttachment';
import AudioAttachment from '@/components/User/Attachments/AudioAttachment';

export default {
  name: 'WallItem',

  components: {
    PhotoAttachment,
    VideoAttachment,
    AudioAttachment,
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
        'video': 'VideoAttachment',
        'audio': 'AudioAttachment',
      },
    };
  },

  computed: {
    attachments() {
      return [
        ...this.getRootAttachments(this.item),
        ...this.getHistoryAttachments(this.item),
      ];
    },
  },

  methods: {
    getRootAttachments(item) {
      return (item.attachments || []);
    },

    getHistoryAttachments(item) {
      return (item.copy_history || []).reduce((attachments, item) => {
        return [...attachments, ...(item.attachments || [])];
      }, []);
    },

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

    getLikes(item) {
      return item.likes?.count || 0;
    },

    getDate(item) {
      return item.date ? new Date(item.date * 1000).toLocaleString() : 'Без даты';
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

$attachment-preview-size: 100px;

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

  &__attachments,
  &__counters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__attachments,
  &__text {
    margin-bottom: $spacing-sm;
  }

  &__attachment {
    height: $attachment-preview-size;
    width: $attachment-preview-size;
    overflow: hidden;
    border-radius: $border-radius-md;
    box-shadow: $box-shadow-sm;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:not(:last-child) {
      margin-right: $spacing-md;
    }
  }

  &__counters {
    > *:not(:last-child) {
      margin-right: $spacing-md;
    }
  }
}
</style>
