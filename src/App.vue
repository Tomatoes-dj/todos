<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @input="handleChange"/>
    <a-button type="primary" @click="addTodo">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="checkedChange(item.id, $event)">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>
{{info}}
      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ this.$store.getters.listNum }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="showKey === 'all' ? 'primary' : 'default'"
            @click="changeType('all')"
            >全部</a-button
          >
          <a-button
            :type="showKey === 'unDone' ? 'primary' : 'default'"
            @click="changeType('unDone')"
            >未完成</a-button
          >
          <a-button
            :type="showKey === 'Done' ? 'primary' : 'default'"
            @click="changeType('Done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clearDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      // 如何将state.list保存为data中的值： Watch 以下
      info:[]
    }
  },
  created() {
    this.getList()
  },
  watch:{
    infoList(newValue){
      this.info=newValue
    }
  },
  computed: {
    ...mapState(['inputValue', 'showKey']),
    ...mapGetters(['infoList'])
  },
  methods: {
    ...mapMutations([
      'inputChange',
      'addList',
      'removeTodo',
      'changeChecked',
      'clearDone',
      'sKey'
    ]),
    ...mapActions({
      getList: 'getList'
    }),
    handleChange(e) {
      // console.log(e.target.value)
      this.inputChange(e.target.value)
    },
    addTodo() {
      if (this.inputValue === '') {
        return this.$message.warning('文本框不能为空！')
      }
      this.addList()
    },
    removeItem(id) {
      console.log(id)
      this.removeTodo(id)
    },
    checkedChange(id, e) {
      console.log(e)
      let obj = { id: id, value: e.target.checked }
      this.changeChecked(obj)
    },
    changeType(key) {
      this.sKey(key)
      console.log(1)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
