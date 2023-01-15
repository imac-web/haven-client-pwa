
// Vuex Stores
export const STORE_MODULES = Object.freeze([
    "global",
    "loader",
    "modal",
    "panel",
    "panelMobile",
    "scroll",
    "userContext",
]);

export const MODAL_COMPONENTS = Object.freeze({ Modal: "ModalComponent" });
export const PANEL_COMPONENTS = Object.freeze({ Panel: "PanelComponent", PanelMobile: "PanelMobileComponent" });

// Loader settings
export const LOADER = Object.freeze({
    toCover: 0.5,
    cover: 0.4,
    firstLoad: 2,
    toUncover: 0.5,
});

