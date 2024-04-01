import { AppState } from "../AppState.js";
import { FieldReport } from "../models/FieldReport.js"
import { loadState, saveState } from "../utils/Store.js";

class FieldReportsService {



  createFieldReport(fieldReportFormData) {
    const newFieldReport = new FieldReport(fieldReportFormData)
    // console.log('Fancy new report', newFieldReport);
    AppState.fieldReports.push(newFieldReport)
    // console.log('Field reports in appstate', AppState.fieldReports);
    this.saveFieldReports()
  }

  setActiveFieldReport(reportId) {
    const foundReport = AppState.fieldReports.find(fieldReport => fieldReport.id == reportId)
    console.log('found a report', foundReport);

    foundReport.lastViewed = new Date()
    this.saveFieldReports()

    AppState.activeFieldReport = foundReport
  }

  updateReport(newReportBody) {
    const report = AppState.activeFieldReport

    report.body = newReportBody
    console.log('did the active report change?', report); // yes
    console.log('did the correct one in the array change?', AppState.fieldReports); // also yes

    this.saveFieldReports()
  }



  destroyReport() {
    const reportId = AppState.activeFieldReport.id
    console.log('report id', reportId);

    AppState.activeFieldReport = null

    const indexOfReportToRemove = AppState.fieldReports.findIndex(report => report.id == reportId)

    if (indexOfReportToRemove == -1) {
      console.error("Find Index is messed up dawg");
      return
    }

    AppState.fieldReports.splice(indexOfReportToRemove, 1)

    this.saveFieldReports()
  }

  saveFieldReports() {
    saveState('fieldReports', AppState.fieldReports)
  }

  loadFieldReports() {
    const fieldReportsFromLocalStorage = loadState('fieldReports', [FieldReport])
    AppState.fieldReports = fieldReportsFromLocalStorage
  }


}

export const fieldReportsService = new FieldReportsService()