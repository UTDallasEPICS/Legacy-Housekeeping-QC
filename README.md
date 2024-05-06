## Project Overview 

The Legacy Senior Communities is committed to providing a clean environment to all residents and guests. To achieve this goal, housekeeping checkups are performed. Currently, the process is completely manual, and no data is saved. 

This Housekeeping Quality Control Web App aims to convert manual, paper-based processes into an automated, digital experience to significantly increase the efficiency, accuracy, and organization of housekeeping QC processes at The Legacy’s Midtown Park community in North Dallas. 

## Project Setup

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



## More About Our Project
[https://sites.utdallas.edu/epics-legacy-quality-control/](https://sites.utdallas.edu/epics-legacy-quality-control/)




