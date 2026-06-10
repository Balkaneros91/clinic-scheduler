# Clinic Scheduler

Clinic Scheduler is a full-stack web application developed as a thesis project for managing clinic staff scheduling, employee responsibilities, absences, and schedule generation.

The application provides an admin dashboard for managing employees, departments, shift templates, schedules, and absence handling while supporting secure API access and schedule regeneration workflows.

## Contents

- [Clinic Scheduler](#clinic-scheduler)
  - [Contents](#contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Getting Started](#getting-started)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Install dependencies](#2-install-dependencies)
    - [3. Configure environment variables](#3-configure-environment-variables)
  - [Database Setup](#database-setup)
  - [Run the Development Server](#run-the-development-server)
  - [Build for Production](#build-for-production)
  - [Security](#security)
  - [Schedule Regeneration Behavior](#schedule-regeneration-behavior)
  - [Manual Testing](#manual-testing)
  - [Known Limitations](#known-limitations)
  - [Future Improvements](#future-improvements)
  - [Author](#author)

## Features

- Employee management
- Department management
- Shift template management
- Schedule generation and regeneration
- Absence management
- Role-based authorization
- Protected API routes
- Manual assignment preservation during regeneration
- Email notification support
- Prisma ORM with PostgreSQL
- Supabase authentication integration

---

[Back to content list](#contents)

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Next.js App Router API routes
- Prisma ORM
- PostgreSQL
- Supabase Authentication

---

[Back to content list](#contents)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd clinic-scheduler
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

Example variables:

```env
DATABASE_URL=
DIRECT_URL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

ADMIN_NOTIFICATION_EMAIL=
```

---

[Back to content list](#contents)

## Database Setup

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

Optional seed command:

```bash
npx prisma db seed
```

---

[Back to content list](#contents)

## Run the Development Server

```bash
npm run dev
```

Application runs on:

```txt
http://localhost:3000
```

---

## Build for Production

```bash
npm run build
```

---

[Back to content list](#contents)

## Security

The application includes:

- Protected dashboard routes
- Protected API routes
- Admin-only mutation access
- Server-side authorization checks
- Request validation using Zod
- Removal of development/debug API endpoints

---

[Back to content list](#contents)

## Schedule Regeneration Behavior

When schedules are regenerated:

- Existing generated assignments are replaced
- Manual assignments are preserved
- Employee absences are respected during generation

---

[Back to content list](#contents)

## Manual Testing

Manual MVP testing checklist is available in:

```txt
docs/manual-test-checklist.md
```

---

[Back to content list](#contents)

## Known Limitations

- No automated test suite implemented yet
- Email delivery depends on environment configuration
- Schedule generation logic is MVP-focused and may require additional optimization for large-scale production usage

---

[Back to content list](#contents)

## Future Improvements

Potential future improvements for the application include:

- Employee self-service absence requests
- Advanced schedule optimization logic
- Calendar-based schedule visualization
- Automated testing suite
- Email queue and retry handling
- Role-based employee dashboard
- Audit logging for schedule changes
- Export schedules to PDF or Excel

---

[Back to content list](#contents)

## Author

Antonio-Claudio
Full-stack JavaScript Developer Student
Chas Academy

---

[Back to content list](#contents)

---

Happy coder :)
