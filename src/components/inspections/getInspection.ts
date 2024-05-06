import { splitInspectionWithStatus } from "./splitInspectionWithStatus";

export async function getInspection(date: string = "") {
  const inspectionFetchRes = await fetch(
    (process.env.NEXTAUTH_URL || "http://localhost:3000") +
      "/api/roomReport/report",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: date || new Date().toISOString(),
      }),
    }
  );
  const inspectionFetch = await inspectionFetchRes.json();
  const { inspected, notInspected } =
    splitInspectionWithStatus(inspectionFetch);
  return { inspected, notInspected };
}
