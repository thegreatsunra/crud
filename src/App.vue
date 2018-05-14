<template>
  <div id="app">
    <ul class="_nav">
      <li class="_nav__item"><router-link class="_nav__link" to="/">Users</router-link></li>
      <li class="_nav__item"><router-link  class="_nav__link" to="/admin">Admin</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import './styles/app';
</style>
