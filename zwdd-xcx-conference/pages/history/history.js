let app = getApp();
import { getConfListHistory } from "../../utils/config";
import { ddRequest } from "../../utils/ddAjax";

import dd from 'gdt-jsapi';
import ListView from '../../components/list-view';
import ErrorView from '../../components/error-view';

Page({
  ...ListView,
  ...ErrorView,

  data: {
    errorData: {
      type: 'noHistory',
      title: '未查询到历史会议',
      button: '刷新',
      onButtonTap: '',
      href: '/pages/history/history'
    },
    listData:{
      isPaging:true,
      curPage:0,          //分页显示历史会议
      totalPage:0,       //总会议数
      isMore:true,
      confList:[  //会议列表数据
        //  {
        //   type:0,   //0党组会1审委会---是否显示列席人(只有党组会显示列席人)
        //   typeName:'党组会',
        //   id: "89628072-14fc-4c4c-8545-b40d7ce5ad0c",
        //   name:'2019年第1115次会议',
        //   presenterName:'李占国',
        //   status: 0, // 状态
	      //   statusName: "待召开", //状态
        //   startTime:'2019/07/10 14:30',
        //   arrivedNum:4,
        //   leaveNum:5,
        //   attendNum:6,
        //   attendData:'张三,李四,王五,赵六张三,李四,王五,赵六张三,李四,王五,赵六张三,李四,王五,赵六'
        // },
        // {
        //   type:1,
        //   typeName:'审委会',
        //   id: "89628072-14fc-4c4c-8545-b40d7ce5ad0c",
        //   name:'2019年第15次会议',
        //   presenterName:'李占国',
        //   status: 0, // 状态
	      //    statusName: "待召开", //状态
        //   startTime:'2019/07/10 14:30',
        //   arrivedNum:4,
        //   leaveNum:5,
        //   attendNum:6,
        //   attendData:null  //审委会去掉列席人员
        // },
        // {
        //   type:0,   //0党组会1审委会---是否显示列席人(只有党组会显示列席人)
        //   typeName:'党组会',
        //   id: "89628072-14fc-4c4c-8545-b40d7ce5ad0c",
        //   name:'2019年第1115次会议',
        //   presenterName:'李占国',
        //   status: 0, // 状态
	      //   statusName: "待召开", //状态
        //   startTime:'2019/07/10 14:30',
        //   arrivedNum:4,
        //   leaveNum:5,
        //   attendNum:6,
        //   attendData:'张三,李四,王五,赵六张三,李四,王五,赵六张三,李四,王五,赵六张三,李四,王五,赵六'
        // },
        // {
        //   type:1,
        //   typeName:'审委会',
        //   id: "89628072-14fc-4c4c-8545-b40d7ce5ad0c",
        //   name:'2019年第15次会议',
        //   presenterName:'李占国',
        //   status: 0, // 状态
	      //    statusName: "待召开", //状态
        //   startTime:'2019/07/10 14:30',
        //   arrivedNum:4,
        //   leaveNum:5,
        //   attendNum:6,
        //   attendData:null  //审委会去掉列席人员
        // }
      ]
    },
    isActive:-1,  //tab切换显示----1全部0党组会1审委会6其他---记录当前选中的tab
    isBlank:false,
    keyword:''  //搜索关键字
  },
  onLoad() {
    //根据用户id拿到会议列表
    this.getConfList();
  },
  // tab切换事件
  toggleTab(e){
    let _this=this;
    let val=e.target.dataset.value;
    let isActive=val;   
    //my.alert({content: "当前点击的是"+val});
    if(this.data.type==val){  //重复点击相同的tab
      return false;
    }
    //切换的时候重置页面状态
    this.setData({
      isActive
    });
    //重置列表数据显示
    this.initListData();
    setTimeout(function(){
      _this.getConfList();
    },20)
  },
  //重置列表数据
  initListData(){
    let listData={
      isPaging:true,
      curPage:0,          //分页显示历史会议
      totalPage:0,       //总会议数
      isMore:true,
      confList:[]
    }
    this.setData({
      listData,
      'isBlank':false
    })
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    console.log('onPullDownRefresh', new Date());
    //重置列表数据显示
    this.initListData();
    this.getConfList();
    setTimeout(() => {
      my.stopPullDownRefresh();
    }, 20);
  },
  //根据用户id获取会议列表
  getConfList(){
    var _this=this;
    let userId=app.globalData.userId;
    my.showLoading({
      content: '加载中...'
    });
    let params= JSON.stringify({
            userId:userId,
            pageNo:_this.data.listData.curPage,    //默认显示前5条---主要用于历史会议的分页显示
            type:_this.data.isActive,    //0党组会,1审委会
            keyword:_this.data.keyword
    });
    ddRequest('post',getConfListHistory,params).then((res)=>{
      console.log("success---getConfList",res);
      if(!!res.data.result){
        let confArr=res.data.result.rows;
        let totalPage=res.data.result.total;
        var confData=_this.data.listData.confList.concat(confArr);
        let newData={
          totalPage,
          confList:confData
        };
        let listData={..._this.data.listData,...newData};
        _this.setData({
          listData
        })
      }else{
        _this.setData({
          'isBlank':true
        })
      }
    }).catch((err)=>{
      console.log(err);
    })
  },
  inputBlur(){
    console.log("inputBlur");
    //dd.hideKeyboard();
  },
  inputFocus(){
    console.log("inputFocus");
    // dd.showPlainInputUponKeyboard({
    //     placeholder: "说点什么吧", //占位符
    //     text: "搜索", //默认填充文本
    // }).then(res => {
    //     console.log(res)
    // }).catch(err => {})
  },
  inputConfirm(){
    console.log("inputConfirm");
     //重置列表数据显示
    this.initListData();
    this.getConfList();
  },
  inputInput(e){
     console.log("inputInput");
     this.setData({
       keyword:e.detail.value
     })
  }
});
