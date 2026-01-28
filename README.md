# Global Income Inequality Dashboard

A comprehensive web application for visualizing and analyzing global income inequality trends, country profiles, and policy impacts. Built with React, TypeScript, and modern web technologies.

## Overview

This dashboard provides interactive tools and visualizations to explore:
- **Global Income Inequality Metrics** - Real-time data visualization of income distribution worldwide
- **Country Profiles** - Detailed analysis of individual countries including trends and policy insights
- **Country Comparisons** - Compare economic indicators across multiple countries
- **Data Explorer** - Interactive heatmaps, correlations, and trend analysis
- **Research Resources** - Access publications, datasets, and case studies
- **Policy Impact Simulator** - Analyze potential effects of policy interventions

## Features

✨ **Key Features:**
- 📊 Interactive dashboards with multiple visualization options
- 🌍 Global heatmaps and regional comparisons
- 📈 Time-series trend analysis
- 🔍 Advanced data filtering and correlation analysis
- 🎯 Policy impact simulation tools
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌙 Dark/Light theme support
- 🔐 User authentication and protected routes
- 💬 Real-time chatbot for queries
- 📄 PDF export functionality

## Tech Stack

This project is built with:

- **Frontend Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn-ui
- **Routing:** React Router
- **State Management:** React Context API
- **Charts & Visualization:** Chart.js, Recharts
- **Authentication:** Custom JWT-based auth
- **Package Manager:** npm / bun

## Project Structure
src/
├── components/ # Reusable UI components
│ ├── ui/ # shadcn-ui components
│ ├── Navbar.tsx
│ ├── ThemeToggle.tsx
│ └── ...
├── pages/ # Page components
│ ├── Dashboard*.tsx # Various dashboard views
│ ├── Country_profile/
│ ├── Compare_countries/
│ ├── Data_explorer/
│ ├── Insights/
│ └── Research/
├── lib/ # Utility functions
│ ├── auth.ts # Authentication logic
│ └── utils.ts
├── hooks/ # Custom React hooks
├── utils/ # Helper utilities
├── App.tsx
└── main.tsx

Install dependencies
Run development server
Build for production
The application will be available at http://localhost:5173

Available Scripts
npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build locally
npm run lint - Run ESLint
Pages & Routes
Page	Path	Description
Landing	/	Homepage with project overview
Dashboard 1	/dashboard1	Primary inequality metrics dashboard
Dashboard 2	/dashboard2	Regional analysis dashboard
Dashboard 3	/dashboard3	Demographic insights dashboard
Country Profile	/country/:name	Detailed country analysis
Compare Countries	/compare	Multi-country comparison tool
Data Explorer	/data-explorer	Advanced data analysis interface
Insights	/insights	Policy impact analysis and simulations
Research	/research	Publications and datasets
Timeline	/timeline	Historical trend visualization
Contact	/contact	Contact and feedback form
Admin	/admin	Admin dashboard (protected)
Authentication
The application includes:

User registration and login
JWT-based authentication
Protected routes for admin sections
Session management
Demo Credentials
Check the login page for demo account information.

Features in Detail
Dashboard Views
Multiple visualization perspectives of inequality data
Customizable metrics and filters
Real-time data updates
Export capabilities
Country Profiles
Overview of economic indicators
Historical trends and projections
Regional comparisons
Policy insights specific to each country
Comparison Tools
Side-by-side country metrics
Multi-timeline views
Statistical analysis
Correlation visualization
Data Explorer
Global heatmaps
Variable correlations
Trend time-series analysis
Data upload and merge functionality
Interactive Tools
Policy Impact Simulator
Opportunity Calculator
Mobility Timeline
Factor Breakdown Analysis
Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact & Support
For questions, feedback, or support:

📧 Email: vignajaini@example.com
💬 Use the in-app contact form
🐛 Report issues on GitHub
Acknowledgments
Data sources and research partnerships
shadcn-ui for excellent UI components
The React and Vite communities
Roadmap
 Advanced machine learning predictions
 API integration for live data
 Mobile app version
 Collaborative analysis features
 Custom report generation
 Real-time data synchronization
Last Updated: January 2026


