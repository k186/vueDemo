<template>
    <div class="alert-mask" v-if="alert.visible">
        <div class="alert-box">
            <div class="alert-title">{{alert.title}}</div>
            <div class="alert-body">{{alert.body}}</div>
            <div class="alert-control">
                <div class="alert-btn column"><a @click="confirm">{{alert.btn.ok}}</a></div>
                <div v-if="alert.type=='confirm'" class="alert-btn"><a @click="cancel">{{alert.btn.cancel}}</a></div>
            </div>
        </div>
    </div>
</template>
<style>
    .alert-mask,.alert-box{
        position: absolute;
        margin: auto;
        top:0;
        bottom:0;
        left: 0;
        right: 0;
    }
    .alert-mask{
        background: rgba(0,0,0,.4);
    }
    .alert-box{
        height: 4.7733rem;
        width: 7.2rem;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 10px;
        color: #333333;
        font-size: 0.45333rem;
        text-align: center;
    }
    .alert-title,.alert-body{
        padding-left:.266667rem ;
        padding-right:.266667rem ;
        word-wrap: break-word;
    }
    .alert-title{
        font-weight: bold;
        padding-top: 0.6rem;
    }
    .alert-body{
        font-size: .37333rem;
        max-height: 2.16667rem;
        overflow: hidden;
    }
    .alert-control{
        position: absolute;
        bottom: 0;
        width: inherit;
        height: 1.18667rem;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        border-radius: 0 0 10px 10px ;
        overflow: hidden;
    }
    .column:before{
        content: '';
        position: absolute;
        left: 3.6rem;
        background: #b2b2b2;
        width: 1px;
        height: 100%;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }
    .alert-control:before{
         content: '';
         position: absolute;
         left: 0;
         background: #b2b2b2;
         width: 100%;
         height: 1px;
         -webkit-transform: scaleY(0.5);
         transform: scaleY(0.5);
         -webkit-transform-origin: 0 0;
         transform-origin: 0 0;
     }
    .alert-btn{
        width: 100%;
        height: inherit;
        line-height: 1.18667rem;
        color: #007aff;
    }
    .alert-btn a{
        display: block;
        width: 100%;
        height: inherit;
        line-height: 1.18667rem;
        color: #007aff;
        font-size: 0.45333rem;
    }
    .alert-btn a:active{
        background: #e8e8e8;
    }
</style>
<script>
    import {mapGetters,mapActions} from 'vuex'
    export default{
        name:'alertBox',
        computed:mapGetters({
            alert: 'alertBox'
        }),
        methods:mapActions({
            confirm:'alertConfirm',
            cancel:'alertCancel'
        }),
        watch:{
            'alert.visible':function (val,old) {
                if(val){
                    this.$nextTick(function () {
                        let divs = window.document.getElementsByTagName("*");
                        let max = 0;
                        for (let i = 0; i < divs.length; i++) {
                            if( /^\d+$/.test(getComputedStyle(divs[i])['z-index'])){
                                max = Math.max(max, getComputedStyle(divs[i])['z-index'] || 0);
                            }
                        }
                        window.document.getElementsByClassName('alert-mask')[0].style.zIndex=max
                    })
                }

            }
        }
    }
</script>