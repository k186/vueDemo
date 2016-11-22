<template>
	<transition name="datePicer-Toggle">
		<!-- stop bubble-->
		<div class="k-datePicker" v-if="visible" v-on:click.stop>
			<div class="datePane">
				<transition-group :name="animateTitle" class='titlePanel' tag='div'>
					<div class="yearBox" key="day" v-show="panelType =='day'">
						<ul>
							<li class="previousBtn" v-on:click="changeMonth('previous')"><i class="kDatePicker k-previous"></i></li>
							<li class="Title" v-on:click="changeType('month')">
								<transition-group :name='changeTiltle' class='changeTitle' tag="div">
									<span v-bind:key="tmpYear">{{tmpYear}}</span>
								</transition-group>
								<transition-group :name='changeTiltle' class='changeTitle' tag="div">
									<span v-bind:key="tmpMonth">{{monthList[tmpMonth]|monthF(options.language)}}</span>
								</transition-group>
								<!--<span v-bind:key="tmpMonth">{{tmpYear}} {{monthList[tmpMonth]|monthF(language)}}</span>-->
							</li>
							<li class="nextBtn" v-on:click="changeMonth('next')"><i class="kDatePicker k-next"></i></li>
						</ul>
					</div>
					<div class="yearBox" key="month" v-show="panelType =='month'">
						<ul>
							<li class="previousBtn" v-on:click="changeYear('previous')"><i class="kDatePicker k-previous"></i></li>
							<li class="Title" v-show="panelType =='month'" v-on:click="changeType('year')">
								<transition-group :name='changeTiltle' tag="div" class='changeYearTitle'>
									<span v-bind:key="tmpYear">{{tmpYear}}</span>
								</transition-group>
							</li>
							<li class="nextBtn" v-on:click="changeYear('next')"><i class="kDatePicker k-next"></i></li>
						</ul>
					</div>
					<div class="yearBox" key="year" v-show="panelType=='year'">
						<ul>
							<li class="previousBtn" v-on:click="changeYearRange('previous')"><i class="kDatePicker k-previous"></i></li>
							<li class="Title">
								<transition-group :name='changeTiltle' tag="div" class='changeYearTitle'>
									<span v-bind:key="yearList[0]"> {{yearList[0]}}-{{yearList[yearList.length-1]}}</span>
								</transition-group>
							</li>
							<li class="nextBtn" v-on:click="changeYearRange('next')"><i class="kDatePicker k-next"></i></li>
						</ul>
					</div>
				</transition-group>
				<transition-group :name="animatePanel" class="chooseBox" tag='div'>
					<div class="chooseYear" key='year' v-show="panelType=='year'">
						<!--for 12 year-->
						<transition-group :name='animateMonth' class="change-year-Box" tag="div">
							<ul class="yearList" v-bind:key="yearList[0]">
								<!-- <li class="previousChoose">2011</li>-->
								<li v-for="year in yearList"
										v-on:click="selectYear(year)"
										v-bind:class="{singleChoosed:isSelected('year',year),canNotChoose:!validYear(year)}"
								>{{ year }}
								</li>
								<!--<li class="previousChoose">2022</li>-->
							</ul>
						</transition-group>
					</div>
					<div class="chooseMonth" key='month' v-show="panelType=='month'">
						<!--for 12 month-->
						<transition-group :name='animateMonth' class="change-year-Box" tag="div">
							<ul class="monthList" v-bind:key="tmpYear">
								<li v-for="(month,index) in monthList"
										v-on:click="selectMonth(index)"
										v-bind:class="{singleChoosed:isSelected('month',index),canNotChoose:!validMonth(index)}"
								>{{ month|monthF(options.language)}}
								</li>
							</ul>
						</transition-group>
					</div>
					<div class="chooseDay" key='day' v-show="panelType=='day'">
						<ul class="dayTitle">
							<!-- for language title-->
							<li v-for="week in weekList">{{week|weekF(options.language)}}</li>
						</ul>
						<transition-group :name='animateMonth' class="change-Month-Box" tag="div">
							<ul class="dayList" v-bind:key="tmpMonth">
								<!--  <li class="previousChoose">1</li>-->
								<li v-for="day in daylist"
										ref="input"
										v-bind:class="{previousChoose:day.previousMonthDay||day.nextMonthDay,singleChoosed:isSelected('day',day),canNotChoose:!validDay(day)}"
										v-on:click="selectDay(day)"
								>{{day.value}}
								</li>
								<!-- <li class="singleChoosed">18</li>-->
								<!-- <li class="mulitChoosedHead">25</li>
								 <li class="mulitChoosed">31</li>
								 <li class="mulitChoosedEnd">32</li>-->
								<!-- <li class="canNotChoose">39</li>-->
							</ul>
						</transition-group>
					</div>
					<div class="chooseTime" key='time'>
						<transition-group :name='animateMonth' class="change-Month-Box" tag="div">
							<ul class="dayList" v-bind:key="tmpMonth">
								<!--  <li class="previousChoose">1</li>-->
								<li v-for="time in timeList"
										ref="input"
								>{{time.H}}
								</li>
								<!-- <li class="singleChoosed">18</li>-->
								<!-- <li class="mulitChoosedHead">25</li>
								 <li class="mulitChoosed">31</li>
								 <li class="mulitChoosedEnd">32</li>-->
								<!-- <li class="canNotChoose">39</li>-->
							</ul>
						</transition-group>
					</div>
				</transition-group>
			</div>
		</div>
	</transition>
</template>

<script src="./datepicker.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "./css/datapicker.css";



</style>
