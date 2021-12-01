<template>
  <Header />
  <main>
    <div class="inner">
      <InputForm @onsubmit="addTask_socketio"></InputForm>
      <p>{{ $data.task }}</p>
    </div>
    <div class="inner">
      <TodoList
        :todoList="$data.todoList"
        @check="onCheckTodo"
        @delete="onDeleteTodo"
      />
    </div>
  </main>
  <Footer />
</template>

<script>
import InputForm from './components/InputForm.vue';
import TodoList from './components/TodoList.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import io from 'socket.io-client';
import _ from 'lodash';

export default {
  name: 'App',
  components: {
    InputForm,
    TodoList,
    Header,
    Footer,
  },
  data() {
    const todoList = [
      // {
      //   isDone: false,
      //   text: '薬',
      // },
      // {
      //   isDone: true,
      //   text: 'メモ',
      // },
    ];
    return {
      socket: io(process.env.VUE_APP_PORT),
      //socket: io('/'),
      task: '',
      todoList: todoList.map((item, index) => ({ ...item, id: index })),
      nextTodoId: todoList.length,
    };
  },
  methods: {
    /**
     * TODO追加
     */
    onSubmit_socketio(e) {
      e.preventDefault();
      this.socket.emit('send', this.$data.text);
    },
    addTask_socketio(text) {
      this.socket.emit('addtask', text);
    },
    /**
     * TODOのチェック
     * @param {number} todoId - TODOのID
     */
    onCheckTodo(todoId) {
      const todo = _.find(this.$data.todoList, { id: todoId });
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    /**
     * TODO削除
     * @param {number} todoId - TODOのID
     */
    onDeleteTodo(todoId) {
      const index = this.todoList.findIndex(({ id }) => id === todoId);
      if (index !== -1) {
        this.$data.todoList.splice(index, 1);
      }
    },
  },
  created() {
    this.socket.on('connect', () => {
      //console.log('connected!');
    });

    /**
     * 送信時
     * @param {string} TODOTASK
     */
    this.socket.on('addtask', (task) => {
      console.log(task);
      this.$data.todoList.unshift({
        id: this.$data.nextTodoId,
        isDone: false,
        text: task,
      });
      this.$data.nextTodoId += 1;
    });
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  outline: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
}
body {
  margin: 0;
}
main {
  display: block;
  min-height: calc(100vh - 200px);
}
.inner {
  max-width: 640px;
  margin: 0 auto;
}
</style>
