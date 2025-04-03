import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      title: 'Rijksmuseum Gallery | Explore Art Collection',
      metaTags: [
        {
          name: 'description',
          content: 'Explore the Rijksmuseum\'s art collection. Discover masterpieces from the Dutch Golden Age and beyond.'
        },
        {
          property: 'og:title',
          content: 'Rijksmuseum Gallery'
        }
      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
})

// This callback runs before every route change, including on initial load
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  // Remove any stale meta tags from the document
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
    el => el.parentNode.removeChild(el)
  );

  // Set page title
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  }

  // Add new meta tags
  if (nearestWithMeta) {
    nearestWithMeta.meta.metaTags.forEach(tagDef => {
      const tag = document.createElement('meta');
      
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      
      tag.setAttribute('data-vue-router-controlled', '');
      document.head.appendChild(tag);
    });
  }

  next();
});

export default router 