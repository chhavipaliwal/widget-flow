# Widget Flow Dashboard

A modern, responsive dashboard application for managing and visualizing widgets across different categories. Built with Next.js 15 and featuring a clean, intuitive interface for creating, editing, and organizing dashboard widgets.

## 🚀 Live Demo

**This project is deployed on my VPS and is accessible at:** [Your VPS URL here]

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22.17 or later
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/chhavipaliwal/widget-flow.git
   cd widget-flow
   ```

2. **Run the setup script**

   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Manual Setup

If you prefer to set up manually:

```bash
# Install pnpm (if not already)
npm i -g pnpm

# Install dependencies
pnpm install

# Start development server
pnpm dev

or

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🛠️ Technologies Used

### Core Framework

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful, accessible components
- **Lucide React** - Modern icon library

### State Management & Data Fetching

- **TanStack Query (React Query)** - Server state management
- **Formik** - Form handling
- **Yup** - Schema validation

### Data Visualization

- **Recharts** - Composable charting library

### Development Tools

- **Turbopack** - Fast bundler for development
- **pnpm** - Fast, disk space efficient package manager

## 📋 Features

- 📊 **Widget Management** - Create, edit, and delete dashboard widgets
- 🏷️ **Category Organization** - Organize widgets into categories
- 📈 **Data Visualization** - Support for donut charts, bar charts, and more
- 🎨 **Modern UI** - Clean, responsive design with dark/light mode support
- ⚡ **Real-time Updates** - Optimistic updates with React Query
- 🔧 **Type Safety** - Full TypeScript support
- 📱 **Responsive Design** - Works on all device sizes

## 🏗️ Project Structure

```
widget-flow/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/               # Reusable UI components
├── data/                 # Static data files
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── utils/                # Helper utilities
```

## 🎯 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack
- `pnpm start` - Start production server
