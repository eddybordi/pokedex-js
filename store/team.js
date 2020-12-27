export const state = () => ({
  list: [],
  active: false
})

export const mutations = {
  add(state, pokemon) {
    state.list.push(pokemon)
  },
  remove(state, position) {
    state.list.splice(position, 1)
  },
  update(state, team) {
    state.list = team
  },
  toggle(state, val) {
    state.active = val
  },
}