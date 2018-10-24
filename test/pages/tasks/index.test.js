import assert from 'assert'
import { mount } from '@vue/test-utils'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Index from '~/pages/tasks/index'

describe('pages/tasks/index', () => {
  const routes = [
    { path: '/tasks', name: 'task-index' },
    { path: '/tasks/:id', name: 'task-show' },
    { path: '/tasks/:id/edit', name: 'task-edit' }
  ]
  const router = new VueRouter({ routes })

  test('asyncData', async () => {
    const store = {
      dispatch: jest.fn(),
      getters: { 'tasks/deleteCompleted': true, 'tasks/tasks': [] }
    }
    const route = { query: {} }
    const context = { store: store, route: route }
    const data = await Index.asyncData(context)
    expect(store.dispatch).toHaveBeenCalledWith('tasks/getTasks', route.query)
    assert.deepEqual(data, { tasks: [] })
  })

  describe('methods', () => {
    beforeEach(() => {
      Vue.use(VueRouter)
      Vue.use(Vuetify)
    })

    test('showTask', () => {
      const task = { id: 1, title: 'title' }
      const spy = jest.spyOn(router, 'push')
      const wrapper = mount(Index, { router })
      wrapper.setData({ tasks: [task] })
      wrapper.vm.showTask(task)
      expect(spy).toHaveBeenCalledWith(`/tasks/${task.id}`)
    })

    test('editTask', () => {
      const task = { id: 1, title: 'title' }
      const spy = jest.spyOn(router, 'push')
      const wrapper = mount(Index, { router })
      wrapper.setData({ tasks: [task] })
      wrapper.vm.editTask(task)
      expect(spy).toHaveBeenCalledWith(`/tasks/${task.id}/edit`)
    })

    test('deleteTask', async () => {
      global.confirm = () => true
      const task = { id: 1, title: 'title' }
      const store = {
        dispatch: jest.fn(),
        getters: { 'tasks/deleteCompleted': true, 'tasks/tasks': [] }
      }
      const route = { query: {} }
      const wrapper = mount(Index, {
        router,
        mocks: { $store: store, $route: route }
      })
      wrapper.setData({ tasks: [task] })
      await wrapper.vm.deleteTask(task)
      expect(store.dispatch).toHaveBeenNthCalledWith(
        1,
        'tasks/deleteTask',
        task.id
      )
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        'tasks/getTasks',
        route.query
      )
    })
  })
})
