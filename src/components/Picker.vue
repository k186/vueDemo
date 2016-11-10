<template>
    <div class="Picker">
        <!-- <div class="inputBox">
             <div class="input">2016-1-8 15:04</div>
         </div>-->
        <!--这里解决input 出发键盘的方法是 给input 设置 readonly属性-->
        <div class="datePane">
            <div class="yearBox">
                <ul>
                    <li class="previousBtn"><i class="kDatePicker k-previous"></i></li>
                    <li class="Title">2016-10</li>
                    <li class="nextBtn"><i class="kDatePicker k-next"></i></li>
                </ul>
            </div>
            <div class="chooseBox">
                <div class="chooseYear" style="display: none">
                    <!--for 12 year-->
                    <ul class="yearList">
                        <li class="previousChoose">2011</li>
                        <li>2012</li>
                        <li>2013</li>
                        <li>2014</li>
                        <li>2015</li>
                        <li>2016</li>
                        <li>2017</li>
                        <li>2018</li>
                        <li>2019</li>
                        <li>2020</li>
                        <li>2021</li>
                        <li class="previousChoose">2022</li>
                    </ul>
                </div>
                <div class="chooseMonth" style="display: none">
                    <!--for 12 month-->
                    <ul class="monthList">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                    </ul>
                </div>
                <div class="chooseDay">
                    <ul class="dayTitle">
                        <!-- for language title-->
                        <li>日</li>
                        <li>一</li>
                        <li>二</li>
                        <li>三</li>
                        <li>四</li>
                        <li>五</li>
                        <li>六</li>
                    </ul>
                    <ul class="dayList">
                        <li class="previousChoose">1</li>
                        <li class="previousChoose">2</li>
                        <li class="previousChoose">3</li>
                        <li class="previousChoose">4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li class="singleChoosed">18</li>
                        <li>19</li>
                        <li>20</li>
                        <li>21</li>
                        <li>22</li>
                        <li>23</li>
                        <li>24</li>
                        <li class="mulitChoosedHead">25</li>
                        <li class="mulitChoosed">26</li>
                        <li class="mulitChoosed">27</li>
                        <li class="mulitChoosed">28</li>
                        <li class="mulitChoosed">29</li>
                        <li class="mulitChoosed">30</li>
                        <li class="mulitChoosed">31</li>
                        <li class="mulitChoosedEnd">32</li>
                        <li>33</li>
                        <li>34</li>
                        <li>35</li>
                        <li>36</li>
                        <li>37</li>
                        <li>38</li>
                        <li class="canNotChoose">39</li>
                        <li class="canNotChoose">40</li>
                        <li class="canNotChoose">41</li>
                        <li class="canNotChoose">42</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Picker',
        data () {
            return {
                msg: 'Welcome to Your Vue.js pp'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import "css/datapicker.css";
</style>
