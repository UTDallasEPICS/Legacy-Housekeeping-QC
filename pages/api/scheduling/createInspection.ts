import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { validate as isUuid } from "uuid"; // Add this to validate UUID format

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    if (req.method === "POST") {
      const { schedule_id, rubric_id, inspector_id } = req.body;

      // Normalize the inspector_id
      let normalizedInspectorId;
      if (typeof inspector_id === "string" && inspector_id.includes("|")) {
        // Auth0 ID: Extract unique part after the pipe
        normalizedInspectorId = inspector_id.split("|")[1];
      } else if (!isNaN(Number(inspector_id))) {
        // NextAuth ID: Convert numeric ID to string
        normalizedInspectorId = String(inspector_id);
      } else if (typeof inspector_id === "string" && isUuid(inspector_id)) {
        // UUID: Use directly as it is already valid
        normalizedInspectorId = inspector_id;
      } else {
        throw new Error("Invalid inspector_id format");
      }

      // Check if the Person exists
      let person = await prisma.person.findUnique({
        where: { id: normalizedInspectorId },
      });

      if (!person) {
        // Create Person if not found
        person = await prisma.person.create({
          data: {
            id: normalizedInspectorId,
            first_name: "Default First Name",  // Add the actual first name if available
            last_name: "Default Last Name",    // Add the actual last name if available
            type: "USER",                      // Adjust to your `PersonType`
            // Add any other required fields here
          },
        });
      }

      // Check if the User exists for this Person
      let user = await prisma.user.findUnique({
        where: { person_id: normalizedInspectorId },
      });

      if (!user) {
        // Create User if not found
        user = await prisma.user.create({
          data: {
            person_id: normalizedInspectorId,
            email: "default@example.com", // Replace with actual email if available
            password: "hashedPassword",   // Replace with actual hashed password
            // Add other required fields if necessary
          },
        });
      }

      // Create the Inspection record
      let inspection;
      await prisma.$transaction(async (prisma) => {
        inspection = await prisma.inspection.create({
          data: {
            inspector: {
              connect: {
                person_id: normalizedInspectorId, // Use the existing or created User
              },
            },
            schedule: { connect: { id: Number(schedule_id) } },
            rubric: { connect: { id: Number(rubric_id) } },
            inspect_status: "NOT_INSPECTED",
          },
        });
      });

      res.status(200).json(inspection);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error during inspection creation:", error);
    res.status(500).json({ error: `${error} : Error creating room report` });
  }

}
