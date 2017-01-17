<template>
    <transition tag="div" name="loading">
        <div :class="loadingControl.mask?'mask loading-bg':'loading-bg'" v-if="loadingControl.visible">
            <div class="loading-box normal">
                <div v-if="loadingControl.type=='success'" class="loading-icon success">&#xe697;</div>
                <div v-if="loadingControl.type=='failed'" class="loading-icon failed">&#xe61c;</div>
                <div v-if="loadingControl.type=='loading'" class="loading-icon loading">&#xe600;</div>
                <div class="loading-text">{{loadingControl.message}}</div>
            </div>
        </div>
    </transition>
</template>
<style scoped>
    @font-face {
        font-family: 'loading';  /* project id 210409 */
        src: url('//at.alicdn.com/t/font_nqgnzpm27sxg8pvi.eot');
        src: url('//at.alicdn.com/t/font_nqgnzpm27sxg8pvi.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_nqgnzpm27sxg8pvi.woff') format('woff'),
        url('//at.alicdn.com/t/font_nqgnzpm27sxg8pvi.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_nqgnzpm27sxg8pvi.svg#iconfont') format('svg');
    }

    .loading-icon {
        font-family: "loading" !important;
        font-size: 1rem;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.001rem;
        -moz-osx-font-smoothing: grayscale;
    }

    .loading-icon {
        position: relative;
        height: 2.26667rem;
        line-height: 2.26667rem;
    }

    .loading-text, .loading-icon {
        text-align: center;
        color: white;
    }

    .loading-text {
        font-size: .37333rem;
    }

    .loading-bg {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: transparent;
    }

    .loading-box {
        position: absolute;
        width: 3.2rem;
        height: 3.2rem;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 4px;
    }

    .mask {
        background: rgba(255, 255, 255, .6)
    }

    .loading {
        animation-name: roate;
        animation-duration: 1.5s;
        animation-timing-function: cubic-bezier(0.3, 0.57, 0.62, 0.38);
        animation-iteration-count: infinite;
        animation-play-state: running;
        transform-origin:50% 50%;
        line-height: 2.36667rem;
    }

    @keyframes roate {
        0% {
            transform: rotate(0deg)
        }
        100% {
            transform: rotate(360deg)
        }
    }

    .normal {
        background: rgba(0, 0, 0, .75);
    }

    /*animation*/
    .loading-enter-active {
        -webkit-transition: all 1s cubic-bezier(0, 0.99, 0, 1);
        transition: all 1s cubic-bezier(0, 0.99, 0, 1);
        opacity: 1;
    }
    .loading-leave-active{
        -webkit-transition: all .2s ease-out;
        transition: all .2s ease-out;
        opacity: 1;
    }
    .loading-enter {
        opacity: 0;
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
    }

    .loading-leave-active {
        opacity: 0;
    }
</style>
<script>
    import {mapGetters} from 'vuex'
    export default{
        name: 'loading',
        computed: mapGetters({
            loadingControl: 'loadingControl'
        }),
        watch:{
            'loadingControl.visible':function (val, oldVal) {
                if (val) {
                    this.$nextTick(function () {
                        let divs = window.document.getElementsByTagName("*");
                        let max = 0;
                        for (let i = 0; i < divs.length; i++) {
                            if (/^\d+$/.test(getComputedStyle(divs[i])['z-index'])) {
                                max = Math.max(max, getComputedStyle(divs[i])['z-index'] || 0);
                            }
                        }
                        window.document.getElementsByClassName('loading-bg')[0].style.zIndex = max
                    })
                }
            }
        }
    }
</script>