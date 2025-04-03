// Icon registry for the application
// This centralizes all SVG icons and allows for more scalable icon management

const iconRegistry = {
  // Search icon
  'search': `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12.5,12.5 L18,18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  
  // Clear icon
  'clear': `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path d="M4,4 L12,12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12,4 L4,12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  
  // Arrow Right icon
  'arrow-right': `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <path d="M2,8 L14,8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M9,3 L14,8 L9,13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  
  // Chevron Down icon
  'chevron-down': `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 22">
      <path d="M3,5 L9,11 L15,5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3,12 L9,18 L15,12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5" />
    </svg>
  `,
  
  // No Image icon
  'no-image': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,
  
  // Rijksmuseum Logo
  'logo': `
  <?xml version="1.0" encoding="UTF-8"?>
    <svg width="2677px" height="1968px" viewBox="0 0 2677 1968" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="vecteezy_letter-rk-simple-shapes-alphabet-creative-monogram-abstract_35554753" transform="translate(0.3506, 0.8037)" fill="#7A5E35" fill-rule="nonzero">
                <g id="g8" transform="translate(1338.0246, 983.3648) scale(-1, 1) rotate(-180) translate(-1338.0246, -983.3648)translate(-0, 0)">
                    <g id="g10" transform="translate(0, 0)">
                        <polyline id="path14" points="2666.67593 1965.58662 2286.56928 1965.58662 1498.19596 1010.18664 2301.48928 -4.54747351e-13 2676.04927 -4.54747351e-13 1875.48929 1006.77331 2666.67593 1965.58662"></polyline>
                        <path d="M2.35304558e-13,1966.58662 L830.782646,1966.58662 C852.502645,1967.35995 1172.74264,1973.15995 1353.63597,1709.51996 C1501.1293,1494.5733 1474.6493,1219.0533 1356.9293,1041.81331 C1310.8893,972.506642 1256.8093,927.119977 1218.6493,899.879978 L1934.72928,1 L1574.94263,1 L799.382647,983.799975 C799.382647,983.799975 1159.6493,1033.39997 1159.6493,1355.07997 C1159.6493,1529.31996 1083.56931,1614.15996 1013.83597,1655.34663 C968.715976,1681.98662 916.355977,1693.75996 863.955978,1693.75996 L214.102661,1693.75996 L2.35304558e-13,1966.58662" id="path16"></path>
                    </g>
                </g>
            </g>
        </g>
    </svg>
  `,
};

// Get an icon by name, returns empty div if not found
export function getIcon(iconName) {
  return iconRegistry[iconName] || '<div></div>';
}

// Check if an icon exists in the registry
export function hasIcon(iconName) {
  return iconName in iconRegistry;
}

// Get all available icon names
export function getIconNames() {
  return Object.keys(iconRegistry);
}

export default iconRegistry; 