## Technologies Used:
- **Language:** ***JavaScript***
- **Backend:** ***Node.js*** with the ***Express*** framework for creating ***RESTful APIs***
- **Frontend:** ***React*** for building the user interface, along with ***CSS (Cascading Style Sheets)*** for styling and ***HTML*** for page structure
- **RDBMS:** ***SQLite*** with the ***Sequelize*** ORM for data manipulation

## Application Theme:
- The application facilitates communication between team members responsible for **bug tracking and management** in a software project.
- The platform is a **web application** accessible in a **desktop browser**.

### Implemented Features:
- A student can log in to the application using an **email-based account**.
- A student who is a member of a project team (**MP**) can **register a software project** to be monitored through the application, specifying the project's **repository** and **team members**.
- A student who is not part of a registered project can **join as a tester (TST)**.
- As a **TST**, a user can **report a bug** in the application. The bug includes:
  - **Severity level**
  - **Resolution priority**
  - **Description**
  - **A link to the commit** where the bug was found
- As an **MP**, a user can view **all reported bugs** for their assigned projects.
- An **MP** can **assign a bug** to be resolved. Only one MP can have a **bug assigned** at a time.
- After resolving a bug, an **MP** can **update its status**, including a **link to the commit** where the bug was fixed.
