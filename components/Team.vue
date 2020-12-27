<template>
  <div class="team" :class="{ active }">
    <i v-if="active" @click="active = false" class="bx bx-x team-close"></i>
    <div v-if="active" @click="active = false" class="close-area"></div>
    <h3>Team</h3>
    <div class="teamList">
      <draggable
        v-model="team"
        draggable=".item"
        :options="{ handle: '.move' }"
      >
        <div
          class="item"
          v-for="(pokemon, $index) in team"
          :key="$index"
          @click="$router.push('/' + pokemon.data.id)"
        >
          <TeamElement :pokemon="pokemon" :position="$index" />
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Team',

  components: {
    draggable,
  },

  computed: {
    team: {
      get() {
        return this.$store.state.team.list
      },
      set(team) {
        this.$store.commit('team/update', team)
      }
    },
    active: {
      get() {
        return this.$store.state.team.active
      },
      set(val) {
        this.$store.commit('team/toggle', val)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.team {
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #fff;

  .team-close {
    display: none;
    position: fixed;
    font-size: 2rem;

    @media only screen and (max-width: 768px) {
      display: block;
      right: 0;
      top: 5px;
    }
  }
  .close-area {
    display: none;
    position: fixed;

    @media only screen and (max-width: 768px) {
      display: block;
      left: 0;
      top: 0;
      width: calc(100vw - 200px);
      height: 100vh;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  @media only screen and (max-width: 768px) {
    right: -200px;
    z-index: 3;
    transition: right linear 0.1s;
  }

  &.active {
    @media only screen and (max-width: 768px) {
      right: 0;
    }
  }
}

.teamList {
  height: calc(100vh - 42px);
  overflow-y: auto;

  @media only screen and (max-width: 768px) {
    padding-bottom: 50px;
  }
}

h3 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  background-color: #efefef;
}
</style>