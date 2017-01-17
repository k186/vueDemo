/**
 * Created by k186 on 2016/12/28.
 */
class urlMapping {
    constructor () {
        this.isLocal = window.location.hostname.toUpperCase() === 'LOCALHOST';
    }

    Mapping (url) {
        let urls = {
            'GET_SEARCH_HISTORY': (this.isLocal ? '../../static/mokData/' : this.hostname) + 'musicPlayer/history' + (this.isLocal ? '.json' : ''),

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