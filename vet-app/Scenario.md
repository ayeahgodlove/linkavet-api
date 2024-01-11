<!-- # Gherkin Laugage -->
<!-- “Given-When-Then” -->

- **Given** represents the context of the scenario. In what type of situation would this scenario arise?
- **When** represents the user interaction or behavior. What does the user need to do for this scenario to come into play? Ideally, you should narrow this down to one action per scenario.
- **Then** represents the expected outcomes of the scenario. What should happen when the user performs this specific action in this specific content?

1. Category
***Scenario***: User can click on a Category table row to see its details
- **Given** the list of categories has been loaded and displayed on a table
- **When** user clicks on table row for a category
- **Then** the router redirects to a details page with Category Details and "Edit Button"