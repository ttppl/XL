import { BASE_OPERATION as OPRT } from '../mutation-types'

const user = {
  state: () => ({
    user: {
      // eslint-disable-next-line no-undef
      userId: null
    }
  }),
  mutations: {
    [OPRT.UPDATE]: (state, user) => {
      state.user = user
    }
  },
  actions: {
    checkLoginStatus ({ commit, state }) {
      if (state.user && state.user.userId) {
        return true
      }
    }
  },
  getters: {
    getUserName: (state) => {
      return state.user.userName
    }
  }
}
export default user
