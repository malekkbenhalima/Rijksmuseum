# Rijksmuseum Gallery

A Vue 3 SPA that showcases artworks from the Rijksmuseum collection.

## Live Demo

Check out the live version: [Rijksmuseum Gallery](https://rijksmuseum-app.netlify.app/)

## Features

- Display artworks from the Rijksmuseum API
- Search functionality
- "Load more" button
- Responsive grid layout

## Technologies Used

- Vue 3
- SCSS
- Axios
- Vue Router

## Project Setup

### Prerequisites

- Node.js (v14+)
- npm (v6+)

### Installation

1. Clone this repository
   ```
   git clone https://github.com/malekkbenhalima/Rijksmuseum.git
   cd Rijksmuseum
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file
   ```
   VUE_APP_RIJKSMUSEUM_API_KEY=
   ```

### Development

```
npm run serve
```

### Production Build

```
npm run build
```

## Project Structure

```
Rijksmuseum/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── utils/
│   ├── App.vue
│   └── main.js
└── package.json
```

## Design Decisions

### Icon Registry

The project implements a custom icon registry system (`src/utils/iconRegistry.js`) that offers several benefits:

- **Centralized management** of all SVG icons in one location
- **On-demand loading** to improve performance by only loading used icons
- **Consistent styling** across the application with the AppIcon component
- **Reduced bundle size** compared to importing icon libraries
- **Simplified maintenance** when adding or updating icons 

### CSS Architecture

The project follows a modular SCSS architecture inspired by the 7-1 pattern to ensure maintainability and scalability:

- **Organized directory structure**:
  - `base/`: Core styles (typography, grid, accessibility)
  - `components/`: Reusable component styles
  - `layout/`: Layout-specific styles
  - `features/`: Feature-specific styles

- **Benefits**:
  - **Separation of concerns**: Each file has a single responsibility
  - **Maintainability**: Modular files make it easier to locate and update styles
  - **Scalability**: New features can be added without affecting existing styles
  - **Performance**: Styles are modularized and only loaded when needed
  - **Consistency**: Shared variables ensure design consistency

- **Implementation details**:
  - CSS variables for theming and responsive design
  - Scoped component styles for encapsulation
  - Consistent naming conventions
  - Cross-browser compatibility considerations
  - Minimized specificity conflicts 