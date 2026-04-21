# MarketPlace - Next.js Product Listing Website

## 🔗 Live Website
https://marketplace-platform-ts.vercel.app/

A simple marketplace-style application built with Next.js 15/16 and the App Router, featuring product listings, detailed views, and user authentication simulation.

## 🌟 Features

### Pages
- **Landing Page**: Complete homepage with 7 sections (Hero, About, How It Works, Featured Items, Why Choose Us, Trust Section, Call to Action)
- **Login Page**: Simulated authentication with fixed credentials
- **Items List Page**: Browse all available products
- **Item Details Page**: Detailed product information with related items
- **Dashboard Page**: Protected route for logged-in users with personalized content

### Components
- Responsive Navbar with mobile menu
- Professional Footer with links and social media
- Reusable ItemCard component
- Modular section components for the landing page

### Styling
- Built with Tailwind CSS
- Fully responsive design
- Clean, modern UI with hover effects and transitions
- Consistent color scheme and typography

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

To create a production build:
```bash
npm run build
npm run start
```

### Demo Credentials
For the login page, use these credentials:
- **Email**: user@marketplace.com
- **Password**: password123

## 🌐 Deployment

This project is ready to deploy! See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy Options:**
- **Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/yourrepo)
- **Netlify**: Push to GitHub and connect via Netlify dashboard
- **Railway**: One-click deploy from GitHub

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.js           # Root layout
│   ├── page.js             # Landing page
│   ├── login/
│   │   └── page.js         # Login page
│   ├── dashboard/
│   │   └── page.js         # Protected dashboard page
│   └── items/
│       ├── page.js         # Items list page
│       └── [id]/
│           ├── page.js     # Item details page
│           └── not-found.js # 404 page for items
├── components/
│   ├── Navbar.js           # Navigation component
│   ├── Footer.js           # Footer component
│   ├── ItemCard.js         # Product card component
│   └── sections/           # Landing page sections
│       ├── HeroSection.js
│       ├── AboutSection.js
│       ├── HowItWorksSection.js
│       ├── FeaturedItemsSection.js
│       ├── WhyChooseUsSection.js
│       ├── TrustSection.js
│       └── CallToActionSection.js
└── data/
    └── products.js         # Mock product data
```

## 🛠 Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Inter Font** - Modern, beautiful typography designed for digital interfaces
- **JetBrains Mono** - Monospace font for code elements
- **Unsplash Images** - High-quality product photography
- **JavaScript** - Programming language

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Design Features

- **Modern Typography** - Inter font for beautiful, readable text
- **High-Quality Images** - Real product images from Unsplash
- **Enhanced Visual Hierarchy** - Improved font weights and letter spacing
- Modern gradient backgrounds with smooth transitions
- Hover effects and micro-interactions
- Card-based layouts with subtle shadows and transforms
- Professional typography with optimized line heights
- Consistent spacing and colors
- Mobile-first responsive design

## 🔧 Customization

### Adding New Products
Edit `src/data/products.js` to add, remove, or modify products.

### Styling Changes
Modify Tailwind classes in components or add custom CSS in `src/app/globals.css`.

### Adding New Pages
Create new page files in the `src/app/` directory following Next.js App Router conventions.

## 📄 License

This project is for educational purposes and demonstration only.

---

Built with ❤️ using Next.js and Tailwind CSS