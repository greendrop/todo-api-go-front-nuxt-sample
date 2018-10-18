import apiUrl from '~/lib/api-url'
import changeCaseObject from '~/lib/change-case-object'

export const state = () => ({
  tasks: [],
  task: null,
  createCompleted: false,
  updateCompleted: false,
  deleteCompleted: false
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
  },
  async createTask({ commit }, task) {
    commit('setCreateCompleted', false)
    const url = `${apiUrl.getWpApiBaseUrl()}/tasks`
    const params = { ...task }
    console.log(params)
    await this.$axios.post(url, params).then(() => {
      commit('setCreateCompleted', true)
    })
  }
}

export const mutations = {
  setTasks(state, data) {
    state.tasks = data
  },
  setTask(state, data) {
    state.task = data
  },
  setCreateCompleted(state, data) {
    state.createCompleted = data
  },
  setUpdateCompleted(state, data) {
    state.updateCompleted = data
  },
  setDeleteCompleted(state, data) {
    state.deleteCompleted = data
  }
}

export const getters = {
  tasks(state) {
    return state.tasks
  },
  task(state) {
    return state.task
  },
  createCompleted(state) {
    return state.createCompleted
  },
  updateCompleted(state) {
    return state.updateCompleted
  },
  deleteCompleted(state) {
    return state.deleteCompleted
  }
}
