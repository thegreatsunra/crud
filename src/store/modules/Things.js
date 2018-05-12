// import Vue from 'vue'
import { merge } from 'lodash'
import random from '@/random'

/*
{
  id,
  name,
  userId,
  isShared
}
*/

const state = [
]

const mutations = {
  CREATE_THING (state, payload) {
    state.push({
      id: random.createString(8),
      name: payload.name,
      userId: payload.userId,
      isShared: payload.isShared
    })
  },
  UPDATE_THING (state, payload) {
    merge(state.find(({ id }) => id === payload.id), {
      name: payload.name,
      userId: payload.userId,
      isShared: payload.isShared
    })
  },
  DESTROY_THING (state, thingId) {
    state.forEach(({ id }, index) => {
      if (id === thingId) {
        state.splice(index, 1)
      }
    })
  }
}

const actions = {
  createThing: async ({ commit }, payload) => {
    try {
      console.log('creating new thing')
      await commit('CREATE_THING', payload)
    } catch (err) {
      console.log('error creating thing', err)
    }
  },
  updateThing: async ({ commit }, payload) => {
    try {
      console.log('updating existing thing')
      await commit('UPDATE_THING', payload)
    } catch (err) {
      console.log('error updating thing', err)
    }
  },
  destroyThing: async ({ commit }, thingId) => {
    try {
      console.log('destroying thing')
      await commit('DESTROY_THING', thingId)
    } catch (err) {
      console.log('error destroying thing', err)
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
