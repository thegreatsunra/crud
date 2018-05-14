<template>
  <div class="home">
    <h1>Create User</h1>
    <form>
      <input type="text" name="firstName" v-model.trim="newUser.firstName" placeholder="firstName"><br>
      <input type="text" name="lastName" v-model.trim="newUser.lastName" placeholder="lastName"><br>
      <label><input type="checkbox" name="isAdmin" v-model.trim="newUser.isAdmin"> isAdmin</label><br>
      <input type="submit" @click.prevent="createUser()" value="Create User">
    </form>

    <h1>Users</h1>
    <table>
      <tr v-for="user in users" :key="user.id">
        <td>
          {{user.id}}
        </td>
        <td>
          <span v-if="editableUser !== user.id">{{user.firstName}} {{user.lastName}}</span><br>
          <span v-if="editableUser === user.id">
            <input type="text" name="firstName" v-model.trim="user.firstName"> <input type="text" name="lastName" v-model.trim="user.lastName">
          </span>
        </td>
        <td>
          <span v-if="user.isAdmin && editableUser !== user.id">isAdmin</span><br>
          <label v-if="editableUser === user.id"><input type="checkbox" name="isAdmin" v-model.trim="user.isAdmin"> isAdmin</label>
        </td>
        <td>
          <button v-if="editableUser !== user.id" @click.prevent="editUser(user.id)">Edit</button>
          <button v-if="editableUser === user.id" @click.prevent="editUser(user.id)">Save</button>
          <button v-if="editableUser !== user.id" @click.prevent="destroyUser(user.id)">Delete</button>
        </td>
      </tr>
    </table>

    <!-- <h1>Create Thing</h1>
    <form>
      <input type="text" name="name" v-model.trim="newThing.name" placeholder="name"><br>
      <input type="submit" @click.prevent="createThing()" value="Create Thing">
    </form> -->

    <!-- <h1>Things</h1>
    <table>
      <tr v-for="thing in things" :key="thing.id">
        <td>
          <span v-if="editableThing !== thing.id">{{thing.name}}</span><br>
          <span v-if="editableThing === thing.id">
            <input type="text" name="name" v-model.trim="thing.name">
          </span>
        </td>
        <td>
          <button v-if="editableThing !== thing.id" @click.prevent="editThing(thing.id)">Edit</button>
          <button v-if="editableThing === thing.id" @click.prevent="editThing(thing.id)">Save</button>
          <button @click.prevent="destroyThing(thing.id)" v-if="editableThing !== thing.id">Delete</button>
        </td>
      </tr>
    </table> -->
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
      users: this.$store.state.Users,
      newUser: {
        firstName: '',
        lastName: '',
        isAdmin: false
      },
      editableUser: '',
      things: this.$store.state.Things,
      newThing: {
        name: '',
      },
      editableThing: ''
    }
  },
  components: {
  },
  methods: {
    // destroyThing (id) {
    //   this.$store.dispatch('destroyThing', id)
    // },
    // editThing (id) {
    //   if (!this.editableThing) {
    //     this.editableThing = id
    //   } else {
    //     this.editableThing = ''
    //   }
    // },
    // resetNewThing () {
    //   this.newThing.name = ''
    // },
    // createThing () {
    //   if (this.newThing.name) {
    //     this.$store.dispatch('createThing', this.newThing)
    //     this.resetNewThing()
    //   }
    // },
    resetNewUser () {
      this.newUser.firstName = ''
      this.newUser.lastName = ''
      this.newUser.isAdmin = false
    },
    destroyUser (id) {
      this.$store.dispatch('destroyUser', id)
    },
    editUser (id) {
      if (!this.editableUser) {
        this.editableUser = id
      } else {
        this.editableUser = ''
      }
    },
    createUser () {
      if (this.newUser.firstName && this.newUser.lastName) {
        this.$store.dispatch('createUser', this.newUser)
        this.resetNewUser()
      }
    }
  }
}
</script>
