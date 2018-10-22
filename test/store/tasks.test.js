import assert from 'assert'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { actions, mutations, getters } from '~/store/tasks'
import apiUrl from '~/lib/api-url'

require('dotenv').config()

describe('store/tasks', () => {
  describe('actions', () => {
    beforeEach(() => {
      actions.$axios = axios
    })

    describe('getTasks', () => {
      test('success', async () => {
        const commit = jest.fn()
        const state = { tasks: [] }
        const tasks = [
          { title: 'title1', description: 'description1', done: false },
          { title: 'title2', description: 'description2', done: true }
        ]
        const url = `${apiUrl.getWpApiBaseUrl()}/tasks`
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onGet(url).reply(200, tasks)
        await actions.getTasks({ state, commit })
        expect(commit).toHaveBeenCalledWith('setTasks', tasks)
      })

      test('error', async () => {
        const commit = jest.fn()
        const state = { tasks: [] }
        const tasks = state.tasks
        const url = `${apiUrl.getWpApiBaseUrl()}/tasks`
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onGet(url).reply(500)
        await actions.getTasks({ state, commit })
        expect(commit).toHaveBeenCalledWith('setTasks', tasks)
      })
    })

    describe('getTask', () => {
      test('success', async () => {
        const commit = jest.fn()
        const state = { task: null }
        const task = {
          title: 'title1',
          description: 'description1',
          done: false
        }
        const url = `${apiUrl.getWpApiBaseUrl()}/tasks/1`
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onGet(url).reply(200, task)
        await actions.getTaskById({ state, commit }, 1)
        expect(commit).toHaveBeenCalledWith('setTask', task)
      })

      test('error', async () => {
        const commit = jest.fn()
        const state = { task: null }
        const task = state.task
        const url = `${apiUrl.getWpApiBaseUrl()}/tasks/1`
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onGet(url).reply(500, task)
        await actions.getTaskById({ state, commit }, 1)
        expect(commit).toHaveBeenCalledWith('setTask', task)
      })
    })

    describe('createTask', () => {
      test('success', async () => {
        const commit = jest.fn()
        const state = {}
        const task = {
          title: 'title1',
          description: 'description1',
          done: false
        }
        const url = `${apiUrl.getWpApiBaseUrl()}/tasks`
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onPost(url).reply(201, task)
        await actions.createTask({ state, commit }, task)
        expect(commit).toHaveBeenCalledWith('setCreateCompleted', true)
      })

      test('error', async () => {
        const commit = jest.fn()
        const state = {}
        const task = state.task
        const url = `${apiUrl.getWpApiBaseUrl()}/tasks`
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onPost(url).reply(500)
        await actions.createTask({ state, commit }, task)
        expect(commit).toHaveBeenCalledWith('setCreateCompleted', false)
      })
    })

    describe('updateTask', () => {
      test('success', async () => {
        const commit = jest.fn()
        const state = {}
        const url = `${apiUrl.getWpApiBaseUrl()}/tasks/1`
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onPut(url).reply(204)
        await actions.updateTask(
          { state, commit },
          { id: 1, task: { title: 'title', description: 'description' } }
        )
        expect(commit).toHaveBeenCalledWith('setUpdateCompleted', true)
      })

      test('error', async () => {
        const commit = jest.fn()
        const state = {}
        const url = `${apiUrl.getWpApiBaseUrl()}/tasks/1`
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onPut(url).reply(500)
        await actions.updateTask(
          { state, commit },
          { id: 1, task: { title: 'title', description: 'description' } }
        )
        expect(commit).toHaveBeenCalledWith('setUpdateCompleted', false)
      })
    })

    describe('deleteTask', () => {
      test('success', async () => {
        const commit = jest.fn()
        const state = {}
        const url = `${apiUrl.getWpApiBaseUrl()}/tasks/1`
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onDelete(url).reply(204, 1)
        await actions.deleteTask({ state, commit }, 1)
        expect(commit).toHaveBeenCalledWith('setDeleteCompleted', true)
      })

      test('error', async () => {
        const commit = jest.fn()
        const state = {}
        const url = `${apiUrl.getWpApiBaseUrl()}/tasks/1`
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onDelete(url).reply(500, 1)
        await actions.deleteTask({ state, commit }, 1)
        expect(commit).toHaveBeenCalledWith('setDeleteCompleted', false)
      })
    })
  })

  describe('mutations', () => {
    test('setTasks', () => {
      const state = { tasks: [] }
      const tasks = [{ title: 'title' }]
      mutations.setTasks(state, tasks)
      assert.equal(state.tasks, tasks)
    })

    test('setTask', () => {
      const state = { task: null }
      const task = { title: 'title' }
      mutations.setTask(state, task)
      assert.equal(state.task, task)
    })

    test('setCreateCompleted', () => {
      const state = { createCompleted: false }
      mutations.setCreateCompleted(state, true)
      assert.equal(state.createCompleted, true)
    })

    test('setUpdateCompleted', () => {
      const state = { updateCompleted: false }
      mutations.setUpdateCompleted(state, true)
      assert.equal(state.updateCompleted, true)
    })

    test('setDeleteCompleted', () => {
      const state = { deleteCompleted: false }
      mutations.setDeleteCompleted(state, true)
      assert.equal(state.deleteCompleted, true)
    })
  })

  describe('getters', () => {
    test('tasks', () => {
      const state = { tasks: [] }
      assert.equal(getters.tasks(state), state.tasks)
    })

    test('task', () => {
      const state = { task: null }
      assert.equal(getters.task(state), state.task)
    })

    test('createCompleted', () => {
      const state = { createCompleted: false }
      assert.equal(getters.createCompleted(state), state.createCompleted)
    })

    test('updateCompleted', () => {
      const state = { updateCompleted: false }
      assert.equal(getters.updateCompleted(state), state.updateCompleted)
    })

    test('deleteCompleted', () => {
      const state = { deleteCompleted: false }
      assert.equal(getters.deleteCompleted(state), state.deleteCompleted)
    })
  })
})
