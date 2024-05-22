import { AppState } from "../AppState.js"
import { Cultist } from "../models/Cultist.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CultMembersService {

  async destroyCultMember(cultMemberId) {
    const res = await api.delete(`api/cultMembers/${cultMemberId}`)
    logger.log('DESTROYED CULT MEMBER ❌🧙‍♂️', res.data)
    const cultistIndex = AppState.cultists.findIndex(cultist => cultist.cultMemberId == cultMemberId)

    if (cultistIndex == -1) {
      throw new Error("You probably messed up your findIndex, bud")
    }

    AppState.cultists.splice(cultistIndex, 1)
  }
  async createCultMember(cultId) {
    const cultMemberData = { cultId: cultId } // {cultId: 5}
    const res = await api.post('api/cultMembers', cultMemberData)
    logger.log('CREATED CULT MEMBER ✨🧙', res.data)
    AppState.cultists.push(new Cultist(res.data))
  }
  async getCultistsByCultId(cultId) {
    AppState.cultists.length = 0 // empties array, same as: AppState.cultists = []
    const res = await api.get(`api/cults/${cultId}/cultMembers`)
    logger.log('GOT CULTISTS 🧙‍♂️🧙', res.data)
    AppState.cultists = res.data.map(pojo => new Cultist(pojo))
  }
}

export const cultMembersService = new CultMembersService()