<template>
<div class="loading-bg" v-if="loading.visible">
    <div class="loading-box normal">
        <div v-if="type=='loading.success'" class="loading-icon success">&#xe697;</div>
        <div v-if="type=='loading.failed'" class="loading-icon failed">&#xe61c;</div>
        <div v-if="type=='loading.loading'" class="loading-icon loading">&#xe638;</div>
        <div class="loading-text">{{loading.message}}</div>
    </div>
</div>
</template>
<style scoped>
    @font-face {
        font-family: 'loading';  /* project id 210409 */
        src: url('//at.alicdn.com/t/font_gr362vezd6t21emi.eot');
        src: url('//at.alicdn.com/t/font_gr362vezd6t21emi.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_gr362vezd6t21emi.woff') format('woff'),
        url('//at.alicdn.com/t/font_gr362vezd6t21emi.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_gr362vezd6t21emi.svg#iconfont') format('svg');
    }
    .loading-icon{
        font-family:"loading" !important;
        font-size:1rem;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.001rem;
        -moz-osx-font-smoothing: grayscale;
    }
    .loading-text,.loading-icon{
        text-align: center;
        color: white;
    }
    .loading-text{
        font-size: .4rem;
    }
    .loading-bg{
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
       background: transparent;
    }
    .loading-box{
        position: absolute;
        width: 4rem;
        height: 2.6667rem;
        margin: auto;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 4px;
    }
    .mask{
        background: rgba(255,255,255,.6)
    }
    .loading{
        animation-name: roate;
        animation-duration: 1.5s;
        animation-timing-function: cubic-bezier(0.3, 0.57, 0.62, 0.38);
        animation-iteration-count: infinite;
        animation-play-state: running;
    }
    @keyframes roate {
        0%{transform: rotate(0deg)}
        100%{transform: rotate(360deg)}
    }
    .normal{
        background: rgba(0,0,0,.8);
        box-shadow: 0 1px 20px 2px rgba(140, 140, 140, 0.9);
    }
</style>
<script>
    import {mapGetters} from 'vuex'
    export default{
        name:'loading',
        data(){
          return  {
              loading:{
                  message:'432432',
                  type:'loading',
                  visible:true
              }
          }
        },
        computed:mapGetters({
          loading:'loading'
        }),
        mounted(){
            /*updating z-index value*/
            this.$nextTick(function () {
                let divs = document.getElementsByTagName("div");
                let max = 0;
                for (let i = 0; i < divs.length; i++) {
                    if( /^\d+$/.test(getComputedStyle(divs[i])['z-index'])){
                        max = Math.max(max, getComputedStyle(divs[i])['z-index'] || 0);
                    }
                }
                document.getElementsByClassName('loading-bg')[0].style.zIndex=max
            })
        }
    }
</script>