

// State
const state = {
    data: false,
    component: false,
};

// Getters
const getters = {
    hasPanel: (state) => state.component !== false,
};

// Actions
const actions = {
    open(store, { component, data }) {
        store.commit("openPanel", { component, data });
    },
    close(store) {
        store.commit("closePanel", false);
    },
};

// Mutations
const mutations = {
    openPanel(state, { component, data, layout }) {
        state.component = component;
        state.data = data;
        state.layout = layout || state.layout;
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
