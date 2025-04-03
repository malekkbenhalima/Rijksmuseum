<template>
  <article class="artwork-tile" ref="tileRef" tabindex="0" @keydown.enter="handleTileActivation">
    <div class="artwork-image">
      <img
        v-if="hasValidImage"
        :src="optimizedImageUrl"
        :alt="artwork.title"
        loading="lazy"
        width="400"
        height="400"
        class="artwork-img"
        decoding="async"
        fetchpriority="auto"
        :srcset="`${optimizedImageUrl} 1x, 
          ${artwork.webImage.url.replace('=s0', '=s800')} 2x`"
      >
      <div v-else class="no-image-container">
        <div class="no-image-placeholder">
          <AppIcon name="no-image" customClass="no-image-icon" aria-hidden="true" />
          <span aria-hidden="false">Image unavailable</span>
        </div>
      </div>
      <div class="artwork-title-overlay">
        <h3 class="artwork-title">{{ artwork.title }}</h3>
      </div>
    </div>
  </article>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue';

export default {
  name: 'ArtworkTile',
  components: {
    AppIcon
  },
  props: {
    artwork: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasValidImage() {
      return this.artwork.webImage && 
             this.artwork.webImage.url && 
             !this.artwork.webImage.url.includes('/Static/Images/Responsive/') &&
             !this.artwork.webImage.url.startsWith('/');
    },
    optimizedImageUrl() {
      if (!this.artwork.webImage || !this.artwork.webImage.url) return '';
      return this.artwork.webImage.url.replace('=s0', '=s400');
    }
  }
}
</script>