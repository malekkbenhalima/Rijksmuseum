<template>
  <header class="header" :class="{ 'header--hidden': isHeaderHidden }" role="banner">
    <div class="container">
      <router-link to="/" class="logo" aria-label="Rijksmuseum Gallery, go to home page">
        <AppIcon name="logo" customClass="logo-icon" aria-hidden="true" />
        <span class="logo-text">Rijksmuseum</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue';

export default {
  name: 'AppHeader',
  components: {
    AppIcon
  },
  data() {
    return {
      isHeaderHidden: false,
      lastScrollY: 0,
      scrollThreshold: 10,
      artworkGridOffset: 0
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.$nextTick(() => {
      this.calculateArtworkGridPosition();
    });
    window.addEventListener('resize', this.calculateArtworkGridPosition);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.calculateArtworkGridPosition);
  },
  methods: {
    calculateArtworkGridPosition() {
      const artworkGrid = document.querySelector('.artwork-grid');
      if (artworkGrid) {
        // Calculate the exact point where the tiles grid begins
        this.artworkGridOffset = artworkGrid.offsetTop - (this.getHeaderHeight());
      }
    },
    getHeaderHeight() {
      return this.$el ? this.$el.offsetHeight : 80;
    },
    handleScroll() {
      const currentScrollY = window.scrollY;
      
      if (this.artworkGridOffset === 0) {
        this.calculateArtworkGridPosition();
      }
      
      if (currentScrollY < this.artworkGridOffset - 10) {
        this.isHeaderHidden = false;
      } 
      else {
        if (Math.abs(currentScrollY - this.lastScrollY) > this.scrollThreshold) {
          this.isHeaderHidden = currentScrollY > this.lastScrollY;
          this.lastScrollY = currentScrollY;
        }
      }
    }
  }
}
</script>