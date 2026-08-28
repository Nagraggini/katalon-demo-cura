export interface Appointment {
  visitDate: string;
  facility: string;
  hospitalReadmission: boolean;
  healthcareProgram: "Medicare" | "Medicaid" | "None";
  comment: string;
}
