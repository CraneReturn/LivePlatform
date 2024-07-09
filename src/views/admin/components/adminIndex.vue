<template>
  <div class="adminIndex">
    <!-- 搜索 -->
    <div class="searchIndex">
      <div class="searchMain">
        <div class="search" v-for="(item, index) in search">
          <p>{{ item.description }}搜索：</p>
          <el-input
            :key="index"
            v-model="inputValues[item.param]"
            placeholder="请输入搜索内容"
          />
        </div>
        <div class="searchBtn">
          <button @click="searchInput">搜索</button>
          <button @click="reset" class="reset">重置</button>
        </div>
      </div>
    </div>
    <!-- 渲染列表 -->
    <div class="table">
      <div class="tableAdd">
        <button @click="addDialog = true">增加{{ title }}</button>
      </div>
      <div class="tableMain">
        <slot name="table" :deleteIt="deleteIt" :data="data"></slot>
      </div>
      <div class="pagination">
        <div class="select">
          <el-select
            v-model="pagesize"
            :placeholder="selectPlaceholder"
            style="width: 240px"
            @change="handleSizeChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-pagination
          v-model:current-page="currentPage"
          :small="small"
          background
          layout="prev, pager, next"
          :total="1000"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 判断用户传参/弹窗布局 -->
    <div class="pop-up">
      <div v-if="position == 'center'">
        <el-dialog
          :addDialog.sync="addDialog"
          :title="title"
          width="500"
          draggable
        >
          <slot name="add"></slot>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="addDialog = false">取消</el-button>
              <el-button type="primary" @click="$emit('add')"> 确定 </el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog
          :editDialog.sync="editDialog"
          :title="title"
          width="500"
          draggable
        >
          <slot name="edit"></slot>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="editDialog = false">取消</el-button>
              <el-button type="primary" @click="$emit('edit')">
                确定
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
      <div v-else>
        <el-drawer
          size="400"
          :addDialog.sync="addDialog"
          :direction="position == 'left' ? 'ltr' : 'rtl'"
        >
          <template #header>
            <h4>增加{{ title }}</h4>
          </template>
          <template #default> <slot name="add"></slot> </template>
          <template #footer>
            <div style="flex: auto">
              <el-button @click="addDialog = false">取消</el-button>
              <el-button type="primary" @click="$emit('add')">确定</el-button>
            </div>
          </template>
        </el-drawer>
        <el-drawer
          size="400"
          :editDialog.sync="editDialog"
          :direction="position == 'left' ? 'ltr' : 'rtl'"
        >
          <template #header>
            <h4>编辑{{ title }}</h4>
          </template>
          <template #default> <slot name="edit"></slot></template>
          <template #footer>
            <div style="flex: auto">
              <el-button @click="editDialog = false">取消</el-button>
              <el-button type="primary" @click="$emit('edit')">确定</el-button>
            </div>
          </template>
        </el-drawer>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, reactive, defineProps, withDefaults, onMounted } from "vue";
// 当有用户点击确定时向外传参

// 定义类型
type Search = {
  description: string;
  param: string;
};
type Position = "center" | "left" | "right";
const currentPage = ref(1);
const pagesize = ref(10);
const addDialog = ref(false);
const editDialog = ref(false);
const small = ref(false);
let data = reactive([]);
// 接受的参数
// 搜索 当前页名称 pagesize
const props = withDefaults(
  defineProps<{
    search: Search[];
    searchIt: Function;
    title: string;
    addDialog: boolean;
    editDialog: boolean;
    pageSize: number[];
    position: Position;
  }>(),
  {
    pageSize: () => [10, 20, 30],
    position: () => "center",
  }
);

// 对接受的数据进行处理
// 搜索
let searchParam = {};
if (props.search) {
  searchParam = props.search.reduce(
    (
      acc: { [key: string]: string },
      item: { param: string; [description: string]: any }
    ) => {
      acc[item.param] = "";
      return acc;
    },
    {}
  );
}
const inputValues: { [param: string]: string | number } = reactive(searchParam);
//pageSize
// 定义选项类型
type option = {
  value: number;
  label: string;
};
let options: option[] = [];
if (props.pageSize) {
  options = props.pageSize.map((item) => ({
    value: item,
    label: `${item}条/页`,
  }));
}
let selectPlaceholder = options[0].label;
// 方法
// 搜索
let params: { [param: string]: string | number } = {};
function getData(params: object) {
  props.searchIt(params).then((response: { data: any }) => {
    data = response.data;
  });
}
const handleCurrentChange = (val: number) => {
  // 当前页改变时
  // 获取搜索信息
  currentPage.value = val;
  params["currentpage"] = val;
  getData(params);
};

function searchInput() {
  // 获取所有搜索框中的值
  params = Object.keys(inputValues).reduce(
    (item: { [param: string]: string | number }, key: string) => {
      if (typeof inputValues[key] === "string") {
        params[key] = inputValues[key].trim();
      }
      return item;
    },
    {}
  );
  params["pagesize"] = pagesize.value;
  params["currentPage"] = 0;
  getData(params);
}
// 重置
function reset() {
  Object.keys(inputValues).forEach((key) => {
    inputValues[key] = "";
  });
  // 获取当前pagesize
  inputValues["pagesize"] = pagesize.value;
  inputValues["currentPage"] = 1;
  getData(inputValues);
}
// 处理更改当前页面条数
const handleSizeChange = (val: number) => {
  pagesize.value = val;
  params["pagesize"] = val;
  getData(params);
};
// 增加
// 初始化页面信息
onMounted(() => {
  pagesize.value = options[0].value;
  inputValues["pagesize"] = options[0].value;
  inputValues["currentPage"] = 1;
  Object.keys(inputValues).forEach((key) => {
    inputValues[key] = "";
  });
  getData(inputValues);
});
const deleteIt = function (id: number, fn: Function) {
  ElMessageBox.confirm("你确定要删除这条内容？", "消息", {
    confirmButtonText: "确定删除",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    fn(id).then((response: { code: number }) => {
      if (response.code == 20000) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        // 重新获取当前页信息
      }
    });
  });
};
</script>
<style lang="scss">
.adminIndex {
  padding: 10px;
}
.searchIndex {
  .searchMain {
    display: flex;
    padding: 10px;
    padding-left: 25px;
    border-radius: 5px;
    height: 100px;
    background-color: #fff;
    gap: 20px;
    align-items: center;
    box-shadow: 1px 2px 2px #33333334;
  }

  p {
    font-size: 13px;
    color: #333;
    margin-bottom: 4px;
  }
  .searchBtn {
    height: 60px;
    display: flex;
    gap: 15px;
    button {
      margin: 24px 0;
      height: 35px;
      width: 80px;
      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      background-color: var(--el-color-opcatiy);
    }
    .reset {
      background-color: #fff;
      border: 1px solid var(--el-color-opcatiy);
      color: var(--el-color-opcatiy);
    }
  }
  .el-input {
    min-width: 270px;
    border-radius: 2px;
    height: 35px;
  }
}
.table {
  background-color: #fff;
  margin-top: 15px;
  min-height: 250px;
  box-shadow: 1px 2px 2px #33333334;
  border-radius: 4px;
  .tableAdd {
    padding: 20px;
    button {
      height: 35px;
      width: 80px;
      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      background-color: var(--el-color-opcatiy);
    }
  }
  .tableMain {
    min-height: 200px;
  }
  .pagination {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
