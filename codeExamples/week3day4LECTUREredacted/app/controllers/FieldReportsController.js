import { AppState } from "../AppState.js";
import { fieldReportsService } from "../services/FieldReportsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

export class FieldReportsController {
  constructor() {
    console.log('Field reports controller loaded!');

    AppState.on('fieldReports', this.drawFieldReports)
    AppState.on('activeFieldReport', this.drawActiveFieldReport)

    // this.drawFieldReports() // no longer needed, retrieving fieldReports from local storage will trigger our listener 
    fieldReportsService.loadFieldReports()
  }

  drawFieldReports() {
    const fieldReports = AppState.fieldReports
    let fieldReportsContent = ''
    fieldReports.forEach(fieldReport => fieldReportsContent += fieldReport.ListTemplate)
    setHTML('fieldReportList', fieldReportsContent)
  }

  drawActiveFieldReport() {
    const report = AppState.activeFieldReport

    if (report == null) {
      setHTML('activeReport', '')
    }
    else {
      setHTML('activeReport', AppState.activeFieldReport.ActiveDetailsTemplate)
    }

  }

  createFieldReport() {
    try {
      event.preventDefault()
      console.log('Creating field report');
      const form = event.target
      const fieldReportFormData = getFormData(form)
      console.log('here is your data', fieldReportFormData);
      fieldReportsService.createFieldReport(fieldReportFormData)

      // @ts-ignore
      form.reset() // if there is a red squiggle here, it's okay
    } catch (error) {
      console.error('[CREATING FIELD REPORT]', error)
      window.alert(error.message)
    }
  }

  setActiveFieldReport(reportId) {
    console.log('Setting active field report with the id of', reportId);
    fieldReportsService.setActiveFieldReport(reportId)
  }

  updateReport() {
    const textAreaElem = event.target
    console.log('blurred text area', textAreaElem);

    // @ts-ignore
    const textContentFromTextArea = textAreaElem.value // it's okay if there are red squiggles here
    console.log('Text content', textContentFromTextArea);

    fieldReportsService.updateReport(textContentFromTextArea)
  }

  destroyReport() {
    const wantsToDestroy = window.confirm("Are you sure you want to delete this report forever?")

    console.log('do they want to destroy the report', wantsToDestroy);

    if (wantsToDestroy == false) {
      return
    }

    console.log('destroying this report!!!!!');

    fieldReportsService.destroyReport()


  }
}