import { AppState } from "../AppState.js"
import { Project } from "../models/Project.js"
import { api } from "./AxiosService.js"

class ProjectsService {
  async getProfileProjects(profileId) {
    AppState.profileProjects = []
    const response = await api.get(`api/projects?creatorId=${profileId}`)
    console.log('🧑‍🎨🖼️', response.data)
    const projects = response.data.map(project => new Project(project))
    // AppState.projects = projects it would be best to have a separate array
    AppState.profileProjects = projects
  }
  async getProjects() {
    const response = await api.get('api/projects')
    console.log('🖼️', response.data)
    const projects = response.data.map(project => new Project(project))
    AppState.projects = projects
  }

}

export const projectsService = new ProjectsService()
