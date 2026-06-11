# Clinic Scheduler

Clinic Scheduler is a full-stack web application developed as a thesis project for managing clinic staff scheduling, employee responsibilities, absences, and schedule generation.

The application provides an admin dashboard for managing employees, departments, shift templates, schedules, and absence handling while supporting secure API access and schedule regeneration workflows.

## Contents

- [Clinic Scheduler](#clinic-scheduler)
  - [Contents](#contents)
  - [Features](#features)
  - [Database Design](#database-design)
  - [System Architecture](#system-architecture)
  - [Design Planning](#design-planning)
    - [Initial Wireframes](#initial-wireframes)
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
  - [Application Screenshots](#application-screenshots)
    - [Authentication](#authentication)
    - [Admins Dashboard](#admins-dashboard)
    - [Employees Dashboard](#employees-dashboard)
    - [Employee Management](#employee-management)
    - [Department Management](#department-management)
    - [Shift Template Management](#shift-template-management)
    - [Schedule Management](#schedule-management)
    - [Schedule Assignment Management](#schedule-assignment-management)
    - [Absence Management](#absence-management)
    - [API Security](#api-security)
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

## Database Design

Entity Relationship Diagram

![ERD](docs/screenshots/erd.png)

---

[Back to content list](#contents)

## System Architecture

Application Architecture

![Architecture Diagram](docs/screenshots/system_architecture.png)

---

[Back to content list](#contents)

## Design Planning

Initial Dashboard Wireframe

![Wireframe](docs/screenshots/dashboard_wireframe.png)

### Initial Wireframes

<details>
<summary>Click here!</summary>
<br>

Admin Dashboard Wireframe

![Admin Dashboard Wireframe](docs/screenshots/admin_dashboard_wireframe.png)

Admin Employees View Wireframe

![Admin Employees View Wireframe](docs/screenshots/admin_employees_view_wireframe.png)

Admin Schedules View Wireframe

![Admin Schedules View Wireframe](docs/screenshots/admin_schedules_view_wireframe.png)

Admin Absence View Wireframe

![Admin Absence View Wireframe](docs/screenshots/admin_absence_view_wireframe.png)

</details>

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

## Application Screenshots

### Authentication

<details>
<summary>Click here!</summary>
<br>

Login Page

![Login Page](docs/screenshots/login_page.png)

Forgot Password Dialog

![Forgot Password Dialog](docs/screenshots/forgot_password_reset_dialog.png)

Reset Password Email

![Reset Password Email](docs/screenshots/reset_password_email.png)

Reset Password Dialog

![Reset Password Dialog](docs/screenshots/reset_password_dialog.png)

Update Password Dialog

![Update Password Dialog](docs/screenshots/update_password_dialog.png)

Update Password Validation

![Update Password Validation](docs/screenshots/update_password_dialog_validation.png)

Confirm Logout

![Confirm Logout](docs/screenshots/confirm_logout.png)

</details>

---

### Admins Dashboard

<details>
<summary>Click here!</summary>
<br>

Admin Dashboard

![Admin Dashboard Restricted as Employee](docs/screenshots/dashboard_admin_as_employee.png)

Shared Employee/Admin Functionality

![Admin Dashboard](docs/screenshots/dashboard_admin.png)

</details>

---

### Employees Dashboard

<details>
<summary>Click here!</summary>
<br>

Employee Dashboard

![Employee Dashboard](docs/screenshots/dashboard_employee.png)

Employee Schedules View

![Employee Schedules View](docs/screenshots/employee_dashboard_schedules_view.png)

Employee Schedule Assignments View

![Employee Schedule Assignments View](docs/screenshots/employee_dashboard_schedule_assignments_view.png)

Employee Absence View

![Employee Absence View](docs/screenshots/employee_dashboard_absence_view.png)

Employee Add Absence Dialog

![Employee Add Absence Dialog](docs/screenshots/employee_dashboard_add_absence_dialog.png)

</details>

---

### Employee Management

<details>
<summary>Click here!</summary>
<br>

Employees View

![Employees View](docs/screenshots/admin_dashboard_employees_view.png)

Create Employee

![Create Employee](docs/screenshots/admin_dashboard_create_employee.jpeg)

Edit Employee

![Edit Employee](docs/screenshots/admin_dashboard_edit_employee.png)

Delete Employee

![Delete Employee](docs/screenshots/admin_dashboard_delete_employee.png)

</details>

---

### Department Management

<details>
<summary>Click here!</summary>
<br>

Departments View

![Departments View](docs/screenshots/admin_dashboard_departments_view.png)

Edit Department

![Edit Department](docs/screenshots/admin_dashboard_edit_department.png)

Delete Department

![Delete Department](docs/screenshots/admin_dashboard_delete_department.png)

</details>

---

### Shift Template Management

<details>
<summary>Click here!</summary>
<br>

Shift Templates View

![Shift Templates View](docs/screenshots/admin_dashboard_shift_templates_view.png)

Edit Shift Template

![Edit Shift Template](docs/screenshots/admin_dashboard_edit_shift_template.png)

Delete Shift Template

![Delete Shift Template](docs/screenshots/admin_dashboard_delete_shift_template.png)

</details>

---

### Schedule Management

<details>
<summary>Click here!</summary>
<br>

Schedules View

![Schedules View](docs/screenshots/admin_dashboard_schedules_view.png)

Empty Schedules View

![Empty Schedules View](docs/screenshots/admin_dashboard_empty_schedules_view.png)

Generated Schedules View

![Generated Schedules View](docs/screenshots/admin_dashboard_generated_schedules_view.png)

Edit Schedule

![Edit Schedule](docs/screenshots/admin_dashboard_edit_schedule.png)

Delete Schedule

![Delete Schedule](docs/screenshots/admin_dashboard_delete_schedule.png)

Schedule Regeneration Message

![Schedule Regeneration Message](docs/screenshots/schedule_regeneration_message.png)

</details>

---

### Schedule Assignment Management

<details>
<summary>Click here!</summary>
<br>

Schedule Assignments View

![Schedule Assignments View](docs/screenshots/admin_dashboard_schedule_assignments_view.png)

Schedule Assignment Search

![Schedule Assignment Search](docs/screenshots/admin_dashboard_schedule_assignments_search.png)

Edit Schedule Assignment

![Edit Schedule Assignment](docs/screenshots/admin_dashboard_edit_schedule_assignments.png)

Delete Schedule Assignment

![Delete Schedule Assignment](docs/screenshots/admin_dashboard_delete_schedule_assignment.png)

</details>

---

### Absence Management

<details>
<summary>Click here!</summary>
<br>

Absence View

![Absence View](docs/screenshots/admin_dashboard_absence_view.png)

Add Absence Dialog

![Add Absence Dialog](docs/screenshots/admin_dashboard_add_Absence_dialog.png)

Edit Absence

![Edit Absence](docs/screenshots/admin_dashboard_edit_absence.png)

Delete Absence

![Delete Absence](docs/screenshots/admin_dashboard_delete_absence.png)

New Absence Request Email

![New Absence Request Email](docs/screenshots/new_absence_request_email.png)

</details>

---

### API Security

Protected API routes return `401 Unauthorized`
for unauthenticated access attempts.

<details>
<summary>Click here!</summary>

API Authentication Protection

![API Authentication Protection](docs/screenshots/api_auth_protection.png)

</details>

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
- Add pagination, date filtering and lazy loading to schedule detail views when handling larger clinics or longer planning periods.
- Extend filtering across employees, departments, shifts, absences and schedules as the dataset grows.
- Add performance-focused data loading strategies for high-volume assignment data.

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
