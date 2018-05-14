<template>
  <div class="_wrapper">
    <div class="_browser">
      <div class="_browser__chrome">
        <div class="_browser__button _browser__button--danger"></div>
        <div class="_browser__button _browser__button--warning"></div>
        <div class="_browser__button _browser__button--success"></div>
      </div>
      <div class="_browser__content">
        <div class="_app">
          <div class="_app__header">
            My Application
          </div>
          <div class="_app__nav">
            <div class="_avatar" v-bind:title="`User ID: NONE`"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g class="nc-icon-wrapper" fill="#aaaaaa"><path d="M4.318,9A5,5,0,0,0,1.5,13.5h0s2,2,6.5,2,6.5-2,6.5-2h0A5,5,0,0,0,11.681,9" fill="none" stroke="#aaaaaa" stroke-linecap="round" stroke-linejoin="round" data-cap="butt" data-color="color-2"></path> <path d="M11.5,4c0,1.933-1.567,4.5-3.5,4.5S4.5,5.933,4.5,4a3.5,3.5,0,0,1,7,0Z" fill="none" stroke="#aaaaaa" stroke-linecap="round" stroke-linejoin="round" data-cap="butt"></path></g></svg></div> <div v-bind:title="`User ID: NONE`">Super Admin</div>
          </div>
          <div class="_app__view">
          <h3 class="_heading">Users</h3>
          <table class="_table">
            <tr v-for="user in users" :key="user.id">
              <td>
                <span v-if="editableUser !== user.id">{{user.firstName}} {{user.lastName}} <span class="_user__id">{{user.id}}</span></span>
                <span v-if="editableUser === user.id">
                  <input type="text" name="firstName" v-model.trim="user.firstName" placeholder="First name"> <input type="text" name="lastName" v-model.trim="user.lastName" placeholder="Last name">
                </span>
              </td>
              <td>
                <span v-if="user.isAdmin && editableUser !== user.id">Admin</span> <label v-if="editableUser === user.id"><input type="checkbox" name="isAdmin" v-model.trim="user.isAdmin"> Admin</label>
              </td>
              <td class="_table__actions">
                <button class="_btn" v-if="editableUser !== user.id" @click.prevent="editUser(user.id)">Edit</button>
                <button class="_btn" v-if="editableUser === user.id" @click.prevent="editUser(user.id)">Save</button>
              </td>
              <td class="_table__delete">
                <div v-if="editableUser !== user.id" @click.prevent="destroyUser(user.id)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g class="nc-icon-wrapper" fill="#ed6c61"><path fill="#ed6c61" d="M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3 c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z"></path></g></svg></div>
              </td>
            </tr>
          </table>
          <h3 class="_heading">Create New User</h3>
          <form class="_form">
            <input type="text" name="firstName" v-model.trim="newUser.firstName" placeholder="First name">
            <input type="text" name="lastName" v-model.trim="newUser.lastName" placeholder="Last name">
            <label><input type="checkbox" name="isAdmin" v-model.trim="newUser.isAdmin"> Admin User</label><br>
            <input type="submit" class="_btn _btn--primary" @click.prevent="createUser()" value="Create">
          </form>

          </div>
        </div>
      </div>
    </div>

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
