# Manual Test Checklist

## Authentication

- [x] Login page loads successfully.
- [x] Forgot password flow opens correctly.
- [x] Reset password email can be received.
- [x] Update password form validates input.
- [x] Update password form successful.
- [x] User can log out successfully.

## Admin flow

- [x] Admin can log in successfully.
- [x] Admin is redirected to the dashboard after login.
- [x] Admin can view employees.
- [x] Admin can create an employee.
- [x] Admin can edit an employee.
- [x] Admin can delete an employee.
- [x] Admin can view departments.
- [x] Admin can create and edit departments.
- [x] Admin can delete a department.
- [x] Admin can view shift templates.
- [x] Admin can create and edit shift templates.
- [x] Admin can delete a shift template.
- [x] Admin can view schedules.
- [x] Admin can create, edit, and delete schedules.
- [x] Admin can view schedule assignments.
- [x] Admin can create, edit, and delete schedule assignments.
- [x] Admin can search/filter schedule assignments.

## Absence flow

- [x] Admin can view absence records.
- [x] Admin can create an absence.
- [x] Admin can edit an absence.
- [x] Admin can delete an absence.
- [x] Absence data is connected to the correct employee.
- [x] Absence type is shown correctly.

## Employee flow

- [x] Employee can log in successfully.
- [x] Employee does not have access to admin-only dashboard actions.
- [x] Employee cannot directly access protected API routes.
- [x] Employee is redirected or blocked when trying to access restricted pages.
- [x] Employee can view their schedules.
- [x] Employee can view their schedule assignments.
- [x] Employee can view absence records.
- [x] Employee can create an absence request.
- [x] Employee can access shared employee/admin functionality if allowed.

## Email notification

- [x] Absence notification email can be triggered.
- [x] Admin notification email uses `ADMIN_NOTIFICATION_EMAIL`.
- [x] Missing email environment variables do not crash the app unexpectedly.
- [x] Email failures are handled safely.

## Schedule regeneration

- [x] Admin can open a schedule.
- [x] Admin can trigger schedule generation/regeneration.
- [x] Generated assignments are replaced during regeneration.
- [x] Manual assignments remain untouched during regeneration.
- [x] Absences are respected during schedule generation.
- [x] Regeneration result message is clear to the user.
- [x] Approved absence conflicts are visible on schedule assignments.

## API security checks

- [x] Unauthenticated `GET /api/employees` returns `401`.
- [x] Unauthenticated `POST /api/employees` returns `401`.
- [x] Unauthenticated `PUT /api/employees/[id]` returns `401`.
- [x] Unauthenticated `DELETE /api/employees/[id]` returns `401`.
- [x] Unauthenticated mutation routes for absences return `401`.
- [x] Unauthenticated mutation routes for departments return `401`.
- [x] Unauthenticated mutation routes for schedules return `401`.
- [x] Unauthenticated mutation routes for schedule assignments return `401`.
- [x] Unauthenticated mutation routes for shift templates return `401`.
- [x] Unauthenticated `GET` routes for all API resources return `401`.
- [x] Employee role cannot access admin-only API routes.
- [x] Debug route `/api/test-db` has been removed.

## Build verification

- [x] `npm run build` completes successfully.
- [x] No TypeScript errors.
- [x] No blocking runtime errors during manual testing.
