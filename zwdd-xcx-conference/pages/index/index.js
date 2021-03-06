let app = getApp();
//替换成开发者后台设置的安全域名
import { loginUrl,getConfListOnline } from "../../utils/config"
import { ddRequest } from "../../utils/ddAjax";
//let url = "http://abcde.vaiwan.com";
//若要在测试应用中临时使用类似abcdef.vaiwan.com 的二级域名代理到无公网IP的服务端开发环境，
//请参考内网穿透工具，注意：内网穿透工具是用于开发测试，当前不保证多个开发者随意设置相同的子域名导致的冲突以及通道稳定性，因此正式应用、正式环境必须是真实的公网IP或者域名，正式应用上线不能使用本工具。
//https://ding-doc.dingtalk.com/doc#/kn6zg7/hb7000
import ErrorView from '../../components/error-view';
import ListView from '../../components/list-view';

import dd from 'gdt-jsapi';

Page({
    ...ErrorView,
    ...ListView,
    data:{
        errorData: {
            type: 'noMeeting',
            title: '',
            button: '刷新',
            onButtonTap: 'handleBack',
            href: '/pages/index/index'
        },
        authCode:'',
        userId:'',   //后台返回的用户id用来查询会议
        listData:{
          isPaging:false, //不分页
          confList:[  //会议列表数据
            // {
            //   type:0,   //0党组会1审委会6其他---是否显示列席人(只有审委会不显示列席人)
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
            //   statusName: "待召开", //状态
            //   startTime:'2019/07/10 14:30',
            //   arrivedNum:4,
            //   leaveNum:5,
            //   attendNum:6,
            //   attendData:null  //审委会去掉列席人员
            // },
            // {
            //   type:6,
            //   typeName:'其他',
            //   id: "89628072-14fc-4c4c-8545-b40d7ce5ad0c",
            //   name:'其他2019年第15次会议',
            //   presenterName:'李占国',
            //   status: 0, // 状态
            //   statusName: "待召开", //状态
            //   startTime:'2019/07/10 14:30',
            //   arrivedNum:4,
            //   leaveNum:5,
            //   attendNum:6,
            //   attendData:'张三,李四,王五,赵六张三,李四,王五,赵六张三,李四,王五,赵六张三,李四,王五,赵六'
            // }
            ]
        },
        isBlank:false

    },
    //无会议刷新事件
    handleBack() {
        my.showToast({
          content: "正在刷新",
          success: (res) => {
            setTimeout(() => {
              my.reLaunch({
                url: '/pages/index/index'
                })  
            },20);
          },
        });
    },
    onLoad(){
      console.log("onLoad");
      this.getUserId();
      //this.getConfList();

    },
    onShow(){
      console.log("onShow");
      //页面埋点
      app.aplus.aplus_queue.push({
        'action':'aplus.sendPV',
        'arguments':[{
          is_auto: false
        }, {
          sapp_id:'1749',
          sapp_name:'conference',
          // 自定义PV参数key-value键值对，以下内容必填，根据应用实际情况设置。
          page_id: 'index',
          page_name: '首页',
          page_url: 'pages/index/index'
        }]
      })
    },
    getAuthCode(){
       my.getAuthCode({
        scopes: ['auth_user'],
        success: (res) => {
          my.alert({
            content: res.authCode,
          });
        },
      });
    },
    //请求后台接口获取用户信息
    getUserId(){
      //获取免登录授权码
      var _this=this;
      dd.getAuthCode({
        // corpId:'65042'
      }).then(res=>{
        console.log(res);
        _this.setData({
            authCode:res.code
        })
        let params=JSON.stringify(
          {authCode: res.code}
        )
        // 如采集用户信息是异步行为需要先执行这个BLOCK埋点
        app.aplus.aplus_queue.push({
          action: 'aplus.setMetaInfo',
          arguments: ['_hold', 'BLOCK']
        });
        //根据授权码换取用户信息(pc端不行)
        ddRequest('post',loginUrl,params).then((res)=>{
          let userInfo = res.data.result;
          console.log("success---userInfo",userInfo);
          //全局存储用户id
          app.globalData.userId=userInfo.userId;
          //用户id需要埋政钉用户真实信息，用户ID必须用accountId，可通过开放平台“获取用户详情”接口获取。
          // _user_id为用户ID
          app.aplus.aplus_queue.push({
            action: "aplus.setMetaInfo",
            arguments: ["_user_id", userInfo.accountId]
          });

          app.aplus.aplus_queue.push({
            action: 'aplus.setMetaInfo',
            arguments: ['_hold', 'START']
          });
          //根据用户id查询当前会议
          _this.getConfList();
        }).catch((err)=>{
          console.log(err);
        })
      }).
      catch(err =>{

      }) 
    },
    // 下拉刷新事件
    onPullDownRefresh() {
      console.log('onPullDownRefresh', new Date());
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
        content: '加载中...',
      });
      ddRequest('post',getConfListOnline,JSON.stringify(
            {
              userId:userId,
            }
          )).then((res)=>{
            console.log("success---getConfList",res);
                  //如果此人没有权限直接进入error页面
                // let page='/pages/error/error';
                // my.navigateTo({ url: page });
              const confList=res.data.result;
              if(!!confList){
                let listData={..._this.data.listData,...{confList}}
                _this.setData({
                  listData
                })
              }
              else{
                _this.setData({
                  'isBlank':true

                })
              }
          }).catch((err)=>{
            console.log(err);
          })
    }
})
