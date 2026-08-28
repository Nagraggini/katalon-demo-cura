import * as XLSX from "xlsx";
import { Appointment } from "../models/Appointment";

export class ExcelReader {
  static readAppointments(filePath: string, sheetName: string): Appointment[] {
    // Open the Excel workbook.
    const workbook = XLSX.readFile(filePath);

    // Select the required worksheet.
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      throw new Error("Appointments worksheet was not found.");
    }

    // Convert the worksheet into a two-dimensional array.
    const rows = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
      header: 1, // Returns each row as an array.
      defval: "", // If an Excel cell is empty, its value should be empty text.
    });

    // Create an empty list for the appointment objects.
    const appointmentList: Appointment[] = [];

    // Start from index 1 because index 0 contains the column names.
    for (let index = 1; index < rows.length; index++) {
      const row = rows[index];

      // Skip completely empty rows.
      if (row.every((cell) => cell === "")) {
        continue;
      }

      const appointment: Appointment = {
        facility: String(row[0]).trim(),

        hospitalReadmission: ExcelReader.convertToBoolean(row[1]),

        healthcareProgram: ExcelReader.convertToProgram(row[2]),

        visitDate: String(row[3]).trim(),

        comment: String(row[4]).trim(),
      };

      // Add the appointment object to the list.
      appointmentList.push(appointment);
    }

    return appointmentList;
  }

  private static convertToBoolean(value: unknown): boolean {
    if (typeof value === "boolean") {
      return value;
    }

    const normalizedValue = String(value).trim().toLowerCase();

    if (
      normalizedValue === "true" ||
      normalizedValue === "1" ||
      normalizedValue === "yes"
    ) {
      return true;
    }

    if (
      normalizedValue === "false" ||
      normalizedValue === "0" ||
      normalizedValue === "no"
    ) {
      return false;
    }

    throw new Error(`Invalid hospitalReadmission value: ${value}`);
  }

  private static convertToProgram(
    value: unknown,
  ): "Medicare" | "Medicaid" | "None" {
    const program = String(value).trim();

    if (
      program === "Medicare" ||
      program === "Medicaid" ||
      program === "None"
    ) {
      return program;
    }

    throw new Error(`Invalid healthcare program: ${value}`);
  }
}
