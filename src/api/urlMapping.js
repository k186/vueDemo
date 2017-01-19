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
            'GET_SEARCH_HISTORY': (this.isLocal ? '' : this.hostname) + '../../static/mokData/musicPlayer/history' + (this.isLocal ? '.json' : '.json'),
            /*搜索结构*/
            'GET_SEARCH_RESULT': (this.isLocal ? '' : this.hostname) + '../../static/mokData/musicPlayer/searchResult' + (this.isLocal ? '.json' : '.json'),


        };
        return urls[url]
    }

    ajaxGetData (options) {
        let that=this;
        let url=that.Mapping(options.url)
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