<template>
  <div class="home">
    <div v-for="user in users" :key="user.id">
      <h1>{{user.firstName}} {{user.lastName}} ({{user.id}})</h1>
      <h3>Things</h3>
    <form>
      <input type="text" placeholder="name" v-model.trim="user.newThing.name" >
      <input type="submit" @click.prevent="createThing(user.id, user.newThing.name)" value="Create">
    </form>

    <table>
      <tr v-for="thing in things" :key="thing.id" v-if="thingIsAvailableForUser(thing, user)">
        <td>
          {{thing.id}}
        </td>
        <td>
          {{thing.userId}}
        </td>
        <td>
          <span v-if="thingIsNotBeingEditedHere(thing, user)">{{thing.name}}</span>
          <span v-if="thingIsSavable(thing, user)">
            <input type="text" name="name" v-model.trim="thing.name">
          </span>
        </td>
        <td>
          <button v-if="thingIsEditable(thing, user)" @click.prevent="makeThingEditable(thing.id)">Edit</button>
          <button v-if="thingIsSavable(thing, user)" @click.prevent="makeThingEditable(thing.id)">Save</button>
          <button v-if="thingIsCopyable(thing, user)" @click.prevent="saveThingAsCopy(thing, user)">Save As</button>
          <button v-if="thingIsSharable(thing, user)" @click.prevent="shareThing(thing.id)">Share</button>
          <button v-if="thingIsUnsharable(thing, user)" @click.prevent="unshareThing(thing.id)">Unshare</button>
          <button v-if="thingIsDestroyable(thing, user)" @click.prevent="destroyThing(thing.id)">Delete</button>
          <button v-if="thingIsStarrable(thing, user)" @click.prevent="starThing(thing.id, user.id)">Star</button>
          <button v-if="thingIsUnstarrable(thing, user)" @click.prevent="unstarThing(thing.id, user.id)">Unstar</button>
        </td>
      </tr>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      users: this.$store.state.Users,
      things: this.$store.state.Things,
      editableThingId: ''
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    thingIsNotBeingEditedHere (thing, user) {
      return this.editableThingId !== thing.id || thing.userId !== user.id ? true : false
    },
    thingIsAvailableForUser (thing, user) {
      return thing.isShared === true || thing.userId === user.id ? true : false
    },
    thingIsDestroyable (thing, user) {
      return this.editableThingId !== thing.id && thing.userId === user.id ? true : false
    },
    thingIsEditable (thing, user) {
      return this.editableThingId !== thing.id && thing.userId === user.id ? true : false
    },
    thingIsSavable (thing, user) {
      return this.editableThingId === thing.id && thing.userId === user.id ? true : false
    },
    thingIsCopyable (thing, user) {
      return this.editableThingId !== thing.id ? true : false
    },
    thingIsSharable (thing, user) {
      return this.editableThingId !== thing.id && thing.userId === user.id && thing.isShared === false ? true : false
    },
    thingIsUnsharable (thing, user) {
      return this.editableThingId !== thing.id && thing.userId === user.id && thing.isShared === true ? true : false
    },
    thingIsStarrable (thing, user) {
      return this.editableThingId !== thing.id && thing.stars.findIndex(({ userId }) => userId === user.id) === -1 ? true : false
    },
    thingIsUnstarrable (thing, user) {
      return this.editableThingId !== thing.id && thing.stars.findIndex(({ userId }) => userId === user.id) !== -1 ? true : false
    },
    destroyThing (id) {
      this.$store.dispatch('destroyThing', id)
    },
    makeThingEditable (id) {
      if (!this.editableThingId) {
        this.editableThingId = id
      } else {
        this.editableThingId = ''
      }
    },
    resetNewThing (userId) {
      const payload = {
        id: userId,
        newThing: {
          name: ''
        }
      }
      this.$store.dispatch('updateUser', payload)
    },
    shareThing (id) {
      const payload = {
        id,
        isShared: true
      }
      this.$store.dispatch('updateThing', payload)
    },
    unshareThing (id) {
      const payload = {
        id,
        isShared: false
      }
      this.$store.dispatch('updateThing', payload)
    },
    createThing (userId, thingName) {
        if (thingName !== '') {
          const newThing = {
            userId,
            name: thingName,
            isShared: false
          }
          this.$store.dispatch('createThing', newThing)
          this.resetNewThing(userId)
      }
    },
    starThing (thingId, userId) {
      const payload = {
        id: thingId,
        userId: userId
      }
      console.log('STAR THING', payload)
      this.$store.dispatch('starThing', payload)
    },
    unstarThing (thingId, userId) {
      const payload = {
        id: thingId,
        userId: userId
      }
      this.$store.dispatch('unstarThing', payload)
    },
    saveThingAsCopy (thing, user) {
      const newThingCopy = {
        userId: user.id,
        name: `${thing.name} copy`,
        isShared: false
      }
      this.$store.dispatch('createThing', newThingCopy)
    }
  }
}
</script>
