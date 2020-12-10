const PAGENUM=5; //每次拿5条数据

export default {
  data:{
      isPaging:true,   //默认分页
      curPage:0,          //分页显示历史会议
      totalPage:0,       //总会议数
      isMore:true,        //默认有更多
      confList:[]

  },
  toDetail(e){
    //审委会(隐藏详情入口)
      let confId=e.target.dataset.value;
      let type=e.target.dataset.type;
      if(type!=1){
        let page='/pages/detail/detail?confId='+confId+'&type='+type;
        my.navigateTo({ url: page });
      }
  },
   //历史会议较多时分页加载每次加载5个
  loadMore(){
    console.log("loadMoreConference");
    //触发此事件说明已经拉到底部,拉取下页数据
    if(!this.data.listData.isMore){
      return ;
    }
    if((this.data.listData.curPage+1)*PAGENUM<this.data.listData.totalPage){
      const newCurPage=++this.data.listData.curPage;
      let listData={...this.data.listData,...{curPage:newCurPage}}
      this.setData({
        listData
      })
      //请求下页数据
      this.getConfList();
    }
    else{
      // my.alert({
      //   content:'没有更多数据'
      // })
      let listData={...this.data.listData,...{isMore:false}};
      this.setData({
        listData
      })
      console.log("没有更多数据!");
    }
    

  },
}