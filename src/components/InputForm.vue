<template>
  <form @submit="componentSubmit" class="taskForm">
    <input
      v-model="$data.task"
      type="text"
      placeholder="タスクを入力してください"
    />
    <button type="submit" :disabled="$data.task === ''">追加</button>
  </form>
</template>

<script>
export default {
  name: 'MyComponent',
  data() {
    return {
      task: '',
    };
  },
  methods: {
    componentSubmit(event) {
      event.preventDefault();
      this.$emit('onsubmit', this.$data.task);
      this.$data.task = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.taskForm {
  display: flex;
  justify-content: space-between;

  input {
    width: calc(100% - 120px);
    border: 1px solid #9d9d9d;
    border-radius: 4px;
    padding: 8px 16px;

    & + button {
      background-color: #2c61e8;
      color: #ffffff;
      width: 120px;
      margin-left: 10px;
      border: 0;
    }
  }
}
</style>
