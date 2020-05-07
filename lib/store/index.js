import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const authModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
export default authModule

export const auth = (api) => {
  return {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
  }
}
