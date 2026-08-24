import { Locator, Page } from "@playwright/test";

export class MakeAppointmentPage {
  // We declare the variables and their types.
  readonly page: Page;

  readonly heading: Locator;
  readonly facilitySelect: Locator;
  readonly hospitalReadmissionCheckbox: Locator;

  // Healthcare Program radiobuttons.
  readonly medicareRadio: Locator;
  readonly medicaidRadio: Locator;
  readonly noneRadio: Locator;

  readonly visitDateInput: Locator;
  readonly commentTextArea: Locator;
  readonly bookAppointmentBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Lokátorok inicializálása az id-k és szerepek alapján
    this.heading = page.getByRole('heading', { name: 'Make Appointment' });
    this.facilitySelect = page.locator('#combo_facility');
    this.hospitalReadmissionCheckbox = page.locator('#chk_hospotal_readmission');

    this.medicareRadio = page.locator('#radio_program_medicare');
    this.medicaidRadio = page.locator('#radio_program_medicaid');
    this.noneRadio = page.locator('#radio_program_none');

    this.visitDateInput = page.locator('#txt_visit_date');
    this.commentTextArea = page.locator('#txt_comment');
    this.bookAppointmentBtn = page.locator('#btn-book-appointment');
  }

  async navigate(): Promise<void> {
    await this.page.goto(
      '/#appointment'
    );
  }

  /**
   * Selects the radio button for the desired health program.
   * @param program 'Medicare' | 'Medicaid' | 'None'
   */
  private async selectProgram(program: 'Medicare' | 'Medicaid' | 'None'): Promise<void> {
    if (program === 'Medicare') {
      await this.medicareRadio.check();
    } else if (program === 'Medicaid') {
      await this.medicaidRadio.check();
    } else {
      await this.noneRadio.check();
    }
  }

  /**
   * Completes the appointment booking form and submits it.
   */
  async createAppointment(details: {
    facility: string;
    hospitalReadmission: boolean;
    program: 'Medicare' | 'Medicaid' | 'None';
    visitDate: string;
    comment: string;
  }): Promise<void> {
    // 1. Select dropdown option (based on text or value).
    await this.facilitySelect.selectOption(details.facility);

    // 2. Hospital readmission checkbox management.
    if (details.hospitalReadmission) {
      await this.hospitalReadmissionCheckbox.check();
    } else {
      await this.hospitalReadmissionCheckbox.uncheck();
    }

    // 3. Program selection with the internal auxiliary function.
    await this.selectProgram(details.program);

    // 4. Enter date and comment.
    await this.visitDateInput.pressSequentially(details.visitDate);
    await this.commentTextArea.fill(details.comment);

    // 5. Clicking the submit button.
    await this.bookAppointmentBtn.click();
  }
}