<template>
  <div class="search-sug">
    <div class="searchlist" :class="{ show }">
      <ul>
        <li
          @click="$emit('searchIcon', item)"
          @keydown.down="$emit('keyDown', Searchkeyword)"
          @keydown.up="$emit('keyUp', Searchkeyword)"
          class="text-center"
          v-for="(item, index) in searchList"
          :key="item"
          :class="[currentIndex === index ? 'isavtive' : '']"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { debounce } from 'lodash'

export default {
  name: 'SearchSug',
  components: {},
  props: {
    searchSug: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      show: false,
      searchList: [],
      currentIndex: -1,
      Searchkeyword: ''
    }
  },
  watch: {
    searchSug: {
      handler: debounce(function (value) {
        if (value === this.Searchkeyword && value.length !== 0) {
          return
        }
        if (value.length === 0) {
          this.currentIndex = -1
          this.show = false
        } else { this.getSearchSugs(value) }
      }, 200),
      immediate: true
    }
  },
  methods: {
    evil (fn) {
      const Fn = Function
      return new Fn('return ' + fn)()
    },
    getSearchSugs () {
      this.$axios.get('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?', {
        params: {
          wd: this.searchSug
        },
        jsonp: 'cb',
        jsonpCallback: 'window.baidu.sug',
        dataType: 'json'
      })
        .then(res => {
          const arr = res.data.replace('window.baidu.sug', '').replace('s:[', '').replace(']});', '').split(',')
          arr.splice(0, 2)
          const list = []
          for (let i = 0; i < arr.length; i++) {
            list.push(this.evil(arr[i]))
          }
          this.searchList = list
          this.show = true
          if (this.searchSug.length === 0) {
            this.searchList = ''
            this.show = false
          }
        })
    },
    keyDown () {
      if (this.currentIndex === this.searchList.length - 1) {
        this.currentIndex = 0
        this.Searchkeyword = this.searchList[0]
      } else {
        this.currentIndex++
        this.Searchkeyword = this.searchList[this.currentIndex]
      }
    },
    keyUp () {
      this.currentIndex--
      if (this.currentIndex === -2) this.currentIndex = this.searchList.length - 1
      this.Searchkeyword = this.searchList[this.currentIndex]
    }
  }
}
</script>

<style scoped lang="less">
.searchlist {
  display: none;
  background: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 42px;
  margin-top: 12px;
  margin: auto;
  width: 99%;
  padding: -34px;
  height: auto;
  border-top: none;
  font-size: small;
  overflow-y: hidden;
  border-radius: 15px;
  transition: 0.25s;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  ul {
    padding-left: 0px;
  }
  li {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
    font-size: 15px;
  }
  span {
    padding-left: 20px;
  }
  li:hover {
    background: rgba(255, 255, 255, 0.5);
    padding-left: 20px;
  }
}
.show {
  display: block;
}
.isavtive {
  background: rgba(255, 255, 255, 0.5);
  padding-left: 20px;
}
</style>
