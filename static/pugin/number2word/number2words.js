/**
 * Created by K186 on 2016/11/3.
 */
(function(){
    var option={
        isTag:false,
        numTag:null,
        unitTag:null
    };
    var reg = /^[1-9]\d{0,11}$|^\d{1}\.\d{1,3}$|^[0]$|^[0-9]\d{0,11}\.\d{1,3}$/; //整数12位非0开头 小数0开头0.123 小数非0开头123...12.123
    /*var str='^[1-9]\\d{0,11}$|^\\d{1}\\.\\d{1,3}$|^[1-9]\d{0,11}\\.\\d{1,3}$';
     var regs=new RegExp(str,'g');*/
    var decimal,inter;
    var newNum = [],
        newUnit = [],
        numArr = [],
        result = '';
    /*判断转换*/
    function number2words(numberStr,containerId){
        var unit = [ "元", "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿", "拾", "佰", "仟"];
        var nums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        result='';
        var container=document.getElementById(containerId);
        /*验证最多3位小数*/
        if (!reg.test(numberStr)) {
            console.warn('请输入有效的数字,最多保留3位小数，整数部分最大12位');
            result= '请输入有效的数字,最多保留3位小数,整数部分最大12位';
            return output(container);
        }
        //获取整数和小数部分
        inter=numberStr.toString().split(".")[0];
        decimal=numberStr.toString().split(".")[1];
        //小数
        if(decimal){
            decimal=decimal.length;//小数长度最大3
            if (decimal == 1) {
                unit.unshift("角");
                numberStr=getNumberStr(numberStr,1);
            } else if (decimal == 2) {
                unit.unshift("分","角");
                numberStr=getNumberStr(numberStr,2);
            } else if (decimal == 3) {
                unit.unshift("厘","分","角");
                numberStr=getNumberStr(numberStr,3);
            }
        }
        //整数
        if(inter){
            inter=inter.length;//整数长度必须小雨13
            numArr = numberStr.split("").reverse();//拆成数组反转
            //如果要设置tag包裹
            if (option.isTag) {
                //转换成中文暂时放入 newNum 和newUnit
                if (option.numTag || option.unitTag) {
                    for (var i in numArr) {
                        newNum[i] = nums[numArr[i]];
                        newUnit[i] = unit[i];
                    }
                    newNum = newNum.reverse();
                    newUnit = newUnit.reverse();
                    if (option.numTag&&option.unitTag==null) {
                        for (var i in newNum) {
                            result += '<' + option.numTag + '>' + newNum[i] + '</' + option.numTag + '>' + newUnit[i];
                        }
                        return output(container);
                    } else if (option.unitTag&&option.numTag==null) {
                        for (var i in newNum) {
                            result += newNum[i] + '<' + option.unitTag + '>' + newUnit[i] + '</' + option.unitTag + '>';
                        }
                        return output(container);
                    } else if (option.unitTag && option.numTag) {
                        for (var i in newNum) {
                            result += '<' + option.numTag + '>' + newNum[i] + '</' + option.numTag + '>' + '<' + option.unitTag + '>' + newUnit[i] + '</' + option.unitTag + '>';
                        }
                        return output(container);
                    }
                } else {
                    console.warn('包裹标签为空');
                    result= '包裹标签为空';
                    return output(container);
                }
            } else {//不设置tag包裹
                for (var i in numArr) {
                    result += unit[i] + nums[numArr[i]]
                }
                result = result.split('').reverse().join("");
                return output(container);
            }
        }
    }
    /*输出结果*/
    function output(container) {
        if (container){
            container.innerHTML=result;
        }else {
            return result;
        }
    }
    /*获取没有小数点的数字字符串*/
    function getNumberStr(numberStr,len){
        numberStr = new Number(numberStr).toFixed(len);//小数
        return numberStr.toString().replace(/\./g, "");//干掉小数点 变成字符串
    }
    /*对外接口*/
    var api={
        config:function(opts){
            if(!opts){
                return option;
            }else {
                for(var key in opts){
                    option[key]=opts[key];
                }
            }
            return this;
        },
        putStr:function(numberStr,containerId){
            if(containerId){
                if(typeof numberStr=='string'){
                    number2words(numberStr,containerId);
                }
                return this;
            }else {
                if(typeof numberStr=='string'){
                   return number2words(numberStr,containerId);
                }

            }

        }
    };
    /*插件名字*/
    this.Number2Wrods=api;
})();