<template>
    <div class="screen-full-container">
        <svg-icon
            icon-class="fullscreen"
            style="color: #fff; width: 20px; height: 20px"
            @click="fullscreen"
        ></svg-icon>
    </div>
</template>

<script>
import screenfull from "screenfull";
export default {
    data() {
        return {};
    },
    methods: {
        fullscreen() {

            screenfull.toggle()
        },
    },
};
</script>

<style lang="scss" scoped>
.screen-full-container {
    cursor: pointer;
}
</style>