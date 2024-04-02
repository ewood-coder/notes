import { generateId } from "../utils/GenerateId.js"

export class FieldReport {
  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.threatLevel = data.threatLevel
    this.body = data.body || ''
    this.author = data.author
    // this.createdAt = new Date() // always pulls new date, even if a different date is stored in local storage
    this.createdAt = data.createdAt == undefined ? new Date() : new Date(data.createdAt)
    this.lastViewed = data.lastViewed == undefined ? new Date() : new Date(data.lastViewed)
    this.securityLevel = data.securityLevel
  }

  get ListTemplate() {
    return `
    <div onclick="app.FieldReportsController.setActiveFieldReport('${this.id}')" class="col-12 selectable" role="button">
      <div class="d-flex gap-4 fs-3">
        <p>${this.title}</p>
        <p>${this.securityLevel}</p>
        <p>${this.CreatedDate}</p>
      </div>
    </div>
    `
  }

  get ActiveDetailsTemplate() {
    return `
    <div class="col-8">
      <h1>${this.title}</h1>
      <h2>Reported by ${this.author} on ${this.CreatedDate} ${this.CreatedTime}</h2>
      <h2>Last viewed ${this.LastViewedDateAndTime}</h2>
      <h2 style="color: ${this.threatLevel};">${this.securityLevel}</h2>
      <div>
      <label for="reportBody">Report Body</label>
      <textarea onblur="app.FieldReportsController.updateReport()" name="body" id="reportBody">${this.body}</textarea>
      </div>
      <div class="text-end">
        <button onclick="app.FieldReportsController.destroyReport()" type="button">
          Delete ${this.title} Report
        </button>
      </div>
    </div>
    `
  }

  get CreatedDate() {
    return this.createdAt.toLocaleDateString()
  }

  get CreatedTime() {
    return this.createdAt.toLocaleTimeString()
  }

  get LastViewedDateAndTime() {
    return this.lastViewed.toLocaleString()
  }
}