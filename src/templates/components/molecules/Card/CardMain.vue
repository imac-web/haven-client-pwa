<template>
    <div class="m-card-main">
        <div class="m-card-main__content">
            <div class="m-card-main__content-top">
                <h3 v-if="isResultsEmpty">Erreur</h3>
                <h3 v-else>Score d'habitabilité</h3>
            </div>
            <div v-if="isResultsEmpty" class="m-card-main__content-bottom">
                <button-primary
                    label="Recommencer le calcul"
                    tag="a"
                    class="m-card-main__content-bottom-btn"
                    @click="restartCalculations"
                />
            </div>
            <div v-else class="m-card-main__content-bottom">
                <ve-progress
                    v-if="loading"
                    :loading="loading"
                    :size="160"
                    emptyColor="rgba(255, 255, 255, 0.1)"
                    :thickness="15"
                    :empty-thickness="15"
                    color="#25c685"
                    ><template #legend-caption>
                        <div class="loading loading-0"></div>
                        <div class="loading loading-1"></div>
                        <div class="loading loading-2"></div></template
                ></ve-progress>
                <ve-progress
                    v-else
                    :progress="score * 10"
                    :angle="90"
                    :size="160"
                    emptyColor="rgba(255, 255, 255, 0.1)"
                    :thickness="15"
                    :empty-thickness="15"
                    :legend="score"
                    :legend-formatter="myFormatter"
                    color="#25c685"
                ></ve-progress>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { VeProgress } from "vue-ellipse-progress";
import emitter from "@/services/emitter";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";

export default defineComponent({
    name: "CardMain",
    components: {
        VeProgress,
        ButtonPrimary,
    },
    props: {
        score: {
            type: Number,
            required: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        isResultsEmpty: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["restartCalculations"],
    setup(props) {
        const score = toRef(props, "score");
        const loading = toRef(props, "loading");
        const isResultsEmpty = toRef(props, "isResultsEmpty");

        function setToFixed(v) {
            return v % 1 ? v.toFixed(1) : v;
        }

        const myFormatter = ({ currentValue }) => {
            return `
        <span style="font-weight: bold; font-size: 5rem; line-height: 4rem;display: inline-block; margin-top: 0.5rem;">${currentValue}</span>
        <br/>
        <span style="opacity:0.5; font-size: 2rem; text-transform:uppercase; line-height: 1rem;"> sur 10</span>
      `;
        };

        function restartCalculations(e) {
            emitter.emit("restart-calculations", e);
        }

        return {
            score,
            loading,
            isResultsEmpty,
            setToFixed,
            myFormatter,
            restartCalculations,
        };
    },
});
</script>

<style lang="scss" scoped>
.m-card-main {
    --bg-color: var(--color-haven_dark_grey);
    background-color: var(--bg-color);
    border-radius: 1rem;

    height: 24rem;
    width: 100%;
    padding: 1rem;

    &__content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        &-top {
            text-align: center;
            h3 {
                font-variant: small-caps;
                font-size: var(--fs-regular);
                font-weight: 700;
                margin-top: 0;
            }
        }
        &-bottom {
            text-align: center;

            &-btn {
                --color-white-alpha: rgba(255, 255, 255, 0.15);
                --btn-bg-color: transparent;
                --btn-border-color: var(--color-haven_white);
                --btn-txt-color: var(--color-haven_red);
                --btn-hover-color: var(--color-white-alpha);
            }
        }
    }
}

.loading {
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 100%;
    float: left;
    margin-right: 5px;
}
.loading-0 {
    -webkit-animation: bounce 1s infinite;
    -webkit-animation-delay: 0.1s;
    background: var(--color-haven_green);
}
.loading-1 {
    -webkit-animation: bounce 1s infinite;
    -webkit-animation-delay: 0.3s;
    background: var(--color-haven_green);
}
.loading-2 {
    -webkit-animation: bounce 1s infinite ease;
    -webkit-animation-delay: 0.5s;
    background: var(--color-haven_green);
}
@-webkit-keyframes bounce {
    0%,
    100% {
        opacity: 1;
    }
    60% {
        opacity: 0;
    }
}
</style>
