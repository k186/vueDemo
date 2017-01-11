<template>
    <div>
        <index-head></index-head>
        <nav-list :Nav="Nav"></nav-list>
        <loading></loading>
        <alert></alert>
    </div>
</template>

<script>
    import indexHead from '../../components/indexHead/indexHead'
    import navList from '../../components/navList/nav'
    import loading from '../../components/loading/loading'
    import alert from '../../components/alert/alert'
    import {} from 'vuex'
    export default {
        name: 'home',
        data: function () {
            let that=this;
            return {
                Nav: [
                    {
                        label: 'vue-Components',
                        box: [
                            {
                                name: 'PC-picker',
                                router: '/pcPicker',
                                icon: '&#xe676',
                                color: 'pc'
                            },
                            {
                                name: 'ios滚轮',
                                router: '/ios',
                                icon: '&#xe62b',
                                color: 'ios'
                            },
                            {
                                name: '弹窗',
                                router: '',
                                icon: '&#xe62b',
                                color: 'ios',
                                callback:function () {
                                    let alertBox = {
                                        title: '提示信息',
                                        body: '',
                                        callbackConfirm: function () {
                                            window.alert('确定回调')
                                        },
                                        callbackCancel: function () {
                                            window.alert('取消回调')
                                        }
                                    };
                                    that.$store.dispatch('alertInit', {alertBox})
                                }
                            }
                        ]
                    },
                    {
                        label: '原生js插件',
                        box: [
                            {
                                name: '数字转中文大写',
                                router: '/number2words',
                                icon: '&#xe62c',
                                color: 'translate'
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            indexHead,
            navList,
            loading,
            alert
        }
    }
</script>
<style scoped>
    @import "home.css";
</style>

