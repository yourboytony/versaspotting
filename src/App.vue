<template>
  <router-view />
</template>

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

/* Navigation */
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

/* Buttons */
.button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
}

.button:hover {
  opacity: 0.9;
}

.primary {
  background: var(--blue);
  color: var(--dark);
}

.button:not(.primary) {
  background: transparent;
  color: var(--white);
  border: 1px solid var(--white);
}

/* Mobile Styles */
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

  .buttons {
    flex-direction: column;
  }

  .button {
    width: 100%;
    text-align: center;
  }
}
</style> 