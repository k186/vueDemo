<template>
    <div id="home-wrapper" class="wrapper"><!--this div will be replaced by router-view -->
        <div id="home-scroller" class="scroller" style="background: #efeff4">
            <index-head></index-head>
            <nav-list :Nav="Nav"></nav-list>
            <my-footer></my-footer>
        </div>
        <alert></alert>
        <loading></loading>
    </div>
</template>
<script>
    import indexHead from '../../components/indexHead/indexHead'
    import navList from '../../components/navList/nav'
    import loading from '../../components/loading/loading'
    import alert from '../../components/alert/alert'
    import MyFooter from '../../components/footer/footer'
    import publicJs from  '../../publicJs/publicJs'
    import {} from 'vuex'
    export default {
        name: 'home',
        data: function () {
            let that = this;
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
                                icon: '&#xe609',
                                color: 'alert',
                                callback: function () {
                                    let alertBox = {
                                        title: '提示信息',
                                        body: '这里是简短的内容',
                                        callbackConfirm: function () {
                                            window.alert('确定回调')
                                        },
                                        callbackCancel: function () {
                                            window.alert('取消回调')
                                        }
                                    };
                                    that.$store.dispatch('alertInit', {alertBox})
                                }
                            },
                            {
                                name: 'loading',
                                router: '',
                                icon: '&#xe63f',
                                color: 'loading',
                                callback: function () {
                                    let loadingControl = {
                                        visible: false,
                                        type: '',
                                        message: '',
                                        mask: true,
                                    };
                                    that.$store.dispatch('loadingShow', {loadingControl});
                                    setTimeout(function () {
                                        that.$store.dispatch('loadingClose')
                                    },1500)
                                }
                            },
                            {
                                name: 'MusicPlayer',
                                router: '/Music/k186',
                                icon: '&#xe63f',
                                color: 'loading'
                            },
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
                ],
                myScroll:null
            }
        },
        components: {
            indexHead,
            navList,
            loading,
            alert,
            MyFooter
        },
        mounted(){
            let that=this;
            publicJs.initScroll({wrapper:'home-wrapper',scroller:'home-scroller',callbackFun:function (scroll) {
                that.myScroll=scroll
            }});
            console.log(this.$route)
        },
        beforeDestroy(){
            publicJs.destroy(this.myScroll)
        }
    }
</script>
<style scoped>
    @import "home.css";
</style>

