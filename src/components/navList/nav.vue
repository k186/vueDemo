<template>
    <div>
        <div v-for="nav in Nav">
            <nav-label :label="nav.label"></nav-label>
            <nav-box :data="nav.box"></nav-box>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    import navLabel from '../navLabel/label'
    import navBox from '../navbox/navbox'
    export default{
        name: 'navList',
        data(){
            return {
                Nav: [
                    {
                        label: '第一个label',
                        box: [
                            {
                                name: 'box1',
                                router: 'touter1'
                            },
                            {
                                name: 'box1',
                                router: 'toutfdsfer1'
                            },
                            {
                                name: 'box1',
                                router: 'toufdsfter1'
                            },
                            {
                                name: 'box1',
                                router: 'toutsdfsdfer1'
                            },
                        ]
                    },
                    {
                        label: '第二个label',
                        box: [
                            {
                                name: 'box2',
                                router: 'touter2'
                            },
                            {
                                name: 'box2',
                                router: 'toutfdsfer2'
                            },
                            {
                                name: 'box色达1',
                                router: 'toufdsfte的撒发r1'
                            },
                            {
                                name: 'bsdfox1',
                                router: 'toutsdfs第三方adfer1'
                            },
                        ]
                    }
                ]
            }
        },
        components: {
            navLabel,
            navBox
        }
    }
</script>