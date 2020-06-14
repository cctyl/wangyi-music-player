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
        musicUrl: "",
        musicOffset: 1,
        commentOffset: 1,
        picUrl:"",
        baseUrl:"http://localhost:3000/",
        musicId:"",
        hotCommentsArray:[]
    },
    methods: {
        //歌曲搜索
        getMusic(method) {
            var vue = this;
            if (method == 'prev') {
                vue.musicOffset--;
            } else {
                vue.musicOffset++;
            }
            axios.get(vue.baseUrl+"search?keywords=" + vue.query + "&limit=30&offset=" + vue.musicOffset).then(
                function (response) {
                    if (response == undefined) {
                        return;
                    }
                    var songData = response.data.result;

                    vue.songCount = songData.songCount;
                    vue.musicList = songData.songs;


                },
                function (err) {

                }
            );

        },
        //获取歌曲详情
        getMusicDetail(musicId) {
            var vue = this;
            vue.musicId = musicId;
            //获取歌曲url
            axios.get(vue.baseUrl+"song/url?id=" + musicId).then(
                function (response) {
                    var detail = response.data.data[0];
                    vue.musicUrl = detail.url;
                },
                function (err) {

                }
            );

            //获取歌曲封面
            axios.get(vue.baseUrl+"song/detail?ids=" + musicId).then(
                function (response) {


                    var album = response.data.songs[0].al;

                    vue.picUrl = album.picUrl;

                },
                function (err) {

                }
            );

            vue.getMusicComment(musicId);

        },

        //获取歌曲评论
        getMusicComment(musicId,method) {

            var vue = this;
            if (method == 'prev') {
                vue.commentOffset--;
            } else {
                vue.commentOffset++;
            }
            //获取歌曲评论
            axios.get(vue.baseUrl+"comment/hot?id="+musicId+"&limit=20&offset="+vue.commentOffset+"&type=0").then(
                function (response) {

                    vue.hotCommentsArray = response.data.hotComments;
                    console.log(response.data.hotComments);
                }

            );
        }
    }
});
