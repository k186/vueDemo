<template>
  <section>
    <div class="nav">
      数字转中文（javascript）
    </div>
    <div class="containeer wrapper" id="number-wrapper">
      <div id="number-scroller" class="scroller">
        <div class="cell">
          <div class="cell-title">通配</div>
          <div class="cell-output" id="output1"></div>
        </div>
        <div class="cell">
          <div class="cell-title">有数字标签(span)</div>
          <div class="cell-output" id="output2"></div>
        </div>
        <div class="cell">
          <div class="cell-title">有单位标签(div)</div>
          <div class="cell-output" id="output3"></div>
        </div>
        <div class="cell">
          <div class="cell-title">都有标签(span+div)</div>
          <div class="cell-output" id="output4"></div>
        </div>
        <div class="cell github">
          <a href="https://github.com/k186/number2words" target="_Blank" class="iconfont">&#xe600</a>
          k186
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="input-box off">
        <input id="inputs" type="text" value="8548"/>
      </div>
    </div>
  </section>
</template>
<style lang="scss" rel="stylesheet/scss" src="./asset/main.scss"></style>
<script>
  import '../../../static/pugin/number2word/number2words.js'
  import publicJs from '../../publicJs/publicJs'
  export default{
    name: 'numberString',
    data () {
      return {
        myScroll: null
      }
    },
    mounted () {
      let output4 = document.getElementById('output4')
      let inputs = document.getElementById('inputs')
      let value = inputs.value
      inputs.addEventListener('keyup', function () {
        value = inputs.value
        window.Number2Wrods.config({isTag: false}).putStr(value, 'output1')
        window.Number2Wrods.config({isTag: true, numTag: 'span'}).putStr(value, 'output2')
        window.Number2Wrods.config({isTag: true, unitTag: 'div'}).putStr(value, 'output3')
        output4.innerHTML = window.Number2Wrods.config({isTag: true, numTag: 'span', unitTag: 'div'}).putStr(value)
      })
      window.Number2Wrods.config({isTag: false}).putStr(value, 'output1')
      window.Number2Wrods.config({isTag: true, numTag: 'span'}).putStr(value, 'output2')
      window.Number2Wrods.config({isTag: true, unitTag: 'div'}).putStr(value, 'output3')
      output4.innerHTML = window.Number2Wrods.config({isTag: true, numTag: 'span', unitTag: 'div'}).putStr(value)
      let that = this
      publicJs.initScroll({
        wrapper: 'number-wrapper',
        scroller: 'number-scroller',
        callbackFun: function (scroll) {
          that.myScroll = scroll
        }
      })
    },
    beforeDestroy () {
      publicJs.destroy(this.myScroll)
    }
  }
</script>
