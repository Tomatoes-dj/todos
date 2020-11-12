import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    todoId: 5,
    showKey: 'all',
  },
  mutations: {
    initList(state, value) {
      state.list = value.data
    },
    inputChange(state, value) {
      state.inputValue = value
    },
    addList(state) {
      state.list.push({ id: state.todoId, info: state.inputValue, done: false })
      state.inputValue = ''
      state.todoId++
    },
    removeTodo(state, index) {
      let removeID = state.list.findIndex((item) => {
        return item.id === index
      })
      state.list.splice(removeID, 1)
    },
    changeChecked(state, obj) {
      let changeID = state.list.findIndex((item) => {
        return item.id === obj.id
      })
      state.list[changeID].done = obj.value
    },
    clearDone(state) {
      state.list = state.list.filter((item) => {
        return item.done === false
      })
    },
    sKey(state, value) {
      state.showKey = value
    },
  },
  actions: {
    getList({ commit }) {
      axios.get('list.json').then((res) => {
        // console.log(res)
        commit('initList', res)
      })
    },
  },
  getters: {
    listNum(state) {
      let num = state.list.filter((item) => {
        return item.done === false
      })
      return num.length
    },
    infoList(state) {
      if (state.showKey === 'all') {
        return state.list
      } else if (state.showKey === 'unDone') {
        return state.list.filter((item) => {
          return item.done === false
        })
      } else if (state.showKey === 'Done') {
        return state.list.filter((item) => {
          return item.done === true
        })
      } else {
        return state.list
      }
    },
  },

  modules: {},
})
