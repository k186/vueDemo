<template>
    <div>
        <index-head></index-head>
        <nav-list :Nav="Nav"></nav-list>
        <loading></loading>
    </div>
</template>

<script>
    import indexHead from '../../components/indexHead/indexHead'
    import navList from '../../components/navList/nav'
    import loading from '../../components/loading/loading'
    export default {
        name: 'home',
        data: function () {
            return {
                Nav: [
                    {
                        label: 'vue-Components',
                        box: [
                            {
                                name: 'PC-picker',
                                router: '/pcPicker',
                                icon:'&#xe676',
                                color:'pc'
                            },
                            {
                                name:'ios滚轮',
                                router:'/ios',
                                icon:'&#xe62b',
                                color:'ios'
                            }
                        ]
                    },
                    {
                        label:'原生js插件',
                        box:[
                            {
                                name:'数字转中文大写',
                                router:'/number2words',
                                icon:'&#xe62c',
                                color:'translate'
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            indexHead,
            navList,
            loading
        }
    }
</script>
<style scoped>
    @import "home.css";
</style>

