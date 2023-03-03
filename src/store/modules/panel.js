

// State
const state = {
    data: false,
    index: false,
    component: false,
    panelWidth: 0,
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
    setPanelWidthGlobally(store, width) {
        store.commit("setPanelWidth", width);
    }
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
    setPanelWidth(state, width) {
        state.panelWidth = width;
    }
};

// Export module
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
};
