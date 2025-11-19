# HomeOS

A personal operating system for household and life maintenance. Track recurring tasks, chores, reminders, and maintenance cycles across four major domains: Home, Car, Pet, and Life.

## Features

- **4 Domain Tabs**: Home, Car, Pet, and Life
- **Today View**: See urgent tasks sorted by priority (overdue → due today → due soon → due this week)
- **All Tasks View**: Browse all tasks organized by category with collapsible sections
- **History View**: Track completed tasks with timestamps and notes
- **Task Management**: 
  - Mark tasks as done (auto-calculates next due date)
  - Snooze tasks
  - Edit task details
  - Add custom tasks or choose from templates
- **Frequency Support**: Daily, weekly, monthly, yearly, and custom frequencies
- **Local Storage**: All data persists in browser localStorage

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React (Icons)
- date-fns (Date utilities)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app is optimized for mobile view (480px width).

## Project Structure

```
homeos/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main app page
│   └── globals.css         # Global styles and design system
├── components/
│   ├── domain/
│   │   ├── DomainTabs.tsx  # Tab navigation (Today/All/History)
│   │   └── DomainView.tsx  # Main domain container
│   ├── navigation/
│   │   └── BottomNav.tsx   # Bottom navigation bar
│   ├── pages/
│   │   ├── TodayPage.tsx   # Today's tasks view
│   │   ├── AllTasksPage.tsx # All tasks view
│   │   └── HistoryPage.tsx  # History view
│   ├── tasks/
│   │   ├── TaskCard.tsx     # Task card component
│   │   ├── TaskDetailModal.tsx # Task detail/edit modal
│   │   ├── AddTaskModal.tsx # Add task modal
│   │   └── FloatingActionButton.tsx # FAB for adding tasks
│   └── ui/
│       ├── Button.tsx       # Reusable button component
│       ├── Card.tsx         # Reusable card component
│       ├── BottomSheet.tsx  # Bottom sheet modal
│       └── Toast.tsx        # Toast notification
├── data/
│   └── templates.ts        # Pre-defined task templates
├── lib/
│   ├── dateUtils.ts        # Date calculation utilities
│   ├── storage.ts          # LocalStorage utilities
│   ├── initTasks.ts        # Task initialization
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript type definitions
```

## Design System

The app uses a mobile-first design system with CSS variables for consistent theming:

- **Colors**: Primary green (#10b981), danger red, warning orange, info blue
- **Spacing**: Consistent spacing scale (4px, 8px, 16px, 20px, 24px, 32px)
- **Border Radius**: 8px, 12px, 16px, 20px, full
- **Shadows**: Subtle shadows for elevation
- **Typography**: Geist Sans font family

## Pre-loaded Categories

### Home
- Air Filters, Trash/Recycling, Lawn Care, House Cleaning, Pest Control, Water Filter Replacement, HVAC Service, Bills (HOA, Electricity, Water, Internet)

### Car
- Oil Change, Tire Rotation, Emissions Test, Car Wash, Insurance Renewal, Registration Renewal, License Renewal, General Service, Warranty Tracking

### Pet
- Vaccinations, Heartworm Prevention, Flea & Tick Prevention, Food Refill Tracking, Grooming, Vet Checkups, Medications, Supplements

### Life
- Subscriptions (Netflix, Apple, Spotify), Bills (Rent/Mortgage, Credit Cards), Admin Documents (Passport, Driver's License), Financial (Credit Score), Health (Dental, Physical), Digital Hygiene (Password Rotation, Photo Cleanup), Important Dates (Anniversaries, Birthdays)

## Future Enhancements

- Push notifications
- Swipe gestures (swipe right to complete, swipe left to snooze)
- Receipt/photo/document attachments
- Export history as CSV/PDF
- Search functionality
- AI pattern detection and insights
- Multi-device sync
