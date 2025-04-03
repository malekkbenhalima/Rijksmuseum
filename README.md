# Rijksmuseum Gallery

A Vue 3 SPA that showcases artworks from the Rijksmuseum collection.

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
   git clone <repository-url>
   cd rijksmuseum-app
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