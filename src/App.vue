<template>
  <div id="app">
    <keep-alive include="Main">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
@import '~@/styles/variables.scss';
@import '~@/styles/base.scss';

#app {
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
