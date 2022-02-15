/* 配置组件的结构 */
<template>
  <div class="row">
    <div class="text-center welcome" v-show="showModal.isFirst">欢迎使用</div>
    <div class="text-center err" v-show="showModal.errMsg">
      {{ showModal.errMsg }}
    </div>

    <div
      class="card container"
      v-for="(s, index) in itemInfo"
      :key="listInfo[index].id"
      @click="ListenMusic(listInfo[index].id, index)"
    >
      <audio :src="playmusic" hidden loop autoplay controls></audio>
      <img class="pic" v-lazy="s.picUrl" />
      <!-- <img class="pic" :src="s.picUrl" /> -->
      <div class="card-name">
        <p>{{ listInfo[index].name }}</p>
        <p>{{ arInfo[index].name }}—{{ s.name }}</p>
      </div>
      <img :src="img[0].pic" ref="tu" class="isplay" />
    </div>
    <!-- 请稍后的遮罩层 -->
    <div v-if="showModal.isLoading" class="mask">
      <img class="loading-image" src="../assets/loading.gif" />
    </div>
  </div>
</template>

/* 配置组件数据、交互、事件等等 */
<script>
export default {
  name: "Item",
  data() {
    return {
      // 歌曲全部信息
      listInfo: {},
      // 专辑的信息
      itemInfo: [],
      // .ar的信息
      arInfo: [],
      // 接受一个dataObj数据 需要他的length
      dataObj: "",
      playId: "",
      // 遮罩层的参数
      showModal: {
        isFirst: true,
        isLoading: false,
        errMsg: "",
      },
      img: [
        {
          // 播放的图片
          pic: "https://s3.bmp.ovh/imgs/2022/02/2fb4821d4d99a89e.png",
        },
        {
          // 暂停的图片
          pic: "https://s3.bmp.ovh/imgs/2022/02/f689f81fd47d6cfb.png",
        },
      ],
    };
  },
  methods: {
    // 筛选搜索结果
    ItemData(dataObj) {
      // 备份一份
      this.dataObj = dataObj;
      // 清除缓存
      this.listInfo = {};
      this.itemInfo = [];
      this.arInfo = [];
      // 将数据展开并赋值 第一个参数没有参数则会将第二个参数赋去
      this.listInfo = { ...this.listInfo, ...dataObj };
      for (let i = 0; i < dataObj.length; i++) {
        // 获取专辑数据
        this.itemInfo.push(dataObj[i].al);
        // 获取ar数据
        this.arInfo.push(dataObj[i].ar[0]);
      }
    },
    // 更新一些数据
    UpdatedData(updatedObj) {
      this.showModal = { ...this.showModal, ...updatedObj };
    },
    // 操作audio音频
    ListenMusic(id, index) {
      // 获取被点击的音乐的id 传给playmusic
      this.playId = id;

      // ********************
      // setTimeout是为了解决Uncaught (in promise) DOMException: The element has no supported sources.
      // 原因应该是这个dom节点还没有加载起来 自然就会报错 然后执行音频播放的时候 settimeout 延迟50播放 即可
      setTimeout(() => {
        // 只允许同时播放一个音频
        // 遍历所有的audio标签 判断哪一个是被我们所点击
        // 如果不是则会通过pause()暂停
        const audios = document.getElementsByTagName("audio");
        function pauseAll() {
          var self = this;
          [].forEach.call(audios, function (i) {
            // 将audios中其他的audio全部暂停
            i !== self && i.pause();
          });
        }
        // 给所有的audio标签绑定上暂停函数
        [].forEach.call(audios, function (i) {
          i.addEventListener("play", pauseAll.bind(i));
        });

        // 判断按钮是哪个地址
        if (this.$refs.tu[index].src === this.img[1].pic) {
          // 换成暂停按钮
          this.$refs.tu[index].src = this.img[0].pic;
          // 将所有音频暂停
          for (let i = 0; i < audios.length; i++) {
            audios[i].pause();
          }
        } else {
          for (let i = 0; i < audios.length; i++) {
            // 将所有的按钮变成暂停
            this.$refs.tu[i].src = this.img[0].pic;
          }
          // 将当前按钮变成播放
          this.$refs.tu[index].src = this.img[1].pic;
          // 播放当前音频
          audios[index].play();
        }
      }, 50);
    },
  },
  computed: {
    // 根据传来的音乐id 返回一个播放链接
    playmusic() {
      return `https://music.163.com/song/media/outer/url?id=${this.playId}`;
    },
  },
  mounted() {
    // 在全局事件总线上绑定方法 Search处调用此方法则会把数据传回来
    this.$bus.$on("ItemData", this.ItemData);
    this.$bus.$on("UpdatedData", this.UpdatedData);
  },
};
</script>

/* 配置组件样式 */
<style scoped>
.row {
  background-color: #87ceeb;
}
.row .welcome,
.row .err {
  font-size: 1.5rem;
}
.card {
  height: 4rem;
  width: 100vw;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.card > .pic {
  height: 2.8rem;
  margin: 0.5rem 0;
}
.card-name {
  width: 8.5rem;
  display: inline-block;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
  vertical-align: top;
  /*强制文字在一行文本框内*/
  white-space: nowrap;
  /*溢出部分文字隐藏*/
  overflow: hidden;
  /*溢出部分省略号处理*/
  text-overflow: ellipsis;
}
.card-name p:first-child {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
  /*强制文字在一行文本框内*/
  white-space: nowrap;
  /*溢出部分文字隐藏*/
  overflow: hidden;
  /*溢出部分省略号处理*/
  text-overflow: ellipsis;
}
.card-name p:last-child {
  font-size: 0.8rem;
  /*强制文字在一行文本框内*/
  white-space: nowrap;
  /*溢出部分文字隐藏*/
  overflow: hidden;
  /*溢出部分省略号处理*/
  text-overflow: ellipsis;
}
.card > .isplay {
  width: 1.8rem;
  font-size: 1.6rem;
  position: absolute;
  top: 1rem;
  right: 1.2rem;
}
.mask {
  background-color: rgb(0, 0, 0);
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.mask > img {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 20%;
}
/* 图片懒加载 */
img[lazy="loading"] {
  display: block;
  width: 50px !important;
  height: 50px !important;
  margin: 0 auto;
}
</style>