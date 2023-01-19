

// State
const state = {
    data: false,
    index: false,
    component: false,
};

// Getters
const getters = {
    hasPanel: (state) => state.component !== false,
};

// Actions
const actions = {
    open(store, { component, data, index }) {
        store.commit("openPanel", { component, data, index });
    },
    close(store) {
        store.commit("closePanel", false);
    },
};

// Mutations
const mutations = {
    openPanel(state, { component, data, index }) {
        state.component = component;
        state.data = data;
        state.index = index;
    },
    closePanel(state) {
        state.data = false;
        state.component = false;
    },
};

// Export module
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
};
