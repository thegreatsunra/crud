// import Vue from 'vue'
import random from '@/random'
import { merge } from 'lodash'

/*
{
  id,
  firstName,
  lastName,
  isAdmin,
  communities: [
    {
      id
    },
    {
      id
    }
  ]
}
*/

const state = [
]

const mutations = {
  CREATE_USER (state, payload) {
    state.push({
      id: random.createString(8),
      firstName: payload.firstName,
      lastName: payload.lastName,
      isAdmin: payload.isAdmin,
      newThing: {
        name: ''
      }
    })
  },
  UPDATE_USER (state, payload) {
    merge(state.find(({ id }) => id === payload.id), {
      firstName: payload.firstName,
      lastName: payload.lastName,
      isAdmin: payload.isAdmin,
      newThing: {
        name: payload.newThing.name
      }
    })
  },
  DESTROY_USER (state, userId) {
    state.forEach(({ id }, index) => {
      if (id === userId) {
        state.splice(index, 1)
      }
    })
  }
}

const actions = {
  createUser: async ({ commit }, payload) => {
    try {
      console.log('creating new user')
      await commit('CREATE_USER', payload)
    } catch (err) {
      console.log('error creating user', err)
    }
  },
  updateUser: async ({ commit }, payload) => {
    try {
      console.log('updating existing user')
      await commit('UPDATE_USER', payload)
    } catch (err) {
      console.log('error updating user', err)
    }
  },
  destroyUser: async ({ commit }, userId) => {
    try {
      console.log('destroying user')
      await commit('DESTROY_USER', userId)
    } catch (err) {
      console.log('error destroying user', err)
    }
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
