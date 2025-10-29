# RecruitMate UI

> Your ultimate recruitment assistant powered by AI

RecruitMate is a modern, AI-powered recruitment platform that streamlines the hiring process through intelligent candidate matching, automated screening, and comprehensive candidate management.

## 🚀 Features

### 🎯 Smart Candidate Matching
- AI-powered algorithms that match perfect candidates to job requirements in seconds
- Intelligent scoring system based on resume analysis and job criteria
- Customizable matching thresholds for different positions

### ✅ Automated Screening
- Automated resume screening and initial candidate assessments
- Resume parsing and analysis capabilities
- Status tracking throughout the recruitment pipeline

### 📊 Comprehensive Dashboard
- Real-time analytics and recruitment insights
- Job posting management and tracking
- Candidate pipeline visualization

### 👥 Candidate Management
- Bulk candidate upload functionality
- Email communication tools
- Resume viewing and management
- Status tracking (Applied, Reviewing, Interviewed, Hired, Rejected)

### 🔐 Secure Authentication
- User registration and login system
- Email verification for account security
- Protected routes and role-based access

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.16
- **Routing**: React Router 7.9.4
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Development**: ESLint for code quality

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Pavan-1802/recruitemate-ui
cd recruitmate-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following environment variables:

```env
VITE_APP_API_BASE_URL=your_api_base_url
```

Replace the API base URL with your backend server URL.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CandidatesTable.tsx
│   ├── ConfirmationModal.tsx
│   ├── EmailModal.tsx
│   ├── JobCard.tsx
│   ├── JobFormModal.tsx
│   ├── Landing.tsx
│   ├── LoadingSpinner.tsx
│   ├── Login.tsx
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   ├── PublicRoute.tsx
│   ├── ResumeModal.tsx
│   └── Signup.tsx
├── pages/              # Page components
│   ├── Authentication.tsx
│   ├── Candidates.tsx
│   ├── Dashboard.tsx
│   ├── Jobs.tsx
│   ├── UploadCandidates.tsx
│   └── VerifyEmail.tsx
├── assets/             # Static assets
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration
- `tailwind.config.js` - Tailwind CSS configuration (if present)

## 🌟 Key Components

### Authentication System
- **Login/Signup**: User authentication with email verification
- **Protected Routes**: Secure access to authenticated pages
- **Public Routes**: Landing and authentication pages

### Job Management
- **Job Creation**: Create and manage job postings
- **Job Cards**: Visual representation of job listings
- **Job Form Modal**: Easy job creation and editing interface

### Candidate Management
- **Candidates Table**: Comprehensive candidate listing with filtering
- **Resume Modal**: View and analyze candidate resumes
- **Email Modal**: Communicate with candidates directly
- **Upload Candidates**: Bulk upload functionality for candidate data

### Dashboard & Analytics
- **Dashboard**: Overview of recruitment metrics and activities
- **Loading Spinner**: Consistent loading states across the application

## 🔌 API Integration

The application integrates with a backend API for:
- User authentication and management
- Job posting CRUD operations
- Candidate data management
- Resume processing and scoring
- Email communication

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern Interface**: Clean, professional design with Tailwind CSS
- **Interactive Components**: Modals, forms, and dynamic content
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth user experience with loading indicators

## 🔒 Security Features

- Protected routes for authenticated users only
- Secure API communication
- Email verification for account activation
- Input validation and sanitization

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build files will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request