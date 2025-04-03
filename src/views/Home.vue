<template>
  <div class="home">
    <div class="container">
      <div aria-live="polite" aria-atomic="true" class="visually-hidden">
        {{ searchStatusMessage }}
      </div>
      
      <SearchBar 
        :search-query="searchQuery"
        :loading="searchLoading"
        @search="onSearch"
        @clear="onClearSearch"
      />
      
      <ArtworkGrid 
        :artworks="artworks" 
        :loading="loading"
        :key="searchKey"
      />
      
      <LoadMoreButton
        :visible="artworks.length > 0 && hasMoreArtworks"
        :loading="loading"
        @load-more="loadMore"
      />
    </div>
  </div>
</template>

<script>
import ArtworkGrid from '@/components/ArtworkGrid.vue';
import SearchBar from '@/components/SearchBar.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import { fetchArtworks, filterArtworksByQuery } from '@/utils/rijksmuseumApi';

export default {
  name: 'HomePage',
  components: {
    ArtworkGrid,
    SearchBar,
    LoadMoreButton
  },
  data() {
    return {
      artworks: [],
      searchQuery: '',
      lastSearchQuery: '',
      loading: false,
      searchLoading: false,
      page: 1,
      limit: 20,
      totalItems: 0,
      searchKey: 0,
      lastPageResultCount: 0
    };
  },
  computed: {
    hasMoreArtworks() {
      return this.artworks.length < this.totalItems && 
             (!this.lastPageResultCount || this.lastPageResultCount === this.limit);
    },
    searchStatusMessage() {
      if (this.searchLoading) {
        return `Searching for ${this.searchQuery || 'all artworks'}`;
      } else if (this.loading && this.page > 1) {
        return 'Loading more artworks';
      } else if (this.artworks.length > 0) {
        return `Found ${this.totalItems} artworks${this.lastSearchQuery ? ' for ' + this.lastSearchQuery : ''}`;
      } else if (this.artworks.length === 0 && !this.loading) {
        return 'No artworks found';
      }
      return '';
    }
  },
  mounted() {
    this.fetchArtworks();
    document.title = 'Rijksmuseum Gallery | Explore Art Collection';
  },
  methods: {
    async fetchArtworks() {
      try {
        this.loading = true;
        
        const { artworks, count } = await fetchArtworks({
          page: this.page,
          limit: this.limit,
          query: this.lastSearchQuery
        });
        
        // Filter results to match search query more precisely
        const filteredArtworks = filterArtworksByQuery(artworks, this.lastSearchQuery);
        
        // Store count of filtered results for this page
        this.lastPageResultCount = filteredArtworks.length;
        
        if (this.page === 1) {
          this.artworks = filteredArtworks;
          this.searchKey++; // Increment search key for ArtworkGrid re-render
        } else {
          this.artworks = [...this.artworks, ...filteredArtworks];
        }
        
        // Update totalItems if we're filtering results
        if (this.lastSearchQuery && this.lastSearchQuery.trim() !== '') {
          if (filteredArtworks.length < artworks.length) {
            // We're filtering results
            if (filteredArtworks.length === 0 && this.page > 1) {
              // No more results match filter - don't add padding
              this.totalItems = this.artworks.length;
            } else if (filteredArtworks.length < this.limit) {
              // Got fewer results than limit - probably no more to load
              this.totalItems = this.artworks.length;
            } else {
              // Got a full page - there might be more
              this.totalItems = this.artworks.length + 10;
            }
          } else {
            // No filtering happened this time
            this.totalItems = count;
          }
        } else {
          this.totalItems = count;
        }

        // Update page title based on search
        if (this.lastSearchQuery) {
          document.title = `${this.lastSearchQuery} - Rijksmuseum Gallery`;
        } else {
          document.title = 'Rijksmuseum Gallery | Explore Art Collection';
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        this.loading = false;
      }
    },
    onSearch(query) {
      // Skip the search if the query hasn't changed and we're not on the first load
      if (this.lastSearchQuery === query && this.artworks.length > 0) {
        return;
      }
      
      this.searchQuery = query;
      // Reset pagination and update last search query
      this.page = 1;
      this.lastSearchQuery = query;
      this.searchLoading = true;
      this.fetchArtworks().finally(() => {
        this.searchLoading = false;
      });
    },
    loadMore() {
      this.page += 1;
      this.fetchArtworks();
    },
    onClearSearch() {
      // Only reset and fetch if there was an actual search query before
      const hadPreviousSearch = this.lastSearchQuery !== '';
      
      this.searchQuery = '';
      this.lastSearchQuery = '';
      this.page = 1;
      
      // Only fetch artworks if there was a previous search query
      if (hadPreviousSearch) {
        this.searchLoading = true;
        this.fetchArtworks().finally(() => {
          this.searchLoading = false;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 40px;
  padding-bottom: 40px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style> 