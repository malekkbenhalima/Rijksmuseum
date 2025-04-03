<template>
  <div class="artwork-grid" ref="artworkGridRef">
    <h2 class="visually-hidden">Artwork Collection</h2>
    <div v-if="loading && !artworks.length" class="loading" aria-live="polite">
      <p class="visually-hidden">Loading artworks, please wait...</p>
      <div class="grid">
        <SkeletonTile v-for="n in skeletonCount" :key="n" />
      </div>
    </div>
    <div v-else-if="!artworks.length" class="no-results" aria-live="polite">
      <p>No artworks found. Try a different search.</p>
    </div>
    
    <div v-else>
      <ul class="grid" role="list">
        <li v-for="artwork in artworks" :key="artwork.id">
          <ArtworkTile 
            :artwork="artwork"
            ref="artworkTiles"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArtworkTile from '@/components/ArtworkTile.vue';
import SkeletonTile from '@/components/SkeletonTile.vue';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'ArtworkGrid',
  components: {
    ArtworkTile,
    SkeletonTile
  },
  props: {
    artworks: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['animationsComplete'],
  data() {
    return {
      observer: null,
      animationsInitialized: false,
      lastArtworkIds: [],
      animationsRunning: false
    };
  },
  computed: {
    skeletonCount() {
      // Always show 20 skeletons to match the default API limit
      const width = window.innerWidth;
      if (width <= 480) return 20;
      if (width <= 768) return 20;
      if (width <= 992) return 20;
      if (width <= 1200) return 20;
      return 20;
    },
    // Computed property to detect real artwork data changes
    artworkIdsChanged() {
      const currentIds = this.artworks.map(artwork => artwork.id);
      const changed = JSON.stringify(currentIds) !== JSON.stringify(this.lastArtworkIds);
      return changed;
    }
  },
  mounted() {
    this.initAnimations();
    
    // Reinitialize animations when artworks change
    this.$watch('artworks', (newArtworks, oldArtworks) => {
      this.$nextTick(() => {
        // Only proceed if artworks have loaded and animations aren't already running
        if (this.artworks.length && !this.loading && !this.animationsRunning) {
          const currentIds = newArtworks.map(artwork => artwork.id);
          
          // Skip animation if artwork IDs haven't changed (same data)
          if (!this.artworkIdsChanged) {
            return;
          }
          
          this.lastArtworkIds = currentIds;
          
          // Check if this is a "load more" scenario (artworks added to existing ones)
          if (oldArtworks && oldArtworks.length < newArtworks.length) {
            this.animateNewItems(oldArtworks.length);
          } else {
            // Complete refresh or initial load
            this.initAnimations();
          }
        }
      });
    });
  },
  methods: {
    // Helper to get all tile elements for animation
    getTileElements() {
      if (!this.$refs.artworkTiles) return [];
      return this.$refs.artworkTiles.map(component => component.$el);
    },
    
    initAnimations() {
      this.$nextTick(() => {
        this.animationsRunning = true;
        
        // Clear any existing ScrollTrigger instances to prevent memory leaks
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        const tileElements = this.getTileElements();
        
        if (tileElements.length) {
          // Reset any previous animations
          gsap.set(tileElements, { clearProps: 'all' });
          
          // Stagger artwork tiles entrance animation
          gsap.fromTo(tileElements, 
            { 
              y: 50, 
              opacity: 0,
              scale: 0.95
            },
            { 
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              onComplete: () => {
                this.animationsRunning = false;
                
                this.$emit('animationsComplete');
                
                setTimeout(() => {
                  this.setupScrollAnimations();
                }, 600);
              }
            }
          );
        } else {
          this.animationsRunning = false;
        }
      });
    },
    animateNewItems(startIndex) {
      this.$nextTick(() => {
        const tileElements = this.getTileElements();
        
        if (!tileElements.length || tileElements.length <= startIndex) {
          this.animationsRunning = false;
          return;
        }
        
        this.animationsRunning = true;
        
        // Get only the new tiles (elements from startIndex onward)
        const newTileElements = tileElements.slice(startIndex);
        
        if (newTileElements.length === 0) {
          this.animationsRunning = false;
          return;
        }
        
        // Set initial state for new tiles only
        gsap.set(newTileElements, { 
          y: 50, 
          opacity: 0,
          scale: 0.95
        });
        
        // Animate only the new tiles
        gsap.to(newTileElements, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          onComplete: () => {
            this.animationsRunning = false;
            
            this.$emit('animationsComplete');
            
            setTimeout(() => {
              this.setupScrollAnimations();
            }, 600);
          }
        });
      });
    },
    setupScrollAnimations() {
      if (!this.$refs.artworkTiles || this.$refs.artworkTiles.length === 0) return;
      
      // Clean up existing ScrollTrigger instances to prevent duplicates
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Create a subtle parallax effect when scrolling
      this.$refs.artworkTiles.forEach((component) => {
        // Get the DOM element from the component
        const element = component.$el;
        
        if (!element) return;
        
        ScrollTrigger.create({
          trigger: element,
          start: "top bottom-=100",
          end: "bottom top+=100",
          onEnter: () => {
            gsap.to(element, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              overwrite: 'auto'
            });
          },
          onLeaveBack: () => {
            gsap.to(element, {
              scale: 0.98,
              opacity: 0.8,
              duration: 0.6,
              ease: "power2.out",
              overwrite: 'auto'
            });
          }
        });
      });
    }
  },
  beforeUnmount() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
};
</script> 