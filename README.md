# Clinic Scheduler

Clinic Scheduler is a full-stack web application developed as a thesis project for managing clinic staff scheduling, employee responsibilities, absences, and schedule generation.

The application provides an admin dashboard for managing employees, departments, shift templates, schedules, and absence handling while supporting secure API access and schedule regeneration workflows.

## Contents

- [Clinic Scheduler](#clinic-scheduler)
  - [Contents](#contents)
  - [Features](#features)
  - [Project Purpose](#project-purpose)
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
  - [API Security Testing](#api-security-testing)
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
  - [Testing and Debugging](#testing-and-debugging)
  - [Manual Testing](#manual-testing)
  - [Known Limitations](#known-limitations)
  - [Future Improvements](#future-improvements)
    - [Scheduling and planning](#scheduling-and-planning)
    - [Employee self-service](#employee-self-service)
    - [HR and document handling](#hr-and-document-handling)
    - [Management and analytics](#management-and-analytics)
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

## Project Purpose

The purpose of Clinic Scheduler is to simplify staff scheduling workflows for smaller clinics by combining employee management, absence handling and schedule generation into one centralized web application.

The project was developed as a full-stack thesis project with focus on:

- role-based security
- schedule generation workflows
- absence-aware planning
- API protection
- maintainable full-stack architecture

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

## API Security Testing

Protected API routes were manually tested using unauthenticated requests through the terminal with `curl`.

Example verification commands:

```bash
# Employees API

curl -i http://localhost:3000/api/employees

curl -i -X POST http://localhost:3000/api/employees

curl -i -X PUT http://localhost:3000/api/employees/test-id

curl -i -X DELETE http://localhost:3000/api/employees/test-id


# Absences API

curl -i http://localhost:3000/api/absences

curl -i -X POST http://localhost:3000/api/absences

curl -i -X PUT http://localhost:3000/api/absences/test-id

curl -i -X DELETE http://localhost:3000/api/absences/test-id


# Departments API

curl -i http://localhost:3000/api/departments

curl -i -X POST http://localhost:3000/api/departments

curl -i -X PUT http://localhost:3000/api/departments/test-id

curl -i -X DELETE http://localhost:3000/api/departments/test-id


# Schedules API

curl -i http://localhost:3000/api/schedules

curl -i -X POST http://localhost:3000/api/schedules

curl -i -X PUT http://localhost:3000/api/schedules/test-id

curl -i -X DELETE http://localhost:3000/api/schedules/test-id


# Schedule Assignments API

curl -i http://localhost:3000/api/schedule-assignments

curl -i -X POST http://localhost:3000/api/schedule-assignments

curl -i -X PUT http://localhost:3000/api/schedule-assignments/test-id

curl -i -X DELETE http://localhost:3000/api/schedule-assignments/test-id


# Shift Templates API

curl -i http://localhost:3000/api/shift-templates

curl -i -X POST http://localhost:3000/api/shift-templates

curl -i -X PUT http://localhost:3000/api/shift-templates/test-id

curl -i -X DELETE http://localhost:3000/api/shift-templates/test-id


# Removed debug route

curl -i http://localhost:3000/api/test-db
```

Expected result for protected routes:

```txt
401 Unauthorized
```

Expected result for removed debug route:

```txt
404 Not Found
```

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

---

[Back to content list](#contents)

## Testing and Debugging

The application was manually tested throughout development using:

- browser-based UI testing
- role-based authorization testing
- protected API route verification
- terminal-based API security testing using curl
- build verification using `npm run build`
- validation testing for forms and protected actions

Runtime errors, validation issues and authorization problems were debugged and resolved incrementally during development.

---

[Back to content list](#contents)

## Manual Testing

Manual MVP testing checklist is available in:

```txt
docs/manual-test-checklist.md
```

## Known Limitations

- No automated test suite implemented yet
- Email delivery depends on environment configuration
- Schedule generation logic is MVP-focused and may require additional optimization for large-scale production usage

---

[Back to content list](#contents)

## Future Improvements

The current version of Clinic Scheduler focuses on the core MVP: employee management, department management, shift templates, absence handling, schedule assignments, automatic schedule generation, authentication, role-based access, API protection, and manual testing.

A future version of the application could evolve from a scheduling tool into a broader **Clinic Staff Management Platform**. The goal would be to support more of the daily administrative work around employees, schedules, absences, documents, and internal communication.

Possible future improvements include:

### Scheduling and planning

- Calendar-based schedule visualization.
- Available-employee helper when reassigning schedule assignments, filtering out absent employees, employees already assigned to overlapping shifts, and employees without the correct responsibility for the selected department.
- More flexible schedule regeneration, allowing administrators to regenerate assignments for a specific week or date instead of regenerating the whole monthly schedule. This would be useful when unexpected absences happen after the monthly schedule has already been created.
- Stronger absence conflict handling, such as warnings before saving assignments that conflict with approved absences.
- Conflict validation for overlapping absence periods.
- Calendar export for generated schedules, for example `.ics` files for Google Calendar, Apple Calendar, or Outlook.
- More advanced schedule generation rules based on workload balance, employee status, responsibilities, and fairness.
- Schedule publishing workflow where admins can work with draft schedules before publishing them to employees.
- Drag-and-drop schedule editing for faster manual adjustments.
- Recurring absences and recurring shift patterns.
- Public holiday support for Sweden.
- Shift swap requests between employees.

### Employee self-service

- Employee profile pages with role, employment type, responsibilities, status, and contact information.
- Employee overview for worked days, scheduled hours, upcoming shifts, and registered absences.
- Absence request history where employees can follow previous, pending, approved, and rejected absence requests.
- Mobile-friendly employee dashboard for checking schedules, absences, documents, and benefits from a phone.
- Email notifications for employees when absence requests are approved or rejected or when schedules are updated.

### HR and document handling

- Payslip document handling where employees can view and download their own payslips securely.
- Employee document center for contracts, policies, onboarding documents, internal instructions, payslips, benefit documents, and employee-submitted documents.
- Secure employee document upload, for example sick-leave certificates or other work-related documents that need admin review.
- Document status handling, such as submitted, reviewed, approved, or rejected.
- Access control so employees can only view their own uploaded documents, while admins can review documents relevant to their role.
- Healthcare benefits and employee benefits overview.
- Employment details such as working percentage, start date, contract information, and employment status.
- Onboarding checklist for new employees.

### Management and analytics

- Automated testing suite.
- Email queue and retry handling.
- Pagination, date filtering and lazy loading for larger clinics or longer planning periods.
- Extended filtering across employees, departments, shifts, absences and schedules.
- Performance-focused data loading strategies for high-volume assignment data.
- Improved custom error handling pages, such as 401, 403 and 404 pages.
- Reporting dashboard for schedule coverage, workload distribution, absence statistics, and staffing gaps.
- Audit log for important admin actions such as creating, updating, deleting, approving, or publishing records.
- Competence and certification tracking for employees.
- Multi-clinic or multi-location support.
- Export of reports to PDF or Excel.

These improvements were intentionally left outside the MVP scope to keep the project focused and realistic within the available timeframe. The MVP prioritizes the most important scheduling and administration flows, while the future improvements show how the system could scale into a more complete staff management platform.

## Author

```js
const author = {
  name: "Antonio-Claudio Andelic",
  role: "Full-stack JavaScript Developer Student",
  school: "Chas Academy",
};
```

---

[Back to content list](#contents)
