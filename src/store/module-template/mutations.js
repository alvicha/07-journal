export const increment = (state) => { //Estas mutaciones tienen que ser sincronas
    state.count++;
    state.lastMutation = 'increment'
}

export const incrementBy = (state, val) => {
    state.count += val;
    state.lastMutation = 'incrementBy' + val
    state.lastRandomInt = val
}
export const setLoading = (state, val) => {
    state.isLoading = val
    state.lastMutation = 'setLoading ' + val
}