<template>
  <div class="_wrapper">
    <div class="_browser" v-for="user in users" :key="user.id">
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
            <div class="_avatar" v-bind:title="`User ID: ${user.id}`"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g class="nc-icon-wrapper" fill="#aaaaaa"><path d="M4.318,9A5,5,0,0,0,1.5,13.5h0s2,2,6.5,2,6.5-2,6.5-2h0A5,5,0,0,0,11.681,9" fill="none" stroke="#aaaaaa" stroke-linecap="round" stroke-linejoin="round" data-cap="butt" data-color="color-2"></path> <path d="M11.5,4c0,1.933-1.567,4.5-3.5,4.5S4.5,5.933,4.5,4a3.5,3.5,0,0,1,7,0Z" fill="none" stroke="#aaaaaa" stroke-linecap="round" stroke-linejoin="round" data-cap="butt"></path></g></svg></div> <div v-bind:title="`User ID: ${user.id}`">{{user.firstName}} {{user.lastName}}</div>
          </div>
          <div class="_app__view">
            <h3 class="_heading">{{user.firstName}}&rsquo;s Things</h3>
            <table class="_table">
              <tr v-for="thing in things" :key="thing.id" v-if="thingIsAvailableForUser(thing, user)">
                <td>
                  <div v-if="thingIsStarrable(thing, user)" @click.prevent="starThing(thing.id, user.id)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g class="nc-icon-wrapper" fill="#aaaaaa"><polygon points="8 0.867 10.318 5.563 15.5 6.316 11.75 9.971 12.635 15.133 8 12.696 3.365 15.133 4.25 9.971 0.5 6.316 5.682 5.563 8 0.867" fill="none" stroke="#aaaaaa" stroke-linecap="round" stroke-linejoin="round" data-cap="butt"></polygon></g></svg></div>
                  <div v-if="thingIsUnstarrable(thing, user)" @click.prevent="unstarThing(thing.id, user.id)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g class="nc-icon-wrapper" fill="#111111"><path d="M15.144,5.439l-4.317-.628L8.9.9A1.041,1.041,0,0,0,7.1.9L5.173,4.812.856,5.439A1,1,0,0,0,.3,7.145l3.123,3.045-.737,4.3a1,1,0,0,0,1.451,1.054L8,13.513l3.861,2.029a1,1,0,0,0,1.451-1.054l-.737-4.3L15.7,7.145a1,1,0,0,0-.554-1.705Z" fill="#111111"></path></g></svg></div>
                  <span v-bind:title="`Thing ID: ${thing.id} ; User ID: ${thing.userId}`" v-if="thingIsNotBeingEditedHere(thing, user)">{{thing.name}}</span>
                  <span v-if="thingIsSavable(thing, user)">
                    <input type="text" name="name" v-model.trim="thing.name">
                  </span>
                </td>
                <td class="_table__actions">
                  <button class="_btn" v-if="thingIsEditable(thing, user)" @click.prevent="makeThingEditable(thing.id)">Edit</button>
                  <button class="_btn" v-if="thingIsSavable(thing, user)" @click.prevent="makeThingEditable(thing.id)">Save</button>
                  <button class="_btn" v-if="thingIsCopyable(thing, user)" @click.prevent="saveThingAsCopy(thing, user)">Save As</button>
                  <button class="_btn" v-if="thingIsSharable(thing, user)" @click.prevent="shareThing(thing.id)">Share</button>
                  <button class="_btn" v-if="thingIsUnsharable(thing, user)" @click.prevent="unshareThing(thing.id)">Unshare</button>
                </td>
                <td class="_table__delete">
                  <div v-if="thingIsDestroyable(thing, user)" @click.prevent="destroyThing(thing.id)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g class="nc-icon-wrapper" fill="#ed6c61"><path fill="#ed6c61" d="M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3 c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z"></path></g></svg></div>
                </td>
                </td>
              </tr>
            </table>
            <h3 class="_heading">Create New Thing</h3>
            <form>
              <input type="text" placeholder="Thing name" v-model.trim="user.newThing.name">
              <input type="submit" class="_btn _btn--primary" @click.prevent="createThing(user.id, user.newThing.name)" value="Create">
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="_browser" v-if="users.length === 0">
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
            <p>There aren&rsquo;t any users in your application yet.</p>

            <p>Why not head over to the <router-link to="/admin">Admin screen</router-link> and add a few?</p>
          </div>
        </div>
      </div>
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

<style lang="scss">
</style>
