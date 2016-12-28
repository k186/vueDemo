<template>
    <section>
        <div class="nav">
            数字转中文（javascript）
        </div>
        <div class="containeer">
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
        <div class="foot">
            <div class="input-box off">
                <input id="inputs" type="text" value="8548"/>
            </div>
        </div>
        <loading></loading>
    </section>
</template>
<style>
    @import "./asset/main.css";
</style>
<script>
    import '../../../static/pugin/number2word/number2words.js'
    import loading from '../../components/loading/loading'
    export default{
        name:'numberString',
        data:function () {
            return {

            }
        },
        mounted(){
            let output1=document.getElementById('output1');
            let output2=document.getElementById('output2');
            let output3=document.getElementById('output3');
            let output4=document.getElementById('output4');
            let inputs=document.getElementById('inputs');
            let option1={
                isTag:false
            };
            let option2={
                isTag:true,
                numTag:'span'
            };
            let option3={
                isTag:true,
                unitTag:'div'
            };
            let option4={
                isTag:true,
                numTag:'span',
                unitTag:'div'
            };
            let value=inputs.value;
            inputs.addEventListener('keyup',function () {
                value=inputs.value;
                Number2Wrods.config(option1).putStr(value,'output1');
                Number2Wrods.config(option2).putStr(value,'output2');
                Number2Wrods.config(option3).putStr(value,'output3');
                output4.innerHTML= Number2Wrods.config(option4).putStr(value)
            });
            Number2Wrods.config(option1).putStr(value,'output1');
            Number2Wrods.config(option2).putStr(value,'output2');
            Number2Wrods.config(option3).putStr(value,'output3');
            output4.innerHTML= Number2Wrods.config(option4).putStr(value)
        },
        components:{
            loading
        }
    }
</script>