# **Legacy QC Management System**


##  Project Description

The Legacy Senior Communities is committed to providing a clean environment to all residents and guests. To achieve this goal, housekeeping checkups are performed. Currently, the process is completely manual, and no data is saved. Therefore, we are tasked to fulfill the semester goal of creating the basis for a housekeeping check-up application. 

Specifically, we need to design and develop an internal housekeeping quality control (QC) enterprise web application to convert manual, paper-based processes into an automated, digital experience—to significantly increase the efficiency, accuracy, and organization of housekeeping QC processes at The Legacy’s Midtown Park community in North Dallas.


# Requirements

## Functional Requirements

### 1. General Requirements

1. The mobile web app shall facilitate quality checks on cleaned rooms by housekeeping leaders.

2. The app must systematically track individual housekeeping team member' performance since the start of their employment, aimed for use in performance reviews.

3. The general users of the web app shall be the housekeeping management team.

4. A signup and login system shall be in place for expansion of the management team.

### 2. Housekeeping Quality Control Job Report

1. Users should be able to select, sort, and filter a list of cleaning jobs that need quality control.

2. Users must be able to mark completed and incomplete tasks for each cleaning job.

3. Users must be able to mark if a room is missing or has a late housekeeper.

4. Users should be able to submit pictures for proof within the housekeeping quality control job report.

5. A cleaning score for each job, calculated based on the percentage of completion from a provided rubric, should be recorded and reported for each cleaning of a housekeeping team member.

6. Users should be able to sort and filter the rubric.

7. Users should complete reports within the Evaluate page.

8. The form should display relevant information, including date, room details, team members, and cleaning job type (Daily or Detailed/Yearly).

9. A predefined list of requirements should be provided based on room type and cleaning job requirements. For items that do not need to be cleaned during every job, such as items that only
need to be checked weekly or monthly, they should only appear on the list when these items are required to be checked.

10. Users can add or remove requirements as needed and provide additional inputs such as notes and comments.

11. Once submitted, the report should not be editable by the user.

12. Users should be able to print out the requirement list for the room to be distributed to a team member

### 3. Performace Report

1. The app must generate dynamic and interactive performance reports for each housekeeping team member.

2. Users should be able to identify team members who are excelling or underperforming in their cleaning jobs.

3. Users should be able to select housekeeping team members to view their performance data and organize to identify patterns/tendencies (e.g., housekeeping team members consistently miss specific items that need to be cleaned).

4. The web app shall show a chart displaying team members’ cleaning scores for the past three months by default and the ability to select a time range.

5. Users shall be able to sign reports to indicate completed interventions digitally.

6. Users should be able to print reports.

7. The app should store performance data for up to one year. 3.8 Users can digitally sign reports to indicate intervention, if needed, has been completed.

### 4. Room Management

1. Users shall be able to add more room categories.

2. Users shall adjust room categories depending on the resident.

3. Users should manage requirements for each room.

4. Users shall be able to write notes for each room.

5. Users should be able to create/update/delete buildings, floors, and rooms.

### 5. Task Management

1. Users shall be able to assign team members to rooms to create a schedule for the team members.

2. Users should be able to drag housekeepers' icons to rooms to create schedules.

3. Task assignment should separate common areas and rooms.

4. Users should be able to print the team members' schedules out in the correct format.

### 6. Staff Managemnet

1. Users should be able to create/read/update/delete team members under their management.

2. All users should share the same pool of users

## Non-Functional/Capabilities

### 1. User Expoerience and Design

1. The app's user experience should align with The Legacy Senior Communities’ brand standards, which can be seen on Legacy’s Landing Page.

2. The user interface should resemble or follow Salesforce’s Lightning Design System.

3. Provide a simple and intuitive interface for users with basic levels of technological proficiency.

4. Users and leaders should be able to customize settings to meet their unique needs and preferences.

### 2. Multilingual Support

1. The app should support multiple languages

2. The printed schedules, requirement lists, and reports should support multiple languages.

### 3. Performance

1. The app should provide efficient response times for users during quality checks and data input.

2. The app should provide real-time updates on the status of housekeeping tasks, such as when a quality control checkup has been completed.

### 4. Reliability

1. The system must maintain high reliability with minimal downtime.

### 5. Compatibility

1. Ensure compatibility with major web browsers, mobile devices, and tablets.

### 6. Maintainability

1. The codebase should be well-documented to facilitate easy maintenance and updates.

### 8. Security

1. The app should have privacy and security measures in place to protect information

### 9. Cloud Hosting

1. The web app should be hosted on cloud services

<br>
<br>
<br>

# Setup

1. **[Install](https://nodejs.org/en/download/prebuilt-installer/current) Node.js on your machine**

<br>
<br>

2. **[Download](https://www.mysql.com/downloads/) and install MySQL Workbench and set up a new local server onto your machine. (SQL Workbench guides you through the set up process)**

<br>
<br>

3. **[Download](https://www.mysql.com/downloads/) the MySQL Shell in order to run queries on the locally hosted database.**

<br>
<br>

4. **Run the following command in the terminal**

    ```sh
        sqlsh -u <USERNAME>
    ```

<br>
<br>

5. **Run the following command in the MySQL Shell to connect to the database**

    ```sh
         \connect <USERNAME>@localhost:<PORT>/<DATABASE>
    ```
    - `USERNAME` is the account that was setup to access the database
    - `PORT` is the value set during database setup
    - `DATABASE` is the name given to the database during setup

<br>
<br>

6. **Clone the Github Repo to your local machine.**

   ```bash
   git clone https://github.com/UTDallasEPICS/Legacy-Housekeeping-QC.git
   ```

<br>
<br>

7. **Create a .env file in the root directory of the local rep that contains the following information:**

   ```bash
   DATABASE_URL="mysql://<USERNAME>:<PASSWORD>@<DB_HOST>:<DB_PORT>/<DATABASE>"
   NEXT_PUBLIC_PRISMA_URL="mysql://<USERNAME>:<PASSWORD>@<DB_HOST>:<DB_PORT>/<DATABASE>"
   NEXTAUTH_URL="http://<S_HOST>:<S_PORT>"
   NEXTAUTH_SECRET="<BASE64SECRET>"
   ```
    - `USERNAME`: The username credentials required to connect to the database
    - `PASSWORD`: The password credentials required to connect to the database
    - `DB_HOST`: The IP of the MySQL database running on the machine
    - `DB_PORT`: The port of the MySQL database running on the machine
    - `S_HOST`: The IP of the next server running on the machine
    - `S_PORT`: The port of the next server running on the machine
    - `BASE64SECRET`: Secret used for security (more information below)

        Use the following command to generate a base64 secret for the NEXTAUTH_SECRET field. 
        ```bash
            openssl rand -base64 32
        ```
        *requires openssl installation and environment setup*

<br>
<br>

8. **Install necessary project dependencies from the root directory.**

   ```bash
   npm install
   ```
    *Will install dependencies into the node_modules folder, full list of dependencies can be viewed in the package.json file*

<br>
<br>

9. **Migrate the Prisma scheme contained in the repo to your database. Use the same command upon any changes to the schema to update your local database.**

    ```bash
    npx prisma migrate dev
    ```
<br>
<br>

10. **Run the local development server.**

    ```bash
    npm run dev
    ```

<br>
<br>

11. **Open the following URL in the web browser to view the web app**

      ```
      http://<S_HOST>:<S_PORT> 
      ```

