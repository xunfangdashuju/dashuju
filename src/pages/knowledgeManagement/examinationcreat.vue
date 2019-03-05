<template>
  <el-row>
    <el-col :span="24">
      <div class="navigationbar">
        <span class="navigationname">
          在线考试管理
          <i class="el-icon-arrow-right" aria-hidden="true"></i>
          考题增加
        </span>
      </div>
      <el-steps :active="active" simple finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="试题解析"></el-step>
        <el-step title="其他信息"></el-step>
      </el-steps>
    </el-col>
    <el-col :span="24" style="margin-top:20px;" v-if="active==1">
      <el-col :span="12">
        <el-form
          size="mini"
          :model="dynamicValidateForm"
          label-width="120px"
          ref="dynamicValidateForm"
        >
          <el-form-item
            label="考题描述:"
            :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]"
            prop="questionName"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="dynamicValidateForm.questionName"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item  label="试题类型:">
              <el-switch
                  v-model="choicequestion"
                  active-text="多选"
                  inactive-text="单选"
                  active-value="1"
                  active-color="#213FE8"
                  inactive-color="#13ce66"
                  inactive-value="2"
                  style="margin-right:30px;"
                  @change="changeselecttype" //多选关闭了
              >
            </el-switch>
          </el-form-item>-->
          <el-form-item>
            <el-button @click="Addanwser" icon="el-icon-plus" type="primary">增加选项</el-button>
            <el-button @click="delectanswer" icon="el-icon-delete" type="primary">删除选项</el-button>
          </el-form-item>
          <el-form-item
            v-for="(item,index) in dynamicValidateForm.dataselect"
            :key="index"
            :prop="'dataselect.' + index + '.value_input'"
            label="正确选项"
            :rules="{
             required: true, message: '内容不能为空', trigger: 'blur'
             }"
          >
            <el-radio
              :label="index+1"
              v-model="dynamicValidateForm.answerIndexone"
              v-if="choicequestion==2"
            >
              <el-input v-model="item.value_input"></el-input>
            </el-radio>
            <!-- <el-checkbox v-model="item.selecttable"  v-else>//多选不要了
                           <el-input v-model="item.value_input"></el-input>
            </el-checkbox>-->
          </el-form-item>
          <el-form-item label="考题图片:">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="nextStep">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
    <el-col :span="24" v-if="active==2" style="margin-top:20px">
      <div class="Analysis">试题解析:</div>
      <el-form :inline="true" :model="markdownedit">
        <div>
          <el-form-item>
            <mavon-editor v-model="markdownedit.analysis" :ishljs="true" placeholder="试题解析....."/>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" size="mini" @click="backStep">上一步</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="nextStep">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24" v-if="active==3" style="margin-top:20px">
      <el-form
        label-width="120px"
        class="elseform"
        :model="formStructuredata"
        size="small"
        ref="formStructuredata"
      >
        <el-form-item
          label="试题体系:"
          prop="courseStructureId"
          :rules="{ required: true, message: '必须选择体系', trigger: 'change'}"
        >
          <el-select
            v-model="formStructuredata.courseStructureId"
            placeholder="请选择"
            @change="changeseleval"
          >
            <el-option
              v-for="item in optionstixi"
              :key="item.createTime"
              :label="item.courseStructureName"
              :value="item.courseStructureId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display:inline-block" label="试题分类:">
          <el-select
            v-model="formStructuredata.courseClassificationId"
            placeholder="请选择分类/非必选"
            @change="changeconcent"
          >
            <el-option
              v-for="item in datamodel"
              :key="item.createTime"
              :label="item.courseClassificationName"
              :value="item.courseClassificationId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试题模块:">
          <el-select v-model="formStructuredata.courseContentId" placeholder="请选择模块/非必选">
            <el-option
              v-for="item in courseContentdata"
              :key="item.createTime"
              :label="item.courseContentName"
              :value="item.courseContentId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分值:"
          prop="questionStore"
          :rules="[
                  { required: true, message: '填写分值', trigger: 'blur'},
                   { type: 'number', message: '必须为数字值'}
                  ]"
        >
          <el-input v-model.number="formStructuredata.questionStore"></el-input>
        </el-form-item>
        <el-form-item label="难度:">
          <el-radio-group v-model="formStructuredata.questtionDifficulty">
            <el-radio :label="1">初级</el-radio>
            <el-radio :label="2">中级</el-radio>
            <el-radio :label="3">高级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="backStep">上一步</el-button>
          <el-button type="primary" @click="Submitjob">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import {
  courseStructurepage,
  courseClassificationpage,
  courseContentpage,
  examinationQuestionadd,
  examinationqusetionfindone,
  questiondeleteupdate
} from "@/api/api";
export default {
  data() {
    return {
      //  rulesdynamicValidateForm:{
      //         questionName:[
      //             { required: true, message: "输入考题描述", trigger: 'blur' }
      //         ],
      //  },
      //dataselect:[],
      choicequestion: "2", //多选或者单选的时候
      radio2: "",
      markdownedit: {
        //试题解析
        analysis: ""
      },
      active: 1,
      imageUrl: "",
      testdescri: "",
      formStructuredata: {
        //其他信息
        courseStructureId: "", //体系id
        courseClassificationId: "", //分类id
        courseContentId: "", ////内容id
        questionStore: "", //分值
        questtionDifficulty: 1, //
        questionType: 1 //判断题
      },
      dynamicValidateForm: {
        answerIndexone: "", //单选
        answerIndexmore: "",
        answerIndex: "",
        questionName: "",
        //  selectmore:[],
        dataselect: []
      },
      optionstixi: [], //体系
      datamodel: [], //分类
      courseContentdata: [], //模块
      selectmore: [],
      editid:{
              examinationQuestionId:'',
      },
    };
  },
  methods: {
    changeselecttype(select) {
      console.log(select);
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
    changeseleval(val) {
      //分类
      var parms = {
        currentPage: 1,
        pageSize: 1000,
        courseStructureId: val
      };
      courseClassificationpage(parms).then(res => {
        if (res.data.code == 0) {
          this.datamodel = res.data.data.list;
        }
      });
    },
    changeconcent(val) {
      //模块
      var parms = {
        currentPage: 1,
        pageSize: 1000,
        courseClassificationId: val
      };
      courseContentpage(parms).then(res => {
        if (res.data.code == 0) {
          this.courseContentdata = res.data.data.list;
        }
      });
    },
    Addanwser() {
      //增加选项
      this.dynamicValidateForm.dataselect.push({
        value_input: "",
        id: Date.now(),
        // selecttable: "" //多选的时候
      });
    },
    delectanswer() {
      //减少选项
      if (this.dynamicValidateForm.dataselect.length > 2) {
        this.dynamicValidateForm.dataselect.pop();
      } else {
        this.$message({
          message: "至少保留两个选项",
          type: "warning"
        });
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    nextStep() {
      //点击下一步等于1
      if (this.active == 1) {
        if (this.dynamicValidateForm.dataselect.length < 3) {
          this.$message.error("增加选择且选项必须大于两个");
          return;
        } else {
          this.$refs["dynamicValidateForm"].validate(valid => {
            if (valid) {
              this.active = this.active + 1;
            }
          });
        }
      } else if (this.active == 2) {
        this.active = this.active + 1;
      }
    },
    backStep() {
      //上一步.等于2的时候
      this.active = this.active - 1;
    },
    Submitjob() {
      //提交数据

      let answerContents = [];
      let selectmore = [];
      for (var i = 0; i < this.dynamicValidateForm.dataselect.length; i++) {
        //后台要的是数组..不带属性的,erbi
        answerContents.push(this.dynamicValidateForm.dataselect[i].value_input);
        // if (this.choicequestion == 1) {
        //   //多选
        //   if (this.dynamicValidateForm.dataselect[i].selecttable == true) {
        //     selectmore.push(i);
        //     this.dynamicValidateForm.answerIndex = selectmore.join(""); ///转换整number
        //   }
        // }
        //  else {
          //单选的时候
          this.dynamicValidateForm.answerIndex = this.dynamicValidateForm.answerIndexone;
        // }

      }
      this.dynamicValidateForm.answerContents = answerContents;
      var parms = Object.assign(
        this.dynamicValidateForm,
        this.formStructuredata,
        this.markdownedit
      ); //合并对象

     if(this.$route.params.type=='add'){
       this.$refs["formStructuredata"].validate(valid => {
        if (valid) {
          examinationQuestionadd(parms).then(res => {
            console.log(res);
            if (res.data.code === 0) {
              this.$message({
                type: "success",
                message: "提交成功"
              });
              setTimeout(() => {
                this.$router.push("/examination");
              }, 500);
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
     }else{
 var parmsedit = Object.assign(
        this.dynamicValidateForm,
        this.formStructuredata,
        this.markdownedit,
        this.editid,
      ); //合并对象
        this.$refs["formStructuredata"].validate(valid => {
        if (valid) {
          questiondeleteupdate(parmsedit).then(res => {
            console.log(res);
            if (res.data.code === 0) {
              this.$message({
                type: "success",
                message: "编辑成功"
              });
              setTimeout(() => {
                this.$router.push("/examination");
              }, 500);
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
     }
    },
     getexaminationqusetionfindone(){//编辑
             var parms={
                   questionId:this.$route.params.type
             }
          examinationqusetionfindone(parms).then(res=>{
                console.log('bianjide')
                console.log(res)
                if(res.data.code==0){
                      this.dynamicValidateForm.questionName=res.data.data.questionName
                      // res.data.data.answerContents.forEach((item)=>{
                             
                      // })      
                   for(var i=0;i<res.data.data.answerContents.length;i++){  //cedan
                         this.dynamicValidateForm.dataselect.push({
                            value_input:res.data.data.answerContents[i],
                            //id: Date.now(),
                            // selecttable: "" //多选的时候
                          });    
                       } 
                         // this.dynamicValidateForm.answerIndex    
                      this.dynamicValidateForm.answerIndexone=res.data.data.answerIndex
                      this.markdownedit.analysis=res.data.data.analysis
                      this.formStructuredata.courseStructureId= res.data.data.courseStructureId
                    //  this.changeseleval(res.data.data.courseStructureId)
                      this.formStructuredata.questionStore=res.data.data.questionStore 
                      this.formStructuredata.questtionDifficulty=res.data.data.questtionDifficulty
                      this.editid.examinationQuestionId=res.data.data.examinationQuestionId//编辑的时候增加一个区分的id



                }
          })
     } 



  },
  mounted() {
    this.getcourseStructurepage();
    console.log('路由')
    console.log(this.$route)
      if(this.$route.params.type=='add'){
          
      }else{
          this.getexaminationqusetionfindone() 
      }
  }
};
</script>

<style  lang='scss'  scoped>
.Analysis {
  margin-bottom: 10px;
  font-family: "微软雅黑";
  font-size: 16px;
}
</style>
<style>
.elseform .el-input__inner {
  width: 300px;
}
</style>
