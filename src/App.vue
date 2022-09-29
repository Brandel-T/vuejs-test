<template>
  <nav>
    <router-link :to="{ name: 'posts' }"
      ><span class="link">posts</span></router-link
    >
    <router-link :to="{ name: 'edit' }"
      ><span class="link">edit post</span></router-link
    >
  </nav>
  <router-view />
</template>

<style>
body {
  height: 100vh;
  width: 100vw;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #061524;
  width: 100vw;
  height: 100vh;
}
nav {
  width: 100vw;
  height: 2.4em;
  display: flex;
  gap: 2em;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  background-color: #166feba4;
}
.link {
  flex: 1;
  height: 100%;
  color: #061524;
}
.link:hover {
  color: #166feba4;
}
</style>
