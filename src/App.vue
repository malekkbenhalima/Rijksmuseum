<template>
  <div id="app-container">
    <div class="skip-link-container">
      <a href="#main-content" class="skip-link">Skip to main content</a>
    </div>
    <AppHeader />
    <main class="main" id="main-content" role="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  margin-top: 80px;
  flex: 1;
  padding: 20px 0;
  
  @media (max-width: 768px) {
    margin-top: 70px;
  }
}

.skip-link-container {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}

.skip-link {
  background: var(--primary-color);
  color: white;
  padding: 10px 15px;
  border-radius: 0 0 4px 4px;
  position: absolute;
  left: 0;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
  font-weight: 500;
  text-decoration: none;

  &:focus {
    transform: translateY(0);
    outline: 3px solid var(--accent-color);
    outline-offset: -1px;
  }
}
</style> 