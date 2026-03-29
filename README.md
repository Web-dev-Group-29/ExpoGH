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

- **Framework:** [Next.js (v15)](https://nextjs.org/) (React Server Components / App Router)
- **UI Library:** [React (v18)](https://react.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment & Edge Optimization:** Cloudflare Pages adapter (`@cloudflare/next-on-pages`)

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can edit the code inside `app/page.jsx` or `app/regions/page.jsx`, and the browser will auto-update!

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The application is structurally pre-rendered locally through static site generation (SSG) protocols handled by Next.js.

## Project Structure

- `frontend/app/` - The core application pages including routing logic for Regions and Experiences.
- `frontend/app/globals.css` - Centralized styling architecture (light/dark themes, components).
- `frontend/components/` - Highly reusable user-interface parts (like `SiteCard.jsx` and `FavoriteButton.jsx`).
- `frontend/lib/` - Local datastores housing Ghana's tourist information (`data.js` and `locationsdb.json`).
