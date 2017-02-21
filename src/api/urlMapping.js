/**
 * Created by k186 on 2016/12/28.
 */
class urlMapping {
    constructor () {
        this.isLocal = window.location.hostname.toUpperCase() === 'LOCALHOST';
    }

    Mapping (url) {
        let urls = {
            /*获取搜索历史记录*/
            'GET_SEARCH_HISTORY': (this.isLocal ? '' : 'http://olpmg8rkp.bkt.clouddn.com') + '/static/mokData/musicPlayer/history' + (this.isLocal ? '.json' : '.json'),
            /*搜索结构*/
            'GET_SEARCH_RESULT': (this.isLocal ? '' : 'http://olpmg8rkp.bkt.clouddn.com') + '/static/mokData/musicPlayer/searchResult' + (this.isLocal ? '.json' : '.json'),
            /*个性电台*/
            'GET_PERSONAL_RADIO': (this.isLocal ? '' : 'http://olpmg8rkp.bkt.clouddn.com') + '/static/mokData/musicPlayer/personalRadio' + (this.isLocal ? '.json' : '.json'),
            /*个性电台初始化*/
            'GET_PERSONAL_RADIO_INIT': (this.isLocal ? '' : 'http://olpmg8rkp.bkt.clouddn.com') + '/static/mokData/musicPlayer/radioInit' + (this.isLocal ? '.json' : '.json'),
            /*更新收藏列表*/
            'GET_UPDATE_FAVOURITE': (this.isLocal ? '' : 'http://olpmg8rkp.bkt.clouddn.com') + '/static/mokData/musicPlayer/updatefavourite' + (this.isLocal ? '.json' : '.json'),
            /*初始化用户信息*/
            'GET_INIT_USER_DATA': (this.isLocal ? '' : 'http://olpmg8rkp.bkt.clouddn.com') + '/static/mokData/musicPlayer/userdata' + (this.isLocal ? '.json' : '.json'),
        };
        return urls[url]
    }

    ajaxGetData (options) {
        let that=this;
        let url=that.Mapping(options.url);
        if(!url){
            return  options.callback({success: false,message:'路由错误'});
        }
        $.ajax({
            url: url,
            type: options.type || 'get',
            data: options.data,
            cache: false,
            async: true,
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            success: function(data) {
                if(data.constructor == String) {
                    try{
                        data = JSON.parse(data);
                    } catch(e){
                        if(data == '') {
                            data = {success: false,message:'请求错误'};
                        }
                    }
                }
                options.callback(data);
            },
            error: function() {
                options.callback({success: false,message:'请求错误'});
            }
        });
    }
}
export default urlMapping