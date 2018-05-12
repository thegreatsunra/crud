<template>
  <div class="home">
    <h1>Create User</h1>
    <form>
      <input type="text" name="firstName" v-model="newUser.firstName" placeholder="firstName"><br>
      <input type="text" name="lastName" v-model="newUser.lastName" placeholder="lastName"><br>
      <label><input type="checkbox" name="isAdmin" v-model="newUser.isAdmin"> isAdmin</label><br>
      <input type="submit" @click.prevent="createUser()" value="Create User">
    </form>

    <h1>Users</h1>
    <table>
      <tr v-for="user in users">
        <td>
          <span v-if="editableUser !== user.id">{{user.firstName}} {{user.lastName}}</span><br>
          <span v-if="editableUser === user.id">
            <input type="text" name="firstName" v-model="user.firstName"> <input type="text" name="lastName" v-model="user.lastName">
          </span>
        </td>
        <td>
          <span v-if="user.isAdmin && editableUser !== user.id">isAdmin</span><br>
          <label v-if="editableUser === user.id"><input type="checkbox" name="isAdmin" v-model="user.isAdmin"> isAdmin</label>
        </td>
        <td>
          <button v-if="editableUser !== user.id" @click.prevent="editUser(user.id)">Edit</button>
          <button v-if="editableUser === user.id" @click.prevent="editUser(user.id)">Save</button>
          <button @click.prevent="destroyUser(user.id)">Delete</button>
        </td>
      </tr>
    </table>

    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data () {
    return {
      users: this.$store.state.Users,
      newUser: {
        firstName: '',
        lastName: '',
        isAdmin: false
      },
      editableUser: ''
    }
  },
  components: {
    HelloWorld
  },
  methods: {
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
    resetNewUser () {
      this.newUser.firstName = ''
      this.newUser.lastName = ''
      this.newUser.isAdmin = false
    },
    createUser () {
      this.newUser.firstName = this.newUser.firstName.trim()
      this.newUser.lastName = this.newUser.lastName.trim()
      if (this.newUser.firstName && this.newUser.lastName) {
        this.$store.dispatch('createUser', this.newUser)
        this.resetNewUser()
      }
    }
  }
}
</script>
