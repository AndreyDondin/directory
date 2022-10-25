<template>
  <router-view />
  <div id="teleport" />
</template>

<style lang="scss">
#app {
  margin: 0 auto;
  padding: 20px;
  min-width: 320px;
  max-width: 1320px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

button {
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 0.7;
  }
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
