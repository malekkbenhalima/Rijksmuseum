<template>
  <div class="load-more-container" v-if="visible">
    <button 
      class="btn btn--load-more" 
      @click="loadMore" 
      :disabled="loading"
      :aria-label="loading ? 'Loading more artworks' : 'Load more artworks'"
      :aria-busy="loading"
    >
      <span v-if="!loading" class="load-more-content">
        <AppIcon name="chevron-down" customClass="icon-more" aria-hidden="true" />
        <span>Load more</span>
      </span>
      <span v-else aria-hidden="true">
        <LoadingSpinner />
      </span>
    </button>
  </div>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'LoadMoreButton',
  components: {
    AppIcon,
    LoadingSpinner
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['load-more'],
  methods: {
    loadMore() {
      this.$emit('load-more');
    }
  }
}
</script> 