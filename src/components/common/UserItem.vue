<template>
  <div class="user-item" >
    <img
      class="user-item__photo"
      :src="user.photo_50"
    />
    <div class="user-item__info">
      <div class="user-item__name">
        {{ user.first_name }} {{ user.last_name }}
      </div>
      <div class="user-item__extra-info">
        Пол: {{ getHumanizedSex(user.sex) }}
        · Возраст: {{ getAge(user.bdate) }}
        <slot name="extra-info"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserItem',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getHumanizedSex(sex) {
      const map = {
        1: 'Женский',
        2: 'Мужской',
        0: 'пол не указан',
      };

      return map[sex] || '';
    },

    getAge(bdate) {
      let age = null;

      const byear = new Date(bdate).getFullYear();

      if (byear) {
        age = new Date().getFullYear() - byear;
      } else {
        age = 'скрыт';
      }

      return age;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.user-item {
  display: flex;
  align-items: center;
  border-radius: $border-radius-md;
  overflow: hidden;
  min-height: 50px;
  cursor: pointer;
  background-color: $col-white;
  transition: all 0.2s ease-in-out;

  .user-item__info {
    padding-left: $spacing-sm;

    .user-item__name {
      padding-bottom: $spacing-xs;
    }
  }

  &:hover {
    box-shadow: $box-shadow-xs;
  }

  &__extra-info {
    font-size: $fs-sm;
  }
}
</style>
