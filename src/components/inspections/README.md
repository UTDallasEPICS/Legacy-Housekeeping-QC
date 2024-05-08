# Inspection Management

This system provides functionalities for managing inspections, including displaying inspections, generating new inspections, and conducting inspections.

## Features

### Inspection Grid

The Inspection Grid displays the list of all inspections, separating them into Completed and Remaining. Each inspection card contains the following information:

- Location of the room
- Team member in charge of cleaning the room

The card is responsive on all screen sizes and is reusable for the Homepage.

### Inspection Planner

The Inspection Planner allows users to generate new inspections on the fly. It takes a list of team members, a room, the cleaning type to create a new inspection.

### Inspection Maker

The Inspection Maker allows users to check and uncheck various items inside a room based on their cleanliness. It also allows users to add comments, images, and remove or add items. A completed inspection does not allow users to edit the form.

## Folder Structure

- `Grid`: Contains functionalities related to the Inspection Grid.
- `Planner`: Contains functionalities related to the Inspection Planner.
- `Reports`: Contains functionalities related to Inspection Maker.
