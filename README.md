# Ain Fakroun City Portal 🏛️

Official city portal for **Ain Fakroun** (عين فكرون), Oum El Bouaghi Province, Algeria.

A comprehensive web application providing information about local businesses, events, healthcare, mosques, and emergency services.

## Features

- 🏢 **Business Directory** - Search and browse local businesses by category
- 📅 **Events Calendar** - Upcoming community events and activities
- 🏥 **Healthcare** - Hospitals, clinics, pharmacies, and medical services
- 🕌 **Mosques** - Prayer times and mosque locations
- 🚨 **Emergency Contacts** - Important phone numbers and emergency services
- 🗺️ **Interactive Map** - Explore the city with OpenStreetMap integration
- 🌍 **Multilingual** - Support for Arabic (RTL), French, and English

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Maps**: Leaflet + OpenStreetMap
- **Icons**: Lucide React

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and edit `.env.local`:

```bash
cp .env.example .env.local
```

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/ainfakroun

# Or for MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ainfakroun
```

### 3. Seed Database (Optional)

```bash
npx tsx scripts/seed.ts
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js pages & API routes
│   ├── api/             # REST API endpoints
│   ├── directory/       # Business directory
│   ├── events/          # Events calendar
│   ├── mosques/         # Mosques listing
│   ├── medical/         # Healthcare facilities
│   ├── emergency/       # Emergency contacts
│   ├── map/             # Interactive map
│   └── about/           # About page
├── components/          # React components
├── models/              # Mongoose schemas
├── lib/                 # Utilities (DB connection)
└── hooks/               # Custom React hooks
```

## Deployment

Deploy easily on Vercel:

```bash
npm run build
```

---

Made with ❤️ for Ain Fakroun, Algeria 🇩🇿

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
