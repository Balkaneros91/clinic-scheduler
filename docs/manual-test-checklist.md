# Manual Test Checklist

## Admin flow

- [ ] Admin can log in successfully.
- [ ] Admin is redirected to the dashboard after login.
- [ ] Admin can view employees.
- [ ] Admin can create an employee.
- [ ] Admin can edit an employee.
- [ ] Admin can view departments.
- [ ] Admin can create and edit departments.
- [ ] Admin can view shift templates.
- [ ] Admin can create and edit shift templates.
- [ ] Admin can view schedules.
- [ ] Admin can view schedule assignments.

## Employee flow

- [ ] Employee can log in successfully.
- [ ] Employee does not have access to admin-only dashboard actions.
- [ ] Employee cannot directly access protected API routes.
- [ ] Employee is redirected or blocked when trying to access restricted pages.

## Absence approval

- [ ] Admin can view absence records.
- [ ] Admin can create an absence.
- [ ] Admin can edit an absence.
- [ ] Admin can delete an absence.
- [ ] Absence data is connected to the correct employee.
- [ ] Absence type is shown correctly.

## Email notification

- [ ] Absence notification email can be triggered.
- [ ] Admin notification email uses `ADMIN_NOTIFICATION_EMAIL`.
- [ ] Missing email environment variables do not crash the app unexpectedly.
- [ ] Email failures are handled safely.

## Schedule regeneration

- [ ] Admin can open a schedule.
- [ ] Admin can trigger schedule generation/regeneration.
- [ ] Generated assignments are replaced during regeneration.
- [ ] Manual assignments remain untouched during regeneration.
- [ ] Absences are respected during schedule generation.
- [ ] Regeneration result message is clear to the user.

## API security checks

- [ ] Unauthenticated `GET /api/employees` returns `401`.
- [ ] Unauthenticated `POST /api/employees` returns `401`.
- [ ] Unauthenticated `PUT /api/employees/[id]` returns `401`.
- [ ] Unauthenticated `DELETE /api/employees/[id]` returns `401`.
- [ ] Unauthenticated mutation routes for absences return `401`.
- [ ] Unauthenticated mutation routes for departments return `401`.
- [ ] Unauthenticated mutation routes for schedules return `401`.
- [ ] Unauthenticated mutation routes for schedule assignments return `401`.
- [ ] Unauthenticated mutation routes for shift templates return `401`.
- [ ] Debug route `/api/test-db` has been removed.

## Build verification

- [ ] `npm run build` completes successfully.
- [ ] No TypeScript errors.
- [ ] No blocking runtime errors during manual testing.
