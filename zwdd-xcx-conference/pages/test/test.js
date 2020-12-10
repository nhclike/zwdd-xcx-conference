import dd from 'gdt-jsapi';
import ListView from '../../components/list-view';
import ErrorView from '../../components/error-view';

Page({
  ...ListView,
  ...ErrorView,

  data: {
    errorData: {
            type: 'noMeeting',
            title: '',
            button: '刷新',
            onButtonTap: '',
            href: '/pages/test/test'
        },
    listData:{
        curPage:0,          //分页显示历史会议
      totalPage:0,       //总会议数
      isMore:true,
      confList:[  //会议列表数据
         {
          type:0,   //0党组会1审委会---是否显示列席人(只有党组会显示列席人)
          typeName:'党组会',
          id: "89628072-14fc-4c4c-8545-b40d7ce5ad0c",
          name:'2019年第1115次会议',
          presenterName:'李占国',
          status: 0, // 状态
	        statusName: "待召开", //状态
          startTime:'2019/07/10 14:30',
          arrivedNum:4,
          leaveNum:5,
          attendNum:6,
          attendData:'张三,李四,王五,赵六张三,李四,王五,赵六张三,李四,王五,赵六张三,李四,王五,赵六'
        },
        {
          type:1,
          typeName:'审委会',
          id: "89628072-14fc-4c4c-8545-b40d7ce5ad0c",
          name:'2019年第15次会议',
          presenterName:'李占国',
          status: 0, // 状态
	         statusName: "待召开", //状态
          startTime:'2019/07/10 14:30',
          arrivedNum:4,
          leaveNum:5,
          attendNum:6,
          attendData:null  //审委会去掉列席人员
        },
        {
          type:0,   //0党组会1审委会---是否显示列席人(只有党组会显示列席人)
          typeName:'党组会',
          id: "89628072-14fc-4c4c-8545-b40d7ce5ad0c",
          name:'2019年第1115次会议',
          presenterName:'李占国',
          status: 0, // 状态
	        statusName: "待召开", //状态
          startTime:'2019/07/10 14:30',
          arrivedNum:4,
          leaveNum:5,
          attendNum:6,
          attendData:'张三,李四,王五,赵六张三,李四,王五,赵六张三,李四,王五,赵六张三,李四,王五,赵六'
        },
        {
          type:1,
          typeName:'审委会',
          id: "89628072-14fc-4c4c-8545-b40d7ce5ad0c",
          name:'2019年第15次会议',
          presenterName:'李占国',
          status: 0, // 状态
	         statusName: "待召开", //状态
          startTime:'2019/07/10 14:30',
          arrivedNum:4,
          leaveNum:5,
          attendNum:6,
          attendData:null  //审委会去掉列席人员
        }
        ]
    },
  },
  onLoad() {},
  goInput(){
    dd.showPlainInputUponKeyboard({
      placeholder: "说点什么吧", //占位符
      text: "", //默认填充文本
    }).then(res => {
        console.log(res)
    }).catch(err => {})
  },
  chooseDate(){
    dd.datePicker({
      format: "yyyy-MM-dd",
      currentDate: "2019-12-12",
    }).then(res => {
      console.log(res)
    }).catch(err => {})
  },
  hideKeyboard(){
    dd.hideKeyboard();
  },
  chooseCalendar(){
    dd.chooseDateRangeWithCalendar({
        defaultStart:1494415396228,
        defaultEnd:1494415396228,
    }).then(res => {
    /*{
        start:1494345600000,
        start:1514995200000,
        timezone:8
      }
    */
    })
  },
  inputText(){
    dd.showPlainInputUponKeyboard({
        placeholder: "说点什么吧", //占位符
        text: "搜索", //默认填充文本
    }).then(res => {
        console.log(res)
    }).catch(err => {})
  },
  inputConfirm(){
    console.log("inputConfirm");
  },
  inputInput(){
     console.log("inputInput")
  }
});
