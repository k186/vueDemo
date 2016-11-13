<template>
  <transition name="slide-fade">
    <div class="k-datePicker" v-if="visible">
        <div class="datePane">
            <div class="yearBox" v-show="panelType =='day'">
                <ul>
                    <li class="previousBtn" v-on:click="changeMonth('previous')"><i class="kDatePicker k-previous"></i></li>
                    <li class="Title"  v-on:click="changeType('month')">{{tmpYear}} {{monthList[tmpMonth]}}</li>
                    <li class="nextBtn" v-on:click="changeMonth('next')"><i class="kDatePicker k-next"></i></li>
                </ul>
            </div>
            <div class="yearBox" v-show="panelType =='month'">
                <ul>
                    <li class="previousBtn" v-on:click="changeYear('previous')"><i class="kDatePicker k-previous"></i></li>
                    <li class="Title" v-show="panelType =='month'" v-on:click="changeType('year')">{{tmpYear}}</li>
                    <li class="nextBtn" v-on:click="changeYear('next')"><i class="kDatePicker k-next"></i></li>
                </ul>
            </div>
            <div class="yearBox" v-show="panelType=='year'">
                <ul>
                    <li class="previousBtn" v-on:click="changeYearRange('previous')"><i class="kDatePicker k-previous"></i></li>
                    <li class="Title">{{yearList[0]}}-{{yearList[yearList.length-1]}}</li>
                    <li class="nextBtn" v-on:click="changeYearRange('next')"><i class="kDatePicker k-next"></i></li>
                </ul>
            </div>
            <div class="chooseBox">
                <div class="chooseYear" v-show="panelType=='year'">
                    <!--for 12 year-->
                    <ul class="yearList">
                        <!-- <li class="previousChoose">2011</li>-->
                        <li v-for="year in yearList"
                            v-on:click="selectYear(year)"
                            v-bind:class="{singleChoosed:isSelected('year',year),canNotChoose:!validYear(year)}"
                        >{{ year }}</li>
                        <!--<li class="previousChoose">2022</li>-->
                    </ul>
                </div>
                <div class="chooseMonth" v-show="panelType=='month'">
                    <!--for 12 month-->
                    <ul class="monthList">
                        <li v-for="(month,index) in monthList"
                            v-on:click="selectMonth(index)"
                            v-bind:class="{singleChoosed:isSelected('month',index),canNotChoose:!validMonth(index)}"
                      >{{ month|monthF(language)}}</li>
                    </ul>
                </div>
                <div class="chooseDay" v-show="panelType=='day'">
                    <ul class="dayTitle">
                        <!-- for language title-->
                        <li v-for="week in weekList">{{week|weekF(language)}}</li>
                    </ul>
                    <ul class="dayList">
                        <!--  <li class="previousChoose">1</li>-->
                        <li v-for="day in daylist"
                            ref="input"
                            v-bind:class="{previousChoose:day.previousMonthDay||day.nextMonthDay,singleChoosed:isSelected('day',day),canNotChoose:!validDay(day)}"
                            v-on:click="selectDay(day)"
                        >{{day.value}}</li>
                        <!-- <li class="singleChoosed">18</li>-->
                        <!-- <li class="mulitChoosedHead">25</li>
                         <li class="mulitChoosed">31</li>
                         <li class="mulitChoosedEnd">32</li>-->
                        <!-- <li class="canNotChoose">39</li>-->
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>

<script src="./datepicker.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "./css/datapicker.css";
</style>
