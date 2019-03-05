<template>
  <el-row>
    <el-col :span="24">
      <div class="navigationbar">
        <span class="navigationname">
          在线考试管理
          <i class="el-icon-arrow-right" aria-hidden="true"></i>
          考场增加
        </span>
      </div>
    </el-col>
    <el-col :span="24">
      <el-steps :active="active" finish-status="success" :space="400">
        <el-step title="考场信息"></el-step>
        <el-step title="考生信息"></el-step>
      </el-steps>
    </el-col>
   <el-col v-if="active==1">
        <hr/>
    <el-col :span="12" >
      <el-form :model="testAddform" label-width="120px" size="small" class="testAddform">
        <el-form-item label="考场名称:">
          <el-input v-model="testAddform.roomName" placeholder="请输入考场名称"></el-input>
        </el-form-item>
        <el-form-item label="试卷:">
          <el-select v-model="testAddform.examinationPaperId" placeholder="选择试卷">
            <el-option 
                      v-for="item in papertableData"
                      :key='item.examinationPaperId'
                      :label='item.paperName'
                      :value='item.examinationPaperId'
             ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试开始时间:">
          <el-date-picker
            v-model="startTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            default-time="09:00:00"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="考场排序:">
          <el-input v-model.number="testAddform.roomOrder" placeholder="请输入考场名称" type="number"></el-input>
        </el-form-item>
        <el-form-item label="考场简介:">
          <el-input v-model="testAddform.roomDesc" placeholder="请输入考场名称" type="textarea" :rows="2"></el-input>
        </el-form-item>
         <el-form-item >
          <el-popover placement="bottom" width="160" v-model="visible2">
            <p>取消就后未保存的内容都将删除？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
            </div>
            <el-button slot="reference">取消</el-button>
          </el-popover>
          <el-button type="primary" @click="nextStep">下一步</el-button>
        </el-form-item>


      </el-form>
    </el-col>
    <el-col :span="12">
      <el-form style="margin: 20px 0px 0px 80px;" size="mini">
        <!-- <el-form-item label="考场图片:">
          <el-button type="success" icon="el-icon-upload2">上传图片</el-button>
        </el-form-item> -->
        <!-- <el-form-item>
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
        </el-form-item> -->
      </el-form>
    </el-col>
   </el-col>
    <el-col  :span='24'  v-else >
         <hr/>
         <el-col :span='24' style="margin-top:20px"> 
               <el-button type="primary" size='mini' @click="addStudents" icon='el-icon-plus' >增加考生</el-button>
               <el-col :span="24">
                    <el-table
                        :data="examineetableData"
                        border
                         height="250"
                        size="mini"
                        style="width: 100%;margin-top:20px">
                        <el-table-column
                            prop="date"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="班级"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="操作">
                        </el-table-column>
                    </el-table>  
               </el-col>
               <el-form  size="mini">
                  <el-form-item style="margin:80px 80px 0px 20px;float:right;width:140px">
                    <el-button type="primary" @click="lastStep">上一步</el-button>
                    <el-button type="primary" @click="savemessage" >保存</el-button>
                  </el-form-item>
               </el-form>
                <el-dialog
                    title="考生信息"
                    :visible.sync="dialogVisible"
                    width="580px">  
                   <el-form  size='mini'>
                       <el-form-item>
                         <el-select v-model="calssName" filterable placeholder="请选择班级"    @change="changeselectvalue">
                            <el-option
                                v-for="item in Classoptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                         </el-select> 
                       </el-form-item>
                   </el-form>
                     
                      <el-transfer
                        filterable
                        :filter-method="filterMethod"
                         v-model="uids"
                        :titles="['用户列表', '已选择用户']"
                        :data="studentsdata">
                     </el-transfer>
                      <span slot="footer" class="dialog-footer"  >
                            <el-button @click="dialogVisible = false"  size='mini'    >取 消</el-button>
                            <el-button type="primary" @click="addSusertable" size='mini'  >确 定</el-button>
                        </span>
                </el-dialog>


         </el-col>
               
    </el-col>
  </el-row>
</template>

<script>
import{classlist,examinationroomadd,studentlist,examinationpaperlist}from'@/api/api'
export default {
  data() {
    return {
      startTime:'',//考试开始时间
      calssName:'',
      studentsdata:[],
      uids: [],//选中的
      dialogVisible:false,
      active: 1,
      testAddform: {
             roomName:"", 
             examinationPaperId:"",
             roomOrder:'',
             roomDesc:'',
             uids:[],
      },
      region: "",
      imageUrl: "",
      visible2: false,
      examineetableData:[],
      Classoptions:[],
      papertableData:[],
    };
  },
  methods: {
   getclasslist() {
      var parms = {
          currPage: 1,
          pageSize:100
      };
      classlist(parms).then(res => {
        console.log('班级')
        console.log(res);
        if (res.data.code == 0) {
          this.Classoptions = res.data.data.list;
        }
      });
    },
     getpaperList(){
            var parms={
                  currPage:1,
                  pageSize:10000, 
                }
          examinationpaperlist(parms).then(res=>{
                        console.log("试卷")
                        console.log(res)
                        if(res.data.code==0){
                            this.papertableData=res.data.data.list      
                        }
            })            
  },
    changeselectvalue(value){
       this.studentsdata=[];
        console.log("---------")
         console.log(value)
         var parms={
                   currPage:1,
                   pageSize:2000,
                   classId:value
               }
            studentlist(parms).then(res=>{
                  console.log("学生")
                  console.log(res)   
                  if(res.data.code==0){
                        for(var i=0;i<res.data.data.list.length;i++){
                                this.studentsdata.push({
                                      key:res.data.data.list[i].uid,
                                      label:res.data.data.list[i].username,
                                      calssName:res.data.data.list[i].className,
                                       
                                })
                        }
                      //this.studentsdata=res.data.data.list   
                    console.log(this.studentsdata)
                  }                
            })
    },
      savemessage(){//提交信息
          const token = sessionStorage.getItem("token");
         this.testAddform.createId=token
         this.testAddform.time=String(this.startTime) 
       // this.testAddform.uids=JSON.stringify(this.testAddform.uids)
                  //  this.testAddform.startTime=String(this.testAddform.startTime) 
          var parms=this.testAddform
            
       
            console.log("---发给后台数句---")   
            console.log(parms)
            
           examinationroomadd(parms).then(res=>{
                  console.log("---------------------")
                    console.log(parms)
                   console.log(res)
               
           }) 

      },


      addSusertable(){  
           for(var i in this.uids)  {
                  this.examineetableData.push(this.uids[i])
           }  
           console.log(this.examineetableData)
           this.studentsdata=[]
           this.uids=[]
           this.dialogVisible=false
            this.testAddform.uids=this.examineetableData   
      },

    handleAvatarSuccess(res, file) {
      //上传成功
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      //上传前
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
    nextStep() { //下一步
         this.active=this.active+1          
     },
     lastStep(){
         this.active=this.active-1       
     },
     addStudents(){//
           this.dialogVisible=true     

     },
     filterMethod(query, item){//过滤
          return item.label.indexOf(query) > -1;

     }

  },
  mounted(){
        this.getclasslist()//班级列表
        this.getpaperList()
  }
};
</script>

<style  lang='scss'   scoped>
.testAddform {
  margin-top: 20px;
}
</style>
<style>
.testAddform .el-select {
  width: 100%;
}
.testAddform .el-date-editor {
  width: 100%;
}
</style>
