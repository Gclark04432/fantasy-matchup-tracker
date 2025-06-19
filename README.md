# 🏈 Fantasy Matchup Tracker

A modern, real-time fantasy football player tracking application built with Next.js, TypeScript, and Supabase. Track your favorite NFL players, monitor their fantasy points, and get live score updates with beautiful animations.

![Fantasy Matchup Tracker](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2.50.0-green?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.8-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality

- **Player Search**: Search through 476+ NFL players with instant results
- **Watchlist Management**: Add/remove players to your personal watchlist
- **Real-time Updates**: Live score simulation with animated change indicators
- **User Authentication**: Secure login with Supabase Auth
- **Persistent Storage**: Your watchlist saves automatically to the cloud
- **Dark Mode**: Toggle between light and dark themes

### 🚀 Technical Features

- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **TypeScript**: Full type safety throughout the application
- **Real-time Database**: Supabase integration for instant data sync
- **Smooth Animations**: Framer Motion for beautiful transitions
- **Local Data**: Fast player search using local JSON database
- **Score Simulation**: Live updates to demonstrate real-time functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Data Source**: FantasyPros CSV integration

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works great!)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fantasy-matchup-tracker.git
cd fantasy-matchup-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from Settings → API

#### Set Up Database Table

Run this SQL in your Supabase SQL editor:

```sql
-- Create the watched_players table
CREATE TABLE watched_players (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  watched_players JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE watched_players ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Enable read for users based on email" ON watched_players
FOR SELECT USING (((SELECT auth.jwt()) ->> 'email') = email);

CREATE POLICY "Enable insert for users based on email" ON watched_players
FOR INSERT WITH CHECK (((SELECT auth.jwt()) ->> 'email') = email);

CREATE POLICY "Enable update for users based on email" ON watched_players
FOR UPDATE USING (((SELECT auth.jwt()) ->> 'email') = email)
WITH CHECK (((SELECT auth.jwt()) ->> 'email') = email);

CREATE POLICY "Enable delete for users based on email" ON watched_players
FOR DELETE USING (((SELECT auth.jwt()) ->> 'email') = email);
```

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Set Up Player Data

#### Option A: Use FantasyPros Data (Recommended)

1. Download CSV files from [FantasyPros NFL Projections](https://www.fantasypros.com/nfl/projections/)
2. Place the CSV files in the `scripts/` directory:
   - `fantasypros_qb.csv`
   - `fantasypros_rb.csv`
   - `fantasypros_wr.csv`
   - `fantasypros_te.csv`
3. Run the conversion script:

```bash
npm run convert-fantasypros
```

#### Option B: Use Sample Data

The app comes with sample player data that will work out of the box.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎮 How to Use

### Getting Started

1. **Sign In**: Use your email to create an account or sign in
2. **Search Players**: Use the search bar to find NFL players by name
3. **Add to Watchlist**: Click the "+" button on any player card
4. **Monitor Updates**: Your watched players will show in the bottom section
5. **Live Updates**: Toggle "Start Live Updates" to see score changes in real-time

### Features Explained

#### 🔍 Player Search

- **Instant Results**: Search by first name, last name, or full name
- **476+ Players**: Comprehensive database of NFL players
- **Real-time Filtering**: Results update as you type

#### 📊 Watchlist Management

- **Personal Lists**: Each user has their own watchlist
- **Persistent Storage**: Your list saves automatically to Supabase
- **Easy Management**: Add/remove players with one click

#### ⚡ Live Score Simulation

- **Realistic Updates**: Random score changes every 5-30 seconds
- **Visual Feedback**: Animated score change indicators
- **Toggle Control**: Start/stop live updates anytime

## 🏗️ Project Structure

```
fantasy-matchup-tracker/
├── src/
│   ├── app/
│   │   ├── components/ui/          # Reusable UI components
│   │   ├── data/                   # Player data and examples
│   │   ├── lib/                    # Utilities and services
│   │   │   ├── supabase/          # Database client
│   │   │   ├── playerSearch.ts    # Player search logic
│   │   │   ├── watchedPlayersService.ts  # Database operations
│   │   │   └── scoreSimulator.ts  # Live score simulation
│   │   ├── types/                  # TypeScript type definitions
│   │   └── page.tsx               # Main application page
│   └── ...
├── scripts/
│   └── convert-fantasypros-csv.js  # CSV to JSON converter
├── public/                         # Static assets
└── package.json
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run convert-fantasypros` - Convert FantasyPros CSV to JSON

## 🎨 Customization

### Adding New Players

1. Download updated CSV files from FantasyPros
2. Run `npm run convert-fantasypros`
3. The app will automatically use the new data

### Styling

- **Tailwind CSS**: All styling is done with Tailwind classes
- **Dark Mode**: Toggle is built-in and customizable
- **Responsive**: Mobile-first design with breakpoints

### Database Schema

The `watched_players` table structure:

```sql
{
  email: string,           -- User's email address
  watched_players: number[] -- Array of player IDs
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FantasyPros** for player data and projections
- **Supabase** for the amazing backend-as-a-service
- **Next.js** team for the incredible React framework
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the [Supabase documentation](https://supabase.com/docs)
- Review the [Next.js documentation](https://nextjs.org/docs)

---

**Made with ❤️ for fantasy football fans everywhere!**
