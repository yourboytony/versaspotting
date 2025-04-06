<template>
  <div class="app">
    <nav class="nav">
      <div class="container">
        <h1 class="logo">VERSA</h1>
        <button class="menu-btn" @click="menuOpen = !menuOpen">Menu</button>
        <div class="nav-menu" :class="{ 'is-open': menuOpen }">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </nav>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<style>
:root {
  --dark: #0f172a;
  --gray: #1e293b;
  --blue: #38bdf8;
  --white: #f8fafc;
  --max-width: 1200px;
  --padding: 1rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--dark);
  color: var(--white);
  line-height: 1.5;
}

.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--padding);
}

.nav {
  background: var(--dark);
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.nav .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-menu a {
  color: var(--white);
  text-decoration: none;
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
}

.main {
  padding-top: 4rem;
}

@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--dark);
    padding: 1rem;
    flex-direction: column;
  }

  .nav-menu.is-open {
    display: flex;
  }
}
</style> 