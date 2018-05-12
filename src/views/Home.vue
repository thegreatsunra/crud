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
      <tr v-for="thing in things" :key="thing.id">
        <td>
          {{thing.id}}
        </td>
        <td>
          {{thing.userId}}
        </td>
        <td>
          <span v-if="editableThing !== thing.id || thing.userId !== user.id">{{thing.name}}</span>
          <span v-if="editableThing === thing.id && thing.userId === user.id">
            <input type="text" name="name" v-model.trim="thing.name">
          </span>
        </td>
        <td>
          <button v-if="editableThing !== thing.id && thing.userId === user.id" @click.prevent="editThing(thing.id)">Edit</button>
          <button v-if="editableThing === thing.id && thing.userId === user.id" @click.prevent="editThing(thing.id)">Save</button>
          <button @click.prevent="destroyThing(thing.id)" v-if="editableThing !== thing.id && thing.userId === user.id">Delete</button>
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
      editableThing: ''
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
    editThing (id) {
      if (!this.editableThing) {
        this.editableThing = id
      } else {
        this.editableThing = ''
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
    createThing (userId, thingName) {
        if (thingName !== '') {
          const newThing = {
            userId,
            name: thingName
          }
          this.$store.dispatch('createThing', newThing)
          this.resetNewThing(userId)
      }
    }
  }
}
</script>
