# Improvements to the codebase/app

### Bugs

- Date needs to be formatted correctly on the frontend
- No error handling on the frontend for adding an insight
- No delete confirmation modal

### Code Health

- Move SQL queries to an individual file
- Implement additional error handling and safety in API calls - could use a
  library to type check this
- Function names for each of the insight functions instead of defining them in
  main.ts
- Frontend schema and backend schema were not matching and should match

### Scaling the codebase

- Comprehensive testing - integration, visual regression tests
- Restructure files and things mentioned in code health, reusing
  code/componentization
- Better documentation across different parts of the code, especially as we
  start making more components and modules
- Adding pipelines - automatically run tests, check style and compilations
- Containerisation

### Notes

Run tests with `deno test --allow-env --allow-read --allow-ffi` in `/server`
