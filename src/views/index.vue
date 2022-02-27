<template>
  <div class="bodybox">
    <div class="bg">
      <img
        src="https://api.dujin.org/bing/1920.php"
        :class="{ blur: isblur }"
      />
    </div>
    <div class="main">
      <div class="search">
        <div class="switch">
          <span
            class="searchIcon bing"
            :class="{ active: 1 === num }"
            @click="changeSelect(searchBing, 1)"
            ><i class="iconfont icon-xx-bing"></i
          ></span>
          <span
            class="searchIcon baidu"
            :class="{ active: 2 === num }"
            @click="changeSelect(serachBaidu, 2)"
            ><i class="iconfont icon-xx-bxl-baidu"></i
          ></span>
        </div>

        <input
          type="text"
          class="search_input"
          v-model="keyword"
          @keyup.enter="search"
          ref="input"
          autocomplete="off"
          @click="focusbg(1)"
          @blur="focusbg(2)"
          @keydown.down="selectDown"
          @keydown.up.prevent="selectUp"
        />
        <search-sug
          :searchSug="keyword"
          :currentIndex="currentIndex"
          @searchIcon="searchIcon"
          @keydown.down="keyDown"
          @keydown.up="keyUp"
          ref="keyboard"
          :class="show"
        ></search-sug>
        <span>
          <i class="iconfont icon-xx-search"></i>
        </span>
        <el-tooltip
          class="item"
          effect="dark"
          content="搜索网页"
          placement="bottom"
        >
          <input type="button" class="search_button" @click="search" />
        </el-tooltip>
      </div>
      <div class="navigation">
        <navigation></navigation>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from '../components/nav.vue'
import SearchSug from '../components/search-sug.vue'
// import { getImage } from '../api/navigation.js'

export default {
  components: {
    navigation,
    SearchSug
  },
  data () {
    return {
      keyword: '',
      num: 1,
      isblur: false,
      show: true,
      currentIndex: -1,
      searchList: [],
      searchWeb: 'https://cn.bing.com/search?q=',
      searchBing: 'https://cn.bing.com/search?q=',
      serachBaidu: 'https://www.baidu.com/s?wd='
    }
  },
  created () {
    this.autoFocus()
    // this.getImagebing()
  },
  methods: {
    evil (fn) {
      const Fn = Function
      return new Fn('return ' + fn)()
    },

    search () {
      window.open(this.searchWeb + this.keyword)
      this.keyword = ''
      this.$refs.keyboard.Searchkeyword = ''
    },

    selectDown () {
      this.$refs.keyboard.keyDown()
      this.keyword = this.$refs.keyboard.Searchkeyword
    },
    selectUp () {
      this.$refs.keyboard.keyUp()
      this.keyword = this.$refs.keyboard.Searchkeyword
    },
    searchIcon (item) {
      this.keyword = item
      window.open(this.searchWeb + this.keyword)
      this.keyword = ''
      this.$refs.keyboard.Searchkeyword = ''
    },
    changeSelect (e, i) {
      this.searchWeb = e
      this.num = i
      this.autoFocus()
    },

    autoFocus () {
      this.$nextTick(() => {
        this.$refs.input.focus()
      }, 50)
    },
    focusbg (i) {
      if (i === 2) {
        this.isblur = false
      } else {
        this.isblur = true
      }
    }
    // getImagebing () {
    //   const res = getImage()
    //   console.log(res)
    // }
  }
}
</script>

<style lang="less" scoped>
body {
  min-height: 900px;
}
.bg img {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s, transform 0.25s, filter 0.25s;
  backface-visibility: hidden;
}

.main {
  width: 80%;
  height: 100%;
  min-height: 900px;
  margin: auto;
  position: relative;
  z-index: 999;
}
.search {
  width: 570px;
  max-width: 100%;
  height: 40px;
  background: white;
  position: absolute;
  border-radius: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  top: 178px;
  left: 50%;
  transform: translate(-50%, 0%);

  .search_input {
    width: 500px;
    max-width: 80%;
    height: 30px;
    border: transparent;
    margin: 5px 0px 0px 15px;
    outline: none;
    padding-left: 20px;
  }
  .search_button {
    width: 30px;
    height: 30px;
    z-index: 999;
    position: absolute;
    top: 5px;
    right: 16px;
    background: transparent;
    border: transparent;
    cursor: pointer;
  }
  .icon-xx-search {
    position: absolute;
    font-size: 25px;
    top: 7px;
    right: 16px;
    color: rgb(0, 124, 170);
  }
}
.switch {
  width: 177px;
  position: absolute;
  top: -100%;
  left: 1.5%;

  .searchIcon {
    padding: 5px 30px;
    margin-left: 5px;
    margin-right: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    transition: 0.25s;
    cursor: pointer;
    color: white;
  }
  .searchIcon:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  .searchIcon:active {
    background-color: rgb(0, 124, 170);
  }
  .active {
    background-color: rgba(255, 255, 255, 0.3);
  }
}
.show {
  display: block;
}
.blur {
  filter: blur(5px);
  transform: scale(1.1);
}
.navigation {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  position: absolute;
  top: 26%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, 0%);
}
// Small devices (landscape phones, 576px and up)
@media screen and (max-width: 600px) {
  .search {
    top: 116px;
  }
  .search_input {
    width: 80%;
  }
  .navigation {
    top: 18%;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>
