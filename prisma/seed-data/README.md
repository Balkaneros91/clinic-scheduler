# Clinic Scheduler seed JSON

Generated from the uploaded Excel files.

## Files
- employees.json: 50 employees
- responsibilities.json: 31 competency/work responsibility names from Ansvarsområden 2023
- employee-responsibilities.json: 406 employee-to-responsibility mappings
- work-areas.json: 303 unique actual schedule placements from Daglig verksamhet 2026
- historical-schedule-assignments.json: 7277 historical work assignments
- historical-absences.json: 3497 historical absence rows
- absence-types.json: normalized absence labels
- clinic-seed-data.json: all of the above in one file

## Marker mapping from matrix
- `1` = level 5, confirmed
- `x` / `X` = level 4, confirmed
- `?` = level 2, needs validation
- `Lära sig` = level 1, learning

Important: the workbook sheets are labelled 2026, but the actual date cells currently contain 2025 dates. I preserved the Excel cell values exactly instead of guessing.
