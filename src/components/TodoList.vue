<template>
  <transition-group tag="ul" class="taskList" name="flip">
    <li
      v-for="item in $props.todoList"
      :key="item.id"
      class="item"
      @click="$emit('check', item.id)"
    >
      <input type="checkbox" :checked="item.isDone" />
      <span class="item__text">{{ item.text }}</span>
      <button @click="onDeleteTodo($event, item.id)">削除</button>
    </li>
  </transition-group>
</template>

<script>
export default {
  props: {
    todoList: {
      id: Number,
      isDone: Boolean,
      text: String,
    },
  },
  methods: {
    /**
     * 削除ボタンをクリックした時
     * @param {event} event
     * @param {number} todoId
     */
    onDeleteTodo(event, todoId) {
      event.stopPropagation();
      this.$emit('delete', todoId);
    },
  },
};
</script>

<style lang="scss" scoped>
.taskList {
  margin: 40px 0 0;
  padding: 0;
  text-align: left;

  & > li {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0;

    & + li {
      margin-top: 24px;
    }

    & > input {
      margin-right: 10px;
      border: 0;
    }

    & > button {
      position: absolute;
      color: #af1616;
      background-color: #ffebeb;
      border: 0;
      border-radius: 4px;
      top: 50%;
      right: 0;
      width: 100px;
      margin-top: -12px;
      padding: 2px 12px 2px 28px;
      transition: 0.3s;

      &::after,
      &::before {
        position: absolute;
        content: '';
        display: inline-block;
        top: 50%;
        left: 12px;
        width: 12px;
        height: 2px;
        margin-top: -1px;
        background-color: #af1616;
      }

      &::after {
        transform: rotate(45deg);
      }

      &::before {
        transform: rotate(-45deg);
      }

      &:hover,
      &:active {
        color: #ffffff;
        background-color: #af1616;

        &::after,
        &::before {
          background-color: #ffffff;
        }
      }
    }
  }
}
</style>
