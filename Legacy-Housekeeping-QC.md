<style>

    ul {

        color: red;

    }

    p, ol {

        color: rgb(200, 250, 250);

    }

    h1 { 

        color: white;

    }

    ol {

        background: rgba(0, 0, 0, 0.35);
        padding: 30px;
        border-radius: 10px;

    }

</style>


![DID NOT LOAD](./embed.svg)

# **Legacy QC Management System**


##  Project Description

The Legacy Senior Communities is committed to providing a clean environment to all residents and guests. To achieve this goal, housekeeping checkups are performed. Currently, the process is completely manual, and no data is saved. Therefore, we are tasked to fulfill the semester goal of creating the basis for a housekeeping check-up application. 

Specifically, we need to design and develop an internal housekeeping quality control (QC) enterprise web application to convert manual, paper-based processes into an automated, digital experience—to significantly increase the efficiency, accuracy, and organization of housekeeping QC processes at The Legacy’s Midtown Park community in North Dallas.

# Requirements

### ISSUES

1. Adding a team member fails upon execution: error with parsing the phone number properly if the user does not include a country_code

2. Empty Data on landing page: In the today's inspection panel, the clickable elements don't respond. Furthermore, the data seems to be hard-coded into the page as they don't update with changes to the database or exist upon queries.

3. The inspections page throws error when selecting to show REMAINING inspections: error mentions setting a read only variable. **AFTER FURTHER TESTING IT SEEMS TO BREAK WHEN THE DATABASE HAS MORE THAN ONE INSPECTION**

4. The inspections page throws error when more than one inspection is classified as INSPECTED in the database: displays the same error as the one in #3.

5. The Inspections page does not render the current completed inspections created in the database upon creation or reloading (set directly through database since there was no way to access the inspections)

6. Schedule page currently seems to have dummy data in place and is not linked to the functionailty of the rest of the application. 

7. There seems to be exceedingly long load times for first access of pages and updates to the database (likely due to lazy loading). 

## Functional Requirements

### 1. General Requirements


1. The mobile web app shall facilitate quality checks on cleaned rooms by housekeeping leaders.

> There exists a sign-up process, but there are errors which cause accessing the data to fail at various points of the CRUD process. Therefore, needs to be thoroughly tested for edge cases. 


2. The app must systematically track individual housekeeping team member' performance since the start of their employment, aimed for use in performance reviews.

> Team member performance is tracked based on review. (Currently there are conditions that I have to follow to make the web app not crash, so may still need testing in the future). 

3. The general users of the web app shall be the housekeeping management team.

> There is an authentication process in order to satisfy this requirement.

4. A signup and login system shall be in place for expansion of the management team.

> There is a sign-up system in place in terms of functionality; however, the UI styling is incomplete for the Sign Up \<a> tag and is using default styles.

### 2. Housekeeping Quality Control Job Report

1. Users should be able to select, sort, and filter a list of cleaning jobs that need quality control.

> I believe this is the inspections tab and there are options to select, sort, and filter implemented; however, due to an error with multiple inspections in the database, this was not testable.

2. Users must be able to mark completed and incomplete tasks for each cleaning job.

>  I did not see any feature which allowed the cleaners to mark their inspections as completed or incomplete (This may be a feature of a member specific signin that I am not aware of)

3. Users must be able to mark if a room is missing or has a late housekeeper.

> No proof this functionality exists

4. Users should be able to submit pictures for proof within the housekeeping quality control job report.

> I believe the cleaner side of this application is not yet developed. I am a little confused as the inspection has the ability to upload a photo.

5. A cleaning score for each job, calculated based on the percentage of completion from a provided rubric, should be recorded and reported for each cleaning of a housekeeping team member.

> Upon inspection report completion a score is calculated and given to the housekeeping team member which is viewable in the performance tab.

6. Users should be able to sort and filter the rubric.

> There does exist the ability to edit the values in the rubric, but there is nothing related to sorting. 

7. Users should complete reports within the Evaluate page.

> There is no evaluate page, is this referring to the inspections page?

8. The form should display relevant information, including date, room details, team members, and cleaning job type (Daily or Detailed/Yearly).

> The inspection form does display this information below the `Inspection Report` header; however, there is no mention of date or job type. 

9. A predefined list of requirements should be provided based on room type and cleaning job requirements. For items that do not need to be cleaned during every job, such as items that only
need to be checked weekly or monthly, they should only appear on the list when these items are required to be checked.

> This does not seem to be implemented. 

10. Users can add or remove requirements as needed and provide additional inputs such as notes and comments.

> This is seen in the inspection report. 

11. Once submitted, the report should not be editable by the user.

> The report is not editable by the user after submission (observe only).

12. Users should be able to print out the requirement list for the room to be distributed to a team member

> This feature does seem to be implemented

### 3. Performace Report

1. The app must generate dynamic and interactive performance reports for each housekeeping team member.

> The dynamic reports are generated; however, upon creation of second completed report the web app crashes. 

2. Users should be able to identify team members who are excelling or underperforming in their cleaning jobs.

> All team members are displayed in the performance tab along with their information. However, I may be misinterpreting this requirement which is actually about implementing a leaderboard; there is none. 

3. Users should be able to select housekeeping team members to view their performance data and organize to identify patterns/tendencies (e.g., housekeeping team members consistently miss specific items that need to be cleaned).

> There does not seem to be an implementation of this in the performance tab to filter based on the conditions mentioned above.

4. The web app shall show a chart displaying team members’ cleaning scores for the past three months by default and the ability to select a time range.

> There does exist a chart for each member that displays there previous scores; however, there is no method of selecting a time frame.

5. Users shall be able to sign reports to indicate completed interventions digitally.

> This feature does not seem to be implemented.

6. Users should be able to print reports.

> This feature does not seem to be implemented

7. The app should store performance data for up to one year. 3.8 Users can digitally sign reports to indicate intervention, if needed, has been completed.

> This feature has not been tested and there does not seem to be any feature for signing reports. 

### 4. Room Management

1. Users shall be able to add more room categories.

> This feature does not seem to be implemented

2. Users shall adjust room categories depending on the resident.

> Users are allowed to edit the category of rooms

3. Users should manage requirements for each room.

> This feature does not seem to be implemented and only exists on the inspection report side of the web app. 

4. Users shall be able to write notes for each room.

> This feature does not seem to be implemented

5. Users should be able to create/update/delete buildings, floors, and rooms.

> Users are allowed to do all of the following actions. However, a alert() is used in editing a building which should most likely be changed.

### 5. Task Management

1. Users shall be able to assign team members to rooms to create a schedule for the team members.

> This feature's UI is developed, but has not yet been integrated in to the web application.

2. Users should be able to drag housekeepers' icons to rooms to create schedules.

> This feature does not seem to be implemented

3. Task assignment should separate common areas and rooms.

> This feature does not seem to be implementd; however, this option does exist in the room page. 

4. Users should be able to print the team members' schedules out in the correct format.

> This feature does not seem to be implemented.

### 6. Staff Managemnet

1. Users should be able to create/read/update/delete team members under their management.

> This feature is implemented in the team members page; however, there is an error that causes the program to crash upon improper parsing of the telephone input.

2. All users should share the same pool of users

> Unclear of this requirement, requires further clarification. 

## Non-Functional/Capabilities

### 1. User Expoerience and Design

1. The app's user experience should align with The Legacy Senior Communities’ brand standards, which can be seen on Legacy’s Landing Page.

> I was not able to find the referred guidelines

2. The user interface should resemble or follow Salesforce’s Lightning Design System.

> This requirement is generally true for the pages appearance

3. Provide a simple and intuitive interface for users with basic levels of technological proficiency.

> The user interface is very easy and intuitive.

4. Users and leaders should be able to customize settings to meet their unique needs and preferences.

> There currently are no settings in the application.

### 2. Multilingual Support

1. The app should support multiple languages

> There is no support for multiple languages (may change this to bilingual or a more limited number)

2. The printed schedules, requirement lists, and reports should support multiple languages.

> There is no support for printing currently. 

### 3. Performance

1. The app should provide efficient response times for users during quality checks and data input.

> There are significant lags at various points of start-up and updating.

2. The app should provide real-time updates on the status of housekeeping tasks, such as when a quality control checkup has been completed.

> Current crashes to the inspection system have made this difficult to test. 

### 4. Reliability

1. The system must maintain high reliability with minimal downtime.

> Frequent crashes due to runtime errors. 

### 5. Compatibility

1. Ensure compatibility with major web browsers, mobile devices, and tablets.

> Tested with edge, firefox, & chrome and the web app seems to function consistently throughout the various web browsers. I tested on mobile devices, iPhone and iPad, as well and there are slight cut offs in the UI.
> - The schedules page does not seem to load properly on iPhone 

### 6. Maintainability

1. The codebase should be well-documented to facilitate easy maintenance and updates.

> There does exist markdown documents for subdirectories to explain the code; however, there code files with no comments within them. 

### 8. Security

1. The app should have privacy and security measures in place to protect information

> Passwords are stored using encryption upon query in the database. 

### 9. Cloud Hosting

1. The web app should be hosted on cloud services

> The web app is hostable from my laptop machine and accessible from external devices. 

<br>
<br>
<br>

# Setup

## Changes

- Changed inspections: Inspection[] => inspections: any

**SOLUTION**

`toSorted()` is not a esnext function, change to `sort()`.

> In order to fix docker issues (new next issues arised) in trying to compile image.

> REVERT CHANGES TO tsconfig.json and sortInspection.ts

