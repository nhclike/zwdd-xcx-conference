import dd from 'gdt-jsapi';

App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);

  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData:{
    userId:''
    // userId:'7I/mqkFtRz2vap4/ilZwBCETHnkTQ4nTR2onNbmhzCYyNVq2126T2SZEGybahWP5KSxGbUZOrz82/flswe/D+5xs0Qe4PTUiE0nZCzDAdtl7MuJ5n42kNA7CS22W8GpJ'
  }
});
