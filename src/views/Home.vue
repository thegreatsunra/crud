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
      <tr v-for="thing in things" :key="thing.id" v-if="thing.isShared === true || thing.userId === user.id">
        <td>
          {{thing.id}}
        </td>
        <td>
          {{thing.userId}}
        </td>
        <td>
          <span v-if="editableThingId !== thing.id || thing.userId !== user.id">{{thing.name}}</span>
          <span v-if="editableThingId === thing.id && thing.userId === user.id">
            <input type="text" name="name" v-model.trim="thing.name">
          </span>
        </td>
        <td>
          <button v-if="editableThingId !== thing.id && thing.userId === user.id" @click.prevent="makeThingEditable(thing.id)">Edit</button>
          <button v-if="editableThingId === thing.id && thing.userId === user.id" @click.prevent="makeThingEditable(thing.id)">Save</button>
          <button @click.prevent="shareThing(thing.id)" v-if="editableThingId !== thing.id && thing.userId === user.id && thing.isShared === false">Share</button>
          <button @click.prevent="unshareThing(thing.id)" v-if="editableThingId !== thing.id && thing.userId === user.id && thing.isShared === true">Unshare</button>
          <button @click.prevent="destroyThing(thing.id)" v-if="editableThingId !== thing.id && thing.userId === user.id">Delete</button>
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
    }
  }
}
</script>
