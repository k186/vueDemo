<template>
    <div class="searchBar-Box">
      <div class="searchBar">
        <div v-show="!isFocus" class="searchBar-inputBox">
          <div class="searchBar-icon" @click="toggleSearch">
            <i class="icon">&#xe603;</i>搜索
          </div>
        </div>
        <div v-show="isFocus" class="searchBar-inputBox">
          <input v-show="isFocus" class="searchBar-input" type="text" v-model.trim="searchValue" placeholder="搜索音乐、歌词、歌单">
          <i v-show="searchValue.length!=0" class="icon clearBtn" @click="clearSearchBar">&#xe6bf;</i>
        </div>
        <input v-show="isFocus" type="button" class="searchBar-button" value="取消" @click="toggleSearch">
      </div>
        <transition name="history">
            <search-history v-if="isFocus"></search-history>
        </transition>
    </div>
</template>
<script>
    import publicJs from  '../../publicJs/publicJs'
    import urlMapping from '../../api/urlMapping'
    import searchHistory from './searchHistory'
    export default{
        name: 'searchBar',
        components:{
            searchHistory
        },
        data(){
            return {
                isFocus: false,
                searchValue: ''
            }
        },
        mounted(){
            publicJs.setIndex('searchBar-Box');
            this.initHistory();
            let that=this;
            $('.searchBar-input').on('keydown',function (e) {
                if(e.keyCode==13){
                   that.searchEvt();
                }
            })
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
            },
            initHistory(){
                let that=this;
                let Map=new urlMapping();
                Map.ajaxGetData({
                    url: 'GET_SEARCH_HISTORY',
                    type: 'get',
                    data: {},
                    callback:function (data) {
                        if(data.success){
                            if(data.model){
                                let searchHistory=data.model;
                                that.$store.dispatch('intHistory',{searchHistory})
                            }
                        }
                    }
                })
            },
            searchEvt(){
                let Map=new urlMapping();
                let that=this;
                if(that.searchValue!=''){
                    Map.ajaxGetData({
                        url: 'GET_SEARCH_RESULT',
                        type: 'get',
                        data: {searchValue:that.searchValue},
                        callback:function (data) {
                            if(data.success){
                                if(data.model){
                                    //todo set list data
                                    window.alert('获取搜索结果成功')
                                }
                            }
                        }
                    })
                }else {
                    let loadingControl={
                        visible: true,
                        type: 'failed',
                        message: '请输入搜索内容',
                        mask: false,
                    };
                 that.$store.dispatch('loadingShow',{loadingControl});
                 setTimeout(function () {
                     that.$store.dispatch('loadingClose');
                 },1500);
                }
            }
        },
        computed: {}
    }
</script>