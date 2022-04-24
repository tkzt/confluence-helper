<template>
  <router-view />
</template>

<script>
export default {

};
</script>

  <style>

  </style>
<style>
@import url('./assets/font.css');

#app {
  font-family: Youshebiaotihei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 15px;
}

button {
    font-family: Youshebiaotihei;
    background-color: #336dab;
    border: none;
    color: white;
    padding: 8px 12px;
    text-align: center;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    margin: 12px;
}

button:hover {
    opacity: 0.87;
}

button.disabled{
  background-color: #336dab44;
  pointer-events: none;
}

body {
  margin: 0;
}
</style>
