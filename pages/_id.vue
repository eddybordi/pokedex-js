<template>
  <vs-dialog
    v-if="pokemons.length && pokemon"
    v-model="active"
    overflow-hidden
    scroll
  >
    <ListElement :pokemon="pokemon" />
    <div class="general">
      <div>
        <div class="title">Height</div>
        <div class="data">{{ pokemon.data.height / 10 }} m</div>
      </div>
      <div>
        <div class="title">Weight</div>
        <div class="data">{{ pokemon.data.weight / 10 }} kg</div>
      </div>
    </div>
    <div class="title">Types</div>
    <div class="types">
      <div class="type" v-for="(t, $index) in pokemon.data.types" :key="$index">
        {{ t.type.name }}
      </div>
    </div>
    <div class="title">Abilities</div>
    <div class="types">
      <div
        class="type"
        v-for="(a, $index) in pokemon.data.abilities"
        :key="$index"
      >
        {{ a.ability.name }}
      </div>
    </div>
    <div class="title">Stats</div>
    <radar-chart :data="chartData()" :options="chartOptions" />
  </vs-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonDetails',

  scrollToTop: false,

  computed: {
    ...mapState({
      pokemons: state => state.pokemons.list
    }),
    pokemon() {
      return this.pokemons[this.$route.params.id - 1]
    },
    active: {
      get: function () {
        return true
      },
      set: function () {
        this.$router.push('/')
      }
    },
  },

  data: () => ({
    chartOptions: {
      legend: {
        display: false
      },
      scale: {
        angleLines: {
          display: false
        },
        ticks: {
          suggestedMin: 0,
        }
      }
    },
  }),

  methods: {
    chartData() {
      const labels = []
      for (let e of this.pokemon.data.stats) {
        labels.push(e.stat.name)
      }

      const data = []
      for (let e of this.pokemon.data.stats) {
        data.push(e.base_stat)
      }

      return {
        labels,
        datasets: [{
          borderColor: '#fe4758',
          data
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  margin-top: 1rem;
}

.general {
  display: flex;

  & > div {
    width: 50%;
  }

  .data {
    margin-top: 1rem;
  }
}

.types {
  display: flex;
  margin-top: 1rem;

  .type {
    background-color: #fe4758;
    border-radius: 5px;
    color: #fff;
    padding: 3px 8px;
    text-transform: capitalize;
    font-weight: 500;

    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
}
</style>