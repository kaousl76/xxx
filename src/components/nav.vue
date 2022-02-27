<template>
  <div class="nav">
    <el-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="#FFFFFF"
      class="switch"
    >
    </el-switch>
    <el-card class="box-card box-first" v-show="value === true">
      <el-button
        type="text"
        class="edit-item"
        @click="editItem"
        :class="{ show: !isacitve }"
        >编辑</el-button
      >
      <el-button
        type="text"
        class="finish-item"
        @click="editItem"
        :class="{ show: isacitve }"
        >完成</el-button
      >
      <div
        class="defualt-item flex-item"
        v-for="(item, index) in websiteList"
        :key="item.name"
        @click="jumpWebsite(index, isacitve)"
        :class="{ cursor: isacitve }"
      >
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          icon="el-icon-info"
          title="确定删除吗？"
          @confirm="deleteitem(index)"
        >
          <el-button
            slot="reference"
            class="delete-button"
            :class="{ showdelete: isacitve }"
            icon="el-icon-error"
            size="mini"
          ></el-button>
        </el-popconfirm>
        <div class="item-img">
          <div class="bigicon">
            <img :src="item.web_icon" />
          </div>
          <span class="defualt-item-name">{{ item.web_name }}</span>
        </div>
      </div>
      <div class="add flex-item" @click="showdialog">
        <span>
          <i class="iconfont icon-xx-tianjia"></i>
        </span>
      </div>
    </el-card>
    <div class="dialog">
      <el-dialog
        title="添加导航"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        :append-to-body="true"
      >
        <el-form :inline="true" :model="addform" :rules="rules" ref="addform">
          <el-form-item label="名字" prop="web_name">
            <el-input size="small" v-model="addform.web_name"></el-input>
          </el-form-item>
          <el-form-item label="网址" prop="website">
            <el-input
              class="website"
              size="small"
              v-model="addform.website"
              @keyup.enter.native="addItem(addform)"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="addItem(addform)"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeItem()">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getItem, setItem, removeItem } from '../utils/storage.js'
// import { getNavWebsite } from '../api/navigation.js'

export default {
  data () {
    return {
      dialogVisible: false,
      addform: {
        web_name: '',
        website: '',
        web_icon: ''

      },
      rules: {
        web_name: [
          { required: true, message: '输入名称', trigger: 'blur' }
        ],
        website: [
          { required: true, message: '输入网址', trigger: 'blur' }
        ]

      },
      websiteList: [],
      // navwebsiteList: [],
      activeName: 'first',
      isacitve: false,
      value: false
    }
  },
  created () {
    this.getWebsiteList()
    // this.getNavWebsiteList()
  },
  methods: {
    showdialog () {
      this.dialogVisible = true
    },
    getWebsiteList () {
      const res = getItem()
      this.websiteList = res
    },
    // async getNavWebsiteList () {
    //   const { data } = await getNavWebsite()
    //   this.navwebsiteList = data.data
    // },
    addItem () {
      this.$refs.addform.validate(async valid => {
        if (!valid) return
        this.addform.web_icon = 'http://favicon.cccyun.cc/' + this.addform.website
        if (this.websiteList !== null) {
          for (var i = 0; i < this.websiteList.length; i++) {
            if (this.websiteList[i].web_name === this.addform.web_name) {
              return this.$message.error('名称已经存在')
            }
            if (this.websiteList[i].website === this.addform.website) {
              return this.$message.error('网站已经存在')
            }
          }
        }
        this.addform.website = this.addform.website.substr(0, 8).toLowerCase() === 'https://' ? this.addform.website : 'https://' + this.addform.website
        setItem(this.addform)
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.$refs.addform.resetFields()
      })
      this.getWebsiteList()
    },
    closeItem () {
      this.$refs.addform.resetFields()
      this.dialogVisible = false
    },

    jumpWebsite (index) {
      if (!this.isacitve) {
        window.location = this.websiteList[index].website
      }
    },
    // gonav (index) {
    //   window.location = this.navwebsiteList[index].website
    // },
    editItem () {
      this.isacitve = !this.isacitve
    },
    deleteitem (index) {
      removeItem(index)
      this.getWebsiteList()
    },
    // handleClick (tab, event) {
    //   if (tab.name === 'second') {
    //     this.getNavWebsiteList()
    //   } else {
    //     this.getWebsiteList()
    //   }
    // },
    handleClose () {
      this.$refs.addform.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  margin: auto;
  position: relative;
}
.switch {
  margin-left: 10%;
  margin-bottom: 10px;
}
.box-card {
  background: rgba(255, 255, 255, 0.1);
  width: 90%;
  margin: auto;
  display: flex;
  align-content: flex-start;
  flex-flow: row wrap;
  position: relative;
  border-radius: 15px;
  border: none;

  .edit-item {
    position: absolute;
    right: 12px;
    top: 0%;
    color: white;
    display: none;
  }
  .edit-item:hover {
    color: rgb(49, 129, 252);
  }
  .finish-item {
    position: absolute;
    right: 12px;
    top: 0%;
    color: white;
    display: none;
  }
  .finish-item:hover {
    color: rgb(49, 129, 252);
  }
  .add {
    width: 70px;
    height: 70px;
    position: relative;
    display: inline-block;
    cursor: pointer;
    background: rgb(245, 245, 246);
    border-radius: 10px;
  }
  .add:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  .icon-xx-tianjia {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -10px;
    margin-top: -10px;
    color: rgb(145, 149, 163);
  }
}
.el-input {
  width: 100px;
}
.website {
  width: 240px;
}

.delete-button {
  width: 1px;
  display: none;
  border: none;
  position: absolute;
  background: transparent;
  top: -11%;
  right: -13%;
}
.showdelete {
  display: block;
}
.bigicon {
  width: 70px;
  height: 70px;
  background: #f5f5f6;
  border-radius: 10px;
}
.bigicon:hover {
  position: relative;
  bottom: 10px;
  box-shadow: 0 10px 10px 1px rgba(95, 100, 121, 0.75);
}

.show {
  display: block !important;
}

.cursor {
  cursor: default;
}
.nav-img img {
  width: 32px;
}
.defualt-item {
  display: inline-block;
  position: relative;
  width: 10%;
  cursor: pointer;
  text-align: center;
  margin-bottom: 21px;
}
.defualt-item img {
  padding-top: 16px;
  width: 48%;
  box-shadow: 0 10px 10px -6px rgba(185, 214, 238, 0.692);
  border-radius: 8px;
}
.defualt-item:hover {
  color: blue;
}
.item-img:hover {
  color: blue;
}
.defualt-item-name {
  display: block;
  margin-top: 8px;
  color: #ffff;
}
.dialog {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.box-first {
  padding: 10px;
}
.flex-item {
  width: 70px;
  margin-left: 60px;
  margin-bottom: 23px;
  flex: 0 0 25%;
}
@media screen and (max-width: 600px) {
  .bigicon {
    width: 50px;
    height: 50px;
  }
  .box-card .add {
    width: 50px;
    height: 50px;
  }
  .flex-item {
    width: 50px;
    margin: 0px 0px 23px 22px;
  }
  .defualt-item img {
    padding-top: 13px;
  }
}
</style>
