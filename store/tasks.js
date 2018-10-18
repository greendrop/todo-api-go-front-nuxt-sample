import apiUrl from '~/lib/api-url'
import changeCaseObject from '~/lib/change-case-object'

export const state = () => ({
  tasks: [],
  task: null
})

export const actions = {
  async getTasks({ state, commit }, params = {}) {
    const url = `${apiUrl.getWpApiBaseUrl()}/tasks`
    const response = await this.$axios
      .get(url, { params: params })
      .then(response => {
        return {
          tasks: changeCaseObject.camelCase(response.data)
        }
      })
      .catch(() => {
        return {
          tasks: state.tasks
        }
      })
    commit('setTasks', response.tasks)
  },
  async getTaskById({ commit }, id) {
    const url = `${apiUrl.getWpApiBaseUrl()}/tasks/${id}`
    const response = await this.$axios
      .get(url)
      .then(response => {
        return {
          task: changeCaseObject.camelCase(response.data)
        }
      })
      .catch(() => {
        return {
          task: null
        }
      })
    commit('setTask', response.task)
  }
}

export const mutations = {
  setTasks(state, data) {
    state.tasks = data
  },
  setTask(state, data) {
    state.task = data
  }
}

export const getters = {
  tasks(state) {
    return state.tasks
  },
  task(state) {
    return state.task
  }
}
