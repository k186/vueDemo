<template>
    <div class="mobile-picker">
        <div class="picker-control">
            <div class="control-cancel">取消</div>
            <div class="control-ok">确定</div>
        </div>
        <div class="picker-panel">
            <div class="panel-box">
                <div class="box-year">
                    <div class="year-checked">
                        <div class="year-list">
                            <div v-for="year in yearList">{{year}}</div>
                        </div>
                    </div>
                    <div class="year-wheel" style=" transform: rotate3d(1, 0, 0,0deg) translate3d(0px, 0px, 1.16667rem);">
                        <div class="wheel-div" v-for="year in yearList" style="transform: rotate3d(1, 0, 0,0deg) translate3d(0px, 0px, 1.16667rem);">{{year}}</div>
                    </div>
                </div>
                <div class="box-month">
                    <div class="month-checked">
                        <div class="month-list">
                            <div v-for="month in monthList">{{month}}</div>
                        </div>
                    </div>
                    <div class="month-wheel">
                        <div class="wheel-div" v-for="month in monthList">{{month}}</div>
                    </div>
                </div>
                <div class="box-day">
                    <div class="day-checked">
                        <div class="day-list">
                            <div v-for="day in dayList">{{day}}</div>
                        </div>
                    </div>
                    <div class="day-wheel">
                        <div class="wheel-div" v-for="day in dayList">{{day}}</div>
                    </div>
                </div>
             <!--   <div class="box-hour"></div>
                <div class="box-minute"></div>-->
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'pickerMobile',
        data(){
            return {
                yearList:[2014,2015,2016,2017,2018,2019,2020],
                monthList:[0,1,2,3,4,5,6,7,8,9,10,11,12],
                dayList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            }
        },
        computed: {},
        methods: {}
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import "pickerMobile.css";
</style>