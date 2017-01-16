<template>
    <div class="searchBar-Box">
        <div class="searchBar">
            <div v-show="!isFocus" class="searchBar-inputBox">
                <div class="searchBar-icon" @click="toggleSearch">
                    <i class="icon">&#xe609;</i>搜索
                </div>
            </div>
            <div v-show="isFocus" class="searchBar-inputBox">
                <input v-show="isFocus" class="searchBar-input" type="text" v-model.trim="searchValue" placeholder="搜索音乐、歌词、歌单">
                <i v-show="searchValue.length!=0" class="icon clearBtn" @click="clearSearchBar">&#xe609;</i>
            </div>
            <input v-show="isFocus" type="button" class="searchBar-button" value="取消" @click="toggleSearch">
        </div>
        <slot v-if="isFocus"></slot>
    </div>
</template>
<script>
    import publicJs from  '../../publicJs/publicJs'
    export default{
        name: 'searchBar',
        data(){
            return {
                isFocus: false,
                searchValue: 342432
            }
        },
        mounted(){

        },
        methods: {
            toggleSearch(){
                this.isFocus = !this.isFocus;
                if (this.isFocus) {
                    let that = this;
                    this.$nextTick(function () {
                        that.onFocus();
                    })
                } else {
                    this.clearSearchBar();
                }
            },
            clearSearchBar(){
                this.searchValue = '';
                if (this.isFocus) {
                    this.onFocus();
                } else {
                    this.onBlur();
                }

            },
            onFocus(){
                window.document.getElementsByClassName('searchBar-input')[0].focus();
            },
            onBlur(){
                window.document.getElementsByClassName('searchBar-input')[0].blur();
            }
        },
        computed: {}
    }
</script>