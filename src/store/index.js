import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        isSelected: []
    },
    mutations: {
        setFirstSelectedTrue(state) {
            state.isSelected[0] = true;
            for (let i = 1; i < state.isSelected.length; i++) {
                state.isSelected[i] = false;
            }
            state.isSelected[0] = true;
        }
    }
})