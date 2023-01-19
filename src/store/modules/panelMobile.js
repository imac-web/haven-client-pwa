

// State
const state = {
    data: false,
    index: false,
    component: false,
};

// Getters
const getters = {
    hasPanelMobile: (state) => state.component !== false,
};

// Actions
const actions = {
    open(store, { component, data, index }) {
        store.commit("openPanelMobile", { component, data, index });
    },
    close(store) {
        store.commit("closePanelMobile", false);
    },
};

// Mutations
const mutations = {
    openPanelMobile(state, { component, data, index }) {
        state.component = component;
        state.data = data;
        state.index = index;
    },
    closePanelMobile(state) {
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
