# Expo GH

Expo GH is a dynamic and responsive web application designed to showcase the rich cultural, historical, and natural tourist destinations of Ghana. Users can explore various regions, discover exciting experiences, and get detailed information on breathtaking places like the Aburi Botanical Gardens, Kakum National Park, Cape Coast Castle, and more.

## Features

- **Dynamic Regions Exploration:** Filter tourist locations seamlessly by Category (Nature, Cultural, Adventure, etc.) and Region.
- **Detailed Destination Specs:** Beautifully designed site layouts provide easy-to-read cards featuring "Overview", "Best Time", "Entry Fees", "GPS Coordinates", and "Activities".
- **Interactive Modals:** Dedicated modal interfaces keep the screen clean by truncating extensive descriptions on mobile views into neatly accessible pop-ups.
- **Dark Mode Support:** Effortlessly adapts layout structures with pure Vanilla CSS custom properties to enhance readability.
- **Responsive Design:** Optimized for both mobile and desktop screens. Elements and lengthy visual contents scale down elegantly for the best user experience.

## Tech Stack

The application is built using modern web development standards to ensure high performance and maintainability:

- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Library:** [React (v18)](https://react.dev/)
- **Routing:** [React Router (v6)](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Vanilla CSS (Custom Properties / Design Tokens)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or newer) and `npm` installed. 

### Installation

1. Navigate to the frontend directory of the project:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Application

To run the local development server:

```bash
npm run dev
```

Open the local URL shown in your terminal (usually [http://localhost:5173](http://localhost:5173)) to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

## Project Structure

- `frontend/src/` - The core application source code.
- `frontend/src/pages/` - Page components (Home, Regions, Experiences, etc.).
- `frontend/src/components/` - Reusable UI components (SiteCard, Navbar, etc.).
- `frontend/src/lib/` - Data utilities and mock databases.
- `frontend/src/index.css` - Centralized design system and character styles.
- `frontend/public/assets/` - Static assets (images, logos).
