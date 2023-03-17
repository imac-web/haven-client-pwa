

/*
 * Utilities
 *
 * Usage:
 * import { aFunction } from "@/utils";
 * aFunction()
 *
 */

import mutateState from "./mutateState";
import resizeEnd from "./resizeEnd";
import userContext from "./userContext";
import typeCheck from "./typeCheck";
import invertGeocoding from "./invertGeocoding";
import fetchServices from "./fetchServices";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = "ontouchstart" in document.documentElement;

export {
    isTouch,
    mutateState,
    resizeEnd,
    userContext,
    typeCheck,
    reducedMotion,
    invertGeocoding,
    fetchServices,

};
