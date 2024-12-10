# Project Overview 

The Legacy Senior Communities is committed to providing a clean environment to all residents and guests. To achieve this goal, housekeeping checkups are performed. Currently, the process is completely manual, and no data is saved. 

This Housekeeping Quality Control Web App aims to convert manual, paper-based processes into an automated, digital experience to significantly increase the efficiency, accuracy, and organization of housekeeping QC processes at The Legacy’s Midtown Park community in North Dallas. 

# Project Requirements


## Functional Requirements

### 1. Login Page  
   1. User login  
      1.1. Authentication process (Auth0)
      1.2. Sign-up to create new Accounts
      1.3. Log-in to Login to main dashboard  

### 2. Admin Dashboard  
   1. System overview  
   2. User management  
      2.1. View Performance Insights of members **(TODO)**
      2.2. View Completed/Remaining inspections **(TODO)**

### 3. Team Members Page  
   1. Create team members  
   2. Edit team members  
      2.1. Update profile information  
      2.2. Delete a Member  
   3. View team member details  
      3.1. Search for Team members  
      3.2. View Details like name, phone number, email  

### 4. Performance Page  
   1. Display performance metrics of individual team members  
   2. Generate Graphs  
      2.1. Calculate Average score based on completed inspection tasks  
      2.2. Print performance data  

### 5. Inspection Page  
   1. Create inspection reports 
      1.1. Assign team members
      1.2. Assign members to a room (floor and building)
      1.3. Select dat of inspection using calendar
   2. Comprehensive checklist  
      2.1. inspection items based on criteria (General, Bathroom, Dusting, other)  
      2.2. Deep/Normal cleaning options  
      2.3. Comments on Inspection
      2.4. Extra score (negatove or positve)
      2.5. Image upload and retrieval through AWS
      2.6 Remove items from checklist if needed
   3. Scoring system  
      3.1. Point deduction mechanism  
      3.2. Weighted scoring    

### 6. Rooms Page  
   1. Automatic building population (from .csv)
   2. Building management  
      2.1. Edit building details  
      2.2. Delete buildings  
      2.3. Create new buildings manually
   3. Room management  
      3.1. Create rooms  
      3.2. Edit room details
      3.3. Delete room  

## Non-Functional Requirements and Capabilities

### 1. Technical Infrastructure  
   1. Image management  
      1.1. AWS upload system
      1.2. Image retrieval  
   2. System performance  
      2.1. Consistent loading bar  
      2.2. Responsiveness  

### 2. Data Visualization  
   1. Graph generation  
      1.1. Performance analysis
      1.2. Printing the Performance report  

### 3. User Interface  
   1. Design specifications  
      1.1. Color scheme  
      1.2. Navigation consistency  
   2. Building Filtering options (for searching)  
      2.1. Common area filters  
      2.2. Personal room filters  

### 4. Communication  
   1. Team communication  
      1.1. Messaging system  
      1.2. Notification mechanisms  
   2. Reporting tools  
      2.1. Inspection report sharing  
      2.2. Performance report distribution   

# Third Party Integrations
## Auth0
- Auth0 provides robust user authentication and authorization services. 
- It integrates seamlessly to manage user login, sign-up, and logout processes. 
- Auth0 secures API routes by ensuring that only authenticated users can access protected endpoints.

# Tech Stack
#### Frontend and Backend: Next.js (Typescript)
### Database: MySQL
### Database Connector: Prisma
### API Testing: Postman

# Deployment Notes

App will most likey be deployed on AWS, on the project partner side.

# Project Setup

1. Install Node.js on your machine
2. Download and install MySQL Workbench and set up a new connection to a server local to your machine. Initialize a new database on this server using SQL syntax.
3. Clone the Github Repo to your local machine.
   ```bash
   git clone https://github.com/UTDallasEPICS/Legacy-Housekeeping-QC.git
   ```
4. Create a .env file in the root directory of the local rep that contains the following information:
   ```bash
   DATABASE_URL="mysql://user:password@host:port/DATABASE"
   NEXT_PUBLIC_PRISMA_URL="mysql://user:password@host:port/DATABASE"
   NEXTAUTH_URL="http://host:port"
   NEXTAUTH_SECRET="base64secret"
   ```
   Use the following command to generate a base64 secret for the NEXTAUTH_SECRET field. 
   ```bash
   openssl rand -base64 32
   ```
5. Install necessary project dependencies from the root directory.
   ```bash
   npm install
   ```
6. Migrate the Prisma scheme contained in the repo to your database. Use the same command upon any changes to the schema to update your local database.
    ```bash
    npx prisma migrate dev
    ```
7. Run the local development server. 
   ```bash
    npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the web app



# More About Our Project
[https://sites.utdallas.edu/epics-legacy-quality-control/](https://sites.utdallas.edu/epics-legacy-quality-control/)




