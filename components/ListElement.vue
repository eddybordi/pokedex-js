<template>
  <vs-card type="3" class="list-element">
    <template #title>
      <h3>{{ pokemon.name }}</h3>
    </template>
    <template #img>
      <img :src="pokemon.data.svg" />
    </template>
    <template #text>
      <h3>No.{{ pokemon.data.id }}</h3>
    </template>
    <template #interactions>
      <vs-button
        :class="{ inactive: team.length > 5 }"
        danger
        icon
        @click.stop="add(pokemon)"
      >
        <i class="bx bx-plus"></i>
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ListElement',

  props: [
    'pokemon'
  ],

  computed: {
    ...mapState({
      team: state => state.team.list
    }),
  },

  methods: {
    ...mapMutations({
      addToTeam: 'team/add',
      toggleTeam: 'team/toggle',
    }),
    add(pokemon) {
      if (this.team.length > 5) return
      this.addToTeam(pokemon)
      if (this.$route.params.id) this.$router.push('/')
      this.toggleTeam(true)
    }
  }
}
</script>

<style lang="scss">
.list-element {
  h3 {
    text-transform: capitalize;
  }

  .vs-card__img {
    position: initial;

    img {
      width: auto;
      height: 150px;
      min-width: auto !important;
    }
  }
  .vs-card__interactions {
    left: auto;
    right: 0;
  }
  .vs-card {
    max-width: none !important;
    border-radius: 0;
    cursor: inherit;
    &:hover {
      transform: scale(1) !important;
    }
  }
  .vs-card__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .vs-card__title {
    padding-top: 0;
  }

  .inactive {
    opacity: 0.3;
  }
}
</style>