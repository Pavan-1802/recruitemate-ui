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

### 🤖 AI-Powered Content Generation
- **Smart Job Descriptions**: AI generates detailed job descriptions from simple keywords
- **Intelligent Email Composition**: Automated generation of professional acceptance/rejection emails
- **Content Personalization**: Customize AI-generated content to match your company tone

### 👥 Candidate Management
- **Modern Card Interface**: Gradient-based card design with animations
- **Score Badges**: Visual candidate scoring with color-coded badges
- **Smart Scheduling**: Schedule interviews directly from candidate cards
- **Candidates Table**: Comprehensive listing with filtering and pagination
- **Bulk Upload**: Upload multiple candidates at once
- **Email Communication**: Professional email templates for candidate outreach
- **Resume Management**: View and analyze candidate resumes
- **On-Hold Status**: Manage candidates on hold with dedicated view

### 🔐 Secure Authentication
- User registration and login system
- Email verification for account security
- Password reset functionality
- Protected routes and role-based access
- Secure token-based authentication

### 📅 Interview Scheduling & Calendar
- **Card-Based Interview Display**: Modern card layout with gradient headers
- **Overlap Detection**: Intelligent detection and visual indicators for scheduling conflicts
- **Conflict Management**: Amber warnings for overlapping interview slots
- **Filter Tabs**: Filter by All, Today, Upcoming, or Conflicts
- **Statistics Dashboard**: Live counts for scheduled, upcoming, and conflicting interviews
- **Time Management**: Detailed time display with duration and end time calculations
- **Action Controls**: View details and delete interviews directly from cards
- **Empty States**: Graceful handling when no interviews are scheduled

### 💼 Job Management
- Create and manage job postings
- AI-powered job description generation
- Edit and delete job listings
- Track candidates per job
- Navigate to candidate management per job

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

```
src/
├── components/          # Reusable UI components
│   ├── CandidateCard.tsx              # Modern gradient card for candidates
│   ├── CandidatesTable.tsx            # Comprehensive candidate listing table
│   ├── ConfirmationModal.tsx          # Reusable confirmation dialog
│   ├── ConflictBanner.tsx             # Warning banner for interview conflicts
│   ├── EmailModal.tsx                 # Email composition modal
│   ├── EmptyState.tsx                 # Context-aware empty state component
│   ├── FilterTabs.tsx                 # Filter buttons for interview calendar
│   ├── ForgotPassword.tsx             # Forgot password form
│   ├── InterviewCard.tsx              # Individual interview card with conflict indicators
│   ├── InterviewModal.tsx             # Interview details modal
│   ├── InterviewStats.tsx             # Statistics cards for interviews
│   ├── JobCard.tsx                    # Job listing card
│   ├── JobFormModal.tsx               # Job creation/editing form
│   ├── Landing.tsx                    # Landing page component
│   ├── LoadingSpinner.tsx             # Loading indicator
│   ├── Login.tsx                      # Login form
│   ├── PaginationControls.tsx         # Pagination component
│   ├── ProtectedRoute.tsx             # Route wrapper for authenticated pages
│   ├── PublicRoute.tsx                # Route wrapper for public pages
│   ├── ResumeCard.tsx                 # Resume display card
│   ├── ResumeModal.tsx                # Resume viewing modal
│   ├── ScheduleInterviewsEmpty.tsx    # Empty state for schedule page
│   ├── ScheduleInterviewsHeader.tsx   # Header with stat cards
│   ├── Sidebar.tsx                    # Navigation sidebar
│   └── Signup.tsx                     # Registration form
├── pages/              # Page components
│   ├── Authentication.tsx             # Login/Signup page
│   ├── Candidates.tsx                 # Candidate management page
│   ├── InterviewCalendar.tsx          # Card-based with overlap detection
│   ├── Jobs.tsx                       # Job listings page
│   ├── OnHold.tsx                     # On-hold resumes page
│   ├── ResetPassword.tsx              # Password reset page
│   ├── ScheduleInterviews.tsx         # Interview scheduling interface
│   ├── UploadCandidates.tsx           # Bulk candidate upload page
│   └── VerifyEmail.tsx                # Email verification page
├── assets/             # Static assets
├── App.tsx            # Main application component with routing
├── main.tsx           # Application entry point
├── index.css          # Global styles
types.ts               # TypeScript type definitions
utils.ts               # Utility functions (date formatting, overlap detection)
## 🌟 Key Components

### Authentication System
- **Login/Signup**: User authentication with email verification
- **Protected Routes**: Secure access to authenticated pages
- **Public Routes**: Landing and authentication pages
- **Password Reset**: Forgot password and reset password flows
- **Email Verification**: Account activation via email token

### Job Management
- **Job Creation**: Create and manage job postings with AI assistance
- **Job Cards**: Visual representation of job listings
- **Job Form Modal**: Easy job creation and editing interface with AI-powered description generation
- **Smart Descriptions**: Generate comprehensive job descriptions from keywords using AI

### Candidate Management
- **Candidates Table**: Comprehensive candidate listing with filtering and pagination
- **Candidate Cards**: Modern gradient-based cards with score badges and animations
- **Resume Modal**: View and analyze candidate resumes
- **Email Modal**: Communicate with candidates using AI-generated templates
- **Upload Candidates**: Bulk upload functionality for candidate data
- **On-Hold Resumes**: Dedicated page for managing candidates on hold
- **Schedule Interviews**: Direct scheduling from candidate cards

### Interview Management
- **Interview Calendar**: Card-based interface with conflict detection
- **Overlap Detection**: Intelligent algorithm to detect scheduling conflicts
- **Interview Stats**: Real-time statistics for scheduled, upcoming, and conflicting interviews
- **Filter System**: Filter interviews by All, Today, Upcoming, or Conflicts
- **Interview Cards**: Detailed cards showing time, duration, candidate, and job information
- **Conflict Indicators**: Visual warnings for overlapping interview slots

## 🔌 API Integration

The application integrates with a backend API for:
- User authentication and management
- Job posting CRUD operations
- Candidate data management
- Resume processing and scoring
- Email communication
- Interview scheduling and management
- AI content generation for job descriptions and emails

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern Interface**: Clean, professional design with Tailwind CSS
- **Gradient Backgrounds**: Subtle gradients for visual depth
- **Card-Based Layouts**: Modern card designs with shadows and hover effects
- **Interactive Components**: Modals, forms, and dynamic content
- **Animations**: Smooth transitions and hover effects
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading experience with spinners
- **Empty States**: Graceful handling of no-data scenarios with custom messages
- **Visual Feedback**: Badges, indicators, and status colors for instant recognition

### Utility Components
- **Loading Spinner**: Consistent loading states across the application
- **Confirmation Modal**: Reusable confirmation dialogs
- **Pagination Controls**: Navigate through large datasets
- **Empty State**: Generic empty state component with customizable messages
- **Filter Tabs**: Reusable tab component for filtering data
- **Sidebar**: Navigation sidebar for authenticated pages

## 🔒 Security Features

- Protected routes for authenticated users only
- Secure API communication with Bearer token authentication
- Email verification for account activation
- Password reset with secure token-based flow
- LocalStorage-based session management
- Input validation and sanitization

## 🎯 Code Architecture

### Component Organization
The application follows a modular architecture with:
- **Page Components**: Main route components that orchestrate functionality
- **Feature Components**: Specialized components for specific features
- **Utility Components**: Reusable, generic components used across pages
- **Centralized Utilities**: Shared functions in `utils.ts` for date formatting, overlap detection, etc.

### Key Utilities (`utils.ts`)
- `formatDateTime`: Smart date formatting (Today/Tomorrow/Date)
- `formatInterviewTime`: 12-hour time format conversion
- `getEndTime`: Calculate interview end time from start and duration
- `detectInterviewOverlaps`: Complex overlap detection algorithm using Map/Set

### Component Patterns
- TypeScript interfaces for strong typing (`types.ts`)
- Consistent naming conventions (handle* for events, fetch* for API calls)
- Reusable modal components
- Composition over inheritance for component reusability

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

## 📱 Application Routes

- `/` - Jobs page (protected, default route)
- `/auth` - Authentication page (login/signup)
- `/verify/:token` - Email verification page
- `/reset-password/:token` - Password reset page
- `/upload-candidates/:id` - Bulk candidate upload for a specific job
- `/candidates/:id` - Candidate management for a specific job
- `/on-hold-resumes` - View and manage on-hold candidates
- `/interview-calendar` - Interview calendar with conflict detection
- `/schedule-interviews` - Schedule interviews interface

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of RecruitMate - All rights reserved.

## 👥 Authors

- **Pavan** - [@Pavan-1802](https://github.com/Pavan-1802)