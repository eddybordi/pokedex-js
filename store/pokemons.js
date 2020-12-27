export const state = () => ({
  list: []
})

export const mutations = {
  set(state, pokemons) {
    state.list = pokemons
  },

  load(state, data) {
    state.list[data.id - 1].data = data
  }
}