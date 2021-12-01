<template>
  <header>
    <div class="inner">
      <h1>Todolist</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #d4eaff;
  height: 80px;
  margin-bottom: 20px;
  padding: 20px 6px;
  box-shadow: 0 2px 4px 0 #bbcad8;

  .inner {
    width: 100%;
  }

  h1 {
    font-size: 26px;
    padding-left: 12px;
  }
}
</style>
