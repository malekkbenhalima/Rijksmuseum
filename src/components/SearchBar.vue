<template>
  <div class="search-container" role="search">
    <div class="search-input-wrapper">
      <AppIcon name="search" customClass="icon-search" aria-hidden="true" />
      <label for="search-input" class="visually-hidden">Search the collection</label>
      <input 
        id="search-input"
        type="text" 
        class="input search-input" 
        placeholder="Search the collection..." 
        v-model="searchQueryValue"
        @keyup.enter="searchArtworks"
        aria-label="Search the collection"
      />
      <button 
        v-if="searchQueryValue" 
        class="clear-button" 
        @click="clearSearch"
        title="Clear search"
        aria-label="Clear search"
      >
        <AppIcon name="clear" customClass="icon-clear" aria-hidden="true" />
      </button>
    </div>
    <button 
      class="btn btn--search" 
      @click="searchArtworks" 
      :disabled="loading"
      aria-label="Search the collection"
    >
      <span v-if="!loading" class="search-btn-content">
        <span>Search</span>
        <AppIcon name="arrow-right" customClass="icon-arrow" aria-hidden="true" />
      </span>
      <span v-else class="spinner-container">
        <LoadingSpinner light />
      </span>
    </button>
  </div>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'SearchBar',
  components: {
    AppIcon,
    LoadingSpinner
  },
  props: {
    searchQuery: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['search', 'clear'],
  data() {
    return {
      searchQueryValue: this.searchQuery
    };
  },
  watch: {
    searchQuery(newVal) {
      this.searchQueryValue = newVal;
    }
  },
  methods: {
    searchArtworks() {
      this.$emit('search', this.searchQueryValue);
    },
    clearSearch() {
      this.searchQueryValue = '';
      this.$emit('clear');
    }
  }
}
</script> 