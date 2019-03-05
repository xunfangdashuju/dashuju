<template>
  <el-row>
    <el-col>
      <div class="navigationbar">
        <span class="navigationname">
          在线考试管理
          <i class="el-icon-arrow-right" aria-hidden="true"></i>
          试卷增加
        </span>
      </div>
    </el-col>
    <el-col :span="24">
      <el-steps :active="active" finish-status="success" :space="200" simple>
        <el-step title="基本信息"></el-step>
        <el-step title="试题管理"></el-step>
      </el-steps>
    </el-col>
    <el-col :span="24" v-show="active==1">
      <el-form
        :model="testpaper"
        label-width="160px"
        class="testpaper"
        :rules="rules"
        ref="testpaper"
      >
        <el-form-item label="试卷名称:" prop="paperName">
          <el-input v-model="testpaper.paperName" placeholder="试卷名称"></el-input>
        </el-form-item>
        <el-form-item label="考试难度:">
          <el-radio-group v-model="testpaper.paperDifficulty">
            <el-radio :label="1">初级</el-radio>
            <el-radio :label="2">中级</el-radio>
            <el-radio :label="3">高级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="考试时间:" prop="lengthTime">
          <el-input v-model.number="testpaper.lengthTime" placeholder="列如 :30"></el-input>
        </el-form-item>
        <el-form-item label="试卷分值:" prop="paperScore">
          <el-input v-model.number="testpaper.paperScore" placeholder="列如 :100"></el-input>
        </el-form-item>
        <el-form-item label="试卷描述:" prop="paperDesc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="testpaper.paperDesc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" style="margin-left:80px;" @click="testNext">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24" v-show="active==2">
      <el-form :inline="true" style="margin-top:20px" size="small" :model="formStructuredata">
        <el-form-item label="试题体系:">
          <el-select v-model="formStructuredata.structureId" placeholder="请选择体系" >
             <el-option
              v-for="item in optionstixi"
              :key="item.createTime"
              :label="item.courseStructureName" 
              :value="item.courseStructureId"
            ></el-option> 


        </el-select> 
            <!-- <el-select v-model="value" placeholder="请选择" @change="changevalue" >
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
  </el-select> -->
        </el-form-item>
        <el-form-item>
          <el-input v-model="formStructuredata.questionName" placeholder="考题描述搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-col :span="24">
        <el-col :span="12">
          <el-table
            size="mini"
            height="300"
            border
            ref="multipleTable"
            :data="tableDatachecked"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="SelectionChangecheck"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              :selectable="checkSelectable"
              width="55"
            ></el-table-column>
            <el-table-column label="试题描述" prop="questionName" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" width="55" label="分值"></el-table-column>
            <el-table-column prop="courseStructureName" label="试题体系" width="120"></el-table-column>
          </el-table>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            style="margin-top:20px"
            @click="addteatqustion"
          >添加试题</el-button>
        </el-col>
        <el-col :span="12">
          <el-table
            show-summary
            size="mini"
            height="300"
            border
            :data="tableDataischecked"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="SelectionisChangecheck"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="试题描述" prop="questionName" show-overflow-tooltip></el-table-column>
            <el-table-column prop="questionStore" width="80" label="(已选)分值"></el-table-column>

            <el-table-column prop="courseStructureName" label="试题体系" width="120"></el-table-column>
          </el-table>
          <div style="color:#999">试题数目({{ this.tableDataischecked.length}})</div>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            style="margin-top:20px"
            @click="delectquestion"
          >移除试题</el-button>
        </el-col>
        <div style="float:right">
         <el-button type='primary' size="mini"  @click="lastStep"    >上一步</el-button>
          <el-button type="primary" size="mini" @click="submitdata">提交数据</el-button>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import {
  courseStructurepage,
  courseClassificationpage,
  courseContentpage,
  questionclassifylist,
  examinationpaperadd,
  examinationpaperlist
} from "@/api/api";
export default {
  data() {
    return {
       option: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',



      rules: {
        paperName: [
          { required: true, message: "请输入试卷名称", trigger: "blur" }
        ],
        lengthTime: [
          { required: true, message: "输入试卷考试时长", trigger: "blur" },
          { type: "number", message: "必须为数字值" }
        ],
        paperScore: [
          { required: true, message: "输入试卷分值", trigger: "blur" },
          { type: "number", message: "必须为数字值" }
        ],

        paperDesc: [
          { required: true, message: "输入试卷描述", trigger: "blur" }
        ]
      },
      options: [],
      value: "",
      active: 1,
      testpaper: {
        paperName: "",
        paperDifficulty: 1,
        lengthTime: "",
        paperDesc: "",
        paperScore: "",
        examinationQuestionIds: []
      },
      formStructuredata: {
        structureId: "",
        questionName: ""
      },
      optionstixi: [], //体系
      tableDatachecked:  [], //选择框的题
      tableDataischecked: [], //选中的题
      addselect: [], //选中的时候准备添加的框.
      selectscore: 0,
      delectdata:[],
      tableDataischeckedquzhong:[],
    };
  },
  methods: {
    testNext() {//下一步
      //下一步
      this.active = this.active + 1;
    },
    lastStep(){//上一步
        this.active = this.active - 1;  
    },
    getcourseStructurepage() {
      //体系
      var params = {
        currentPage: 1,
        pageSize: 100
      };
      courseStructurepage(params).then(res => {
        if (res.data.code == 0) {
          console.log("体系");
          console.log(res);
          this.optionstixi = res.data.data.list;
          this.optionstixi.forEach((item, index) => {
            item.name = item.courseStructureName;
          });
        }
      });
    },
    SelectionChangecheck(val) {
      //选中的,试题
      this.addselect = val;
    },
    SelectionisChangecheck(val) {//删除的框选中的试题
        console.log("删除选中的")
        console.log(val)
        this.delectdata=val

    },

    search() {
      //搜索
      var parms = this.formStructuredata;
      questionclassifylist(parms).then(res => {
        console.log(res);
        if (res.data.code == 0) {
            this.tableDatachecked = res.data.data;
          }
      });
    },
    addteatqustion() {
      //添加试题
      console.log(this.addselect);
        const dataque=[]
      for (var i = 0; i < this.addselect.length; i++) {
            dataque.push(this.addselect[i]);
            
      }
        
         if(dataque.length>0){//数组去重
                    for(var i = 0; i < dataque.length; i++){
                if(this.tableDataischecked.indexOf(dataque[i]) == -1){
                   this.tableDataischecked.push(dataque[i]);
                   this.$refs.multipleTable.clearSelection();
                }
            }
         }
    },
    checkSelectable(row,index) {
  
      if(this.tableDataischecked.some(el=>{return el.examinationQuestionId === row.examinationQuestionId})){
          console.log(row)
          return false;

      }else{
          return true;
      }
    },
    delectquestion(val) {
        console.log("移除试题")
        console.log(this.tableDataischecked)
        console.log("=======")
        console.log(this.delectdata)
       // console.log(this.delectdata)
         for(var i=0;i<this.tableDataischecked.length;i++){
                 for(var k=0;k<this.delectdata.length;k++){
                       if(this.tableDataischecked[i].questionName === this.delectdata[k].questionName){
                               this.tableDataischecked.splice(i, 1)   
                       }
                 }
         }

      //移除试题
    },
    submitdata() {
      //提交数据
      this.selectscore = 0;
      this.testpaper.examinationQuestionIds = [];
      for (var i = 0; i < this.tableDataischecked.length; i++) {
        this.selectscore =
          this.selectscore + this.tableDataischecked[i].questionStore;
        this.testpaper.examinationQuestionIds.push(
          this.tableDataischecked[i].examinationQuestionId
        );
      }
      if (this.tableDataischecked.length == 0) {
        this.$message.error("请添加试题");
      } else if (this.selectscore !== this.testpaper.paperScore) {
        this.$message.error("试卷总分值与试题总分值不相等! 请检查");
      } else {
        examinationpaperadd(this.testpaper).then(res => {
          console.log("添加试卷");
          console.log(this.testpaper)
          console.log(res);
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "试卷添加成功"
            });
            // setTimeout(() => {
            //   this.$router.push("/examinationPaper");
            // }, 500);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
      console.log(this.selectscore);
    }
  },
  mounted() {
    this.getcourseStructurepage();
  }
};
</script>

<style  lang='scss'   scoped>
.testpaper {
  margin-top: 40px;
}
</style>
<style>
.testpaper .el-input {
  width: 300px;
}
.testpaper .el-textarea {
  width: 300px;
}
</style>
