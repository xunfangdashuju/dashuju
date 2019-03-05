<template>
  <el-row>
    <el-col :span="24">
      <div class="navigationbar">
        <span class="navigationname">
          实验平台管理
          <i class="el-icon-arrow-right" aria-hidden="true"></i>
          实验列表
        </span>
      </div>
    </el-col>
    <el-form :inline="true" size="small">
      <el-form-item>
        <el-input v-model="questionName" placeholder="请输入实验名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click='seachTest'>查询</el-button>
      </el-form-item>
      <el-form-item style="margin-left:80px;">
        <el-button type="primary" icon="el-icon-plus" @click="addtest">新增实验</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="testtableData" size="mini" stripe border style="width: 100%">
      <el-table-column prop="resourceOrder" label="实验序号" width="80"></el-table-column>
      <el-table-column prop="resourceManagementName" label="实验名称" width="180"></el-table-column>
      <el-table-column prop="resourceManagementDesc" label="实验简介"></el-table-column>
      <el-table-column prop="experimentalTime" label="实验时长" width="80"></el-table-column>
      <el-table-column width="180" label="创建时间">
        <template slot-scope="scope">{{timeFormattershowsecod(scope.row.createTime)}}</template>
      </el-table-column>
      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edittest(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delecttest(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24">
      <page-compent :pagetotal="paggtatol" :pageSize="pageSize" @currentpage="pageIndexChange"></page-compent>
    </el-col>
  </el-row>
</template>

<script>
import { timeFormattershowsecod } from "@/assets/js/common";
import { ResourceManagementpage, resourcedelect } from "@/api/api";
import pageCompent from "@/components/pagintion";
export default {
  components: {
    pageCompent
  },

  data() {
    return {
      questionName:"",
      timeFormattershowsecod,
      currPage: 1,
      pageSize: 10,
      paggtatol: null,
      testName: "",
      testtableData: []
    };
  },
  methods: {
     seachTest(){//搜索
          this.testlist()      
     },
    addtest() {
      //新增实验
      this.$router.push({ name: "AddTest", params: { id: "isadd" } });
    },
    testlist() {
      var parms = {
        currentPage: this.currPage,
        pageSize: this.pageSize,
        resourceManagementName: this.questionName
      };
      ResourceManagementpage(parms).then(res => {
        console.log("列表");
        console.log(res);
        if (res.data.code == 0) {
          this.testtableData = res.data.data.list;
          this.paggtatol = res.data.data.total;
        }
      });
    },
    pageIndexChange(index) {
      //翻页
      this.currPage = index;
      this.testlist();
    },
    edittest(index) {
      console.log(index);
      //  this.isadd=false;
      this.$router.push({
        name: "AddTest",
        params: { id: index.resourceManagementId }
      });
    },
    delecttest(index) {
      //删除
      console.log(index);
      var params = {
        resourceManagementId: index.resourceManagementId
      };

      this.$confirm("此操作将永久删除该实验, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          resourcedelect(params).then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功"
              });

            this.testlist() 
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.testlist();
  }
};
</script>

<style   lang="scss" scoped>
</style>