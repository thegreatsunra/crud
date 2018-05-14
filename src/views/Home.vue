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

<style lang="scss">
  $base-spacing-unit: 6px;
  body {
    font-size: $base-spacing-unit * 2.5;
    background-color: #eeeeee;
    font-family: Helvetica, Arial, sans-serif;
  }
  ._wrapper {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: $base-spacing-unit;
  }
  ._app {
    padding-bottom: $base-spacing-unit;
    &__header {
      font-size: $base-spacing-unit * 1.75;
      display: flex;
      text-transform: uppercase;
      align-items: center;
      padding-left: $base-spacing-unit;
      height: ($base-spacing-unit * 3);
      background-color: #111111;
      color: #666666;
    }
    &__nav {
      font-size: $base-spacing-unit * 2;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: $base-spacing-unit;
      height: $base-spacing-unit * 4;
      background-color: #333333;
      color: #aaaaaa;
    }
    &__view {
      padding-left: $base-spacing-unit;
      padding-right: $base-spacing-unit;
    }
  }
  ._avatar {
    margin-right: $base-spacing-unit;
  }
  ._heading {
    font-weight: normal;
    font-size: $base-spacing-unit * 3;
    margin-bottom: $base-spacing-unit;
  }
  ._btn {
    background-color: #cccccc;
    padding: $base-spacing-unit;
    border: 0;
    color: #333333;
    font-size: $base-spacing-unit * 2;
    &:hover {
      cursor: pointer;
      background-color: #999999;
      color: #000000;
    }
    &--primary {
      background-color: #245b94;
      color: #ffffff;
      &:hover {
        background-color: #205090;
        color: #ffffff;
      }
    }
  }
  ._table {
    td {
      line-height: 1;
      div {
        display: inline-block;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  // @media only screen and (min-width: 640px) {
  //   ._wrapper {
  //     grid-template-columns: 1fr 1fr;
  //   }
  // }
  @media only screen and (min-width: 1024px) {
    ._wrapper {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media only screen and (min-width: 1200px) {
    ._wrapper {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  ._browser {
    margin: $base-spacing-unit;
    background-color: #ffffff;
    box-shadow: 0 0 (6 * $base-spacing-unit) rgba(#000000, 0.5);
    border-radius: 6px;
    &__chrome {
      padding-left: $base-spacing-unit;
      display: flex;
      align-items: center;
      height: 3 * $base-spacing-unit;
      border-radius: ($base-spacing-unit) ($base-spacing-unit) 0 0;
      background-image: linear-gradient(#e7e5e7, #d1cfd1);
      border-bottom: 1px solid #bdbcbe;
      border-top: 1px solid #f0f1f0;
    }
    &__button {
      border-radius: 100%;
      height: 2 * $base-spacing-unit;
      width: 2 * $base-spacing-unit;
      margin-right: $base-spacing-unit;
      background-color: #d0d0d0;
      &--danger {
        background-color: #ed6c61;
      }
      &--warning {
        background-color: #f6c251;
      }
      &--success {
        background-color: #64c957;
      }
    }
  }
</style>