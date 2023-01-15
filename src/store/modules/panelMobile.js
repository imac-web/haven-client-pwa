

// State
const state = {
    data: false,
    component: false,
};

// Getters
const getters = {
    hasPanelMobile: (state) => state.component !== false,
};

// Actions
const actions = {
    open(store, { component, data }) {
        store.commit("openPanelMobile", { component, data });
    },
    close(store) {
        store.commit("closePanelMobile", false);
    },
};

// Mutations
const mutations = {
    openPanelMobile(state, { component, data, layout }) {
        state.component = component;
        state.data = data;
        state.layout = layout || state.layout;
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
