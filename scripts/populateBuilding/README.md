# Description

Add default building and room to database through API call. Note that negative floor number is converted to positive instead as a temporary solution. Please fix the frontend design of Room Pages to account for negative floor.

# Instructions

0. Ensure that you have the database set up and have npm run dev session on

1. Add `Sq_Ft_LMP.csv` to this folder
2. Add `BUILDING_DEFAULT_FILE = ./scripts/populateBuilding/Sq_Ft_LMP.csv` to .env file
3. Call POST: /api/building/addDefault using Postman or similar program
