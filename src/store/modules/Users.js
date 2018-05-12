import Vue from 'vue'

const state = []

const mutations = {
  CREATE_USER (state, payload) {
  },
  UPDATE_USER (state, payload) {
  },
  DESTROY_USER (state, userId) {
  }
}

const actions = {
  createUser: async ({ commit }, payload) => {
  },
  updateUser: async ({ commit }, payload) => {
  },
  destroyUser: async ({ commit }, userId) => {
  }
}

const getters = {
}

export default {
  actions,
  getters,
  mutations,
  state
}
