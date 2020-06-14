/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:http://localhost:3000/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:http://localhost:3000/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:http://localhost:3000/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:http://localhost:3000/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var app = new Vue({
    el: "#player",
    data: {
        query: "",
        musicList: [],
        songCount: 0,
        musicUrl:"",
        offset:1
    },
    methods: {
        getMusic(method) {
            var vue = this;
            if (method=='prev'){
                vue.offset --;
            }else {
                vue.offset ++;
            }
            axios.get("http://localhost:3000/search?keywords=" + vue.query+"&limit=30&offset="+vue.offset).then(
                function (response) {
                    if (response==undefined){
                        return;
                    }
                    var songData =response.data.result;
                    console.log(songData);

                    vue.songCount = songData.songCount;
                    vue.musicList = songData.songs;


                },
                function (err) {

                }
            );

        },
        getMusicUrl(musicId){
            var vue = this;
            axios.get("http://localhost:3000/song/url?id="+musicId).then(
                function (response) {
                  var detail =   response.data.data[0];
                  console.log(detail);
                  vue.musicUrl = detail.url;
                },
                function (err) {

                }

            );
        }
    }
});
