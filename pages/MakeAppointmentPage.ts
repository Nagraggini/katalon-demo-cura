import { Locator, Page } from "@playwright/test";

export class MakeAppointmentPage {
  // Deklaráljuk a változókat és a típusukat.
  readonly page: Page;
 
  readonly heading: Locator;
  readonly facilitySelect: Locator;
  readonly hospitalReadmissionCheckbox: Locator;
  
  // Healthcare Program rádiógombok
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

  /**
   * Közvetlen navigáció az időpontfoglaló oldalra
   */
  async navigate(): Promise<void> {
    await this.page.goto('https://herokuapp.com');
  }

  /**
   * Kiválasztja a kívánt egészségügyi program rádiógombját
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
   * Teljesíti az időpontfoglalási űrlap kitöltését és beküldését
   */
  async createAppointment(details: {
    facility: string;
    hospitalReadmission: boolean;
    program: 'Medicare' | 'Medicaid' | 'None';
    visitDate: string;
    comment: string;
  }): Promise<void> {
    // 1. Dropdown opció kiválasztása (szöveg vagy érték alapján)
    await this.facilitySelect.selectOption(details.facility);
    
    // 2. Kórházi újra-felvétel checkbox kezelése
    if (details.hospitalReadmission) {
      await this.hospitalReadmissionCheckbox.check();
    } else {
      await this.hospitalReadmissionCheckbox.uncheck();
    }

    // 3. Program kiválasztása a belső segédfüggvénnyel
    await this.selectProgram(details.program);

    // 4. Dátum és megjegyzés beírása
    await this.visitDateInput.pressSequentially(details.visitDate);
    await this.commentTextArea.fill(details.comment);
    
    // 5. Beküldés gombra kattintás
    await this.bookAppointmentBtn.click();
  }
}