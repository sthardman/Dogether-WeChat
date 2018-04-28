 var WxSearch = require('../../wxSearchView/wxSearchView.js');

  Page({
  data: { },

    // 搜索栏
    onLoad: function () {
      var that = this;
      let api_url = wx.getStorageSync("apiUrl");
      WxSearch.init(
        that,  // 本页面一个引用
        ['cat', 'dog', 'rabbit', "big", "small", 'healthy', 'vaccinated', "female", 'male', 'medium'], // 热点搜索推荐，[]表示不使用
        
        that.mySearchFunction, // 提供一个搜索回调函数
        that.myGobackFunction //提供一个返回回调函数
      );
    },

    // 转发函数,固定部分
    wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
    wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
    wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
    wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
    wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

    // 搜索回调函数  
    mySearchFunction: function (value) {
      // do your job here
      // 跳转
      let page = this;
      let query = value;
      let api_url = wx.getStorageSync("apiUrl");
      console.log(query);
      wx.request({
        url: `${api_url}/pets?query=${query}`,
        method: 'GET',
        success(res) {
          console.log("hello")
          console.log(res)
          let pets = res.data.pets;
          console.log(pets)
          // Update local data
          page.setData({
            pets: pets
          });

        }
      });
      wx.redirectTo({
        url: '../index/index?searchValue=' + value
      })
    },
    showGif: function (e) {
      console.log(e);
      const data = e.currentTarget.dataset;
      const petId = data.pet;
      wx.navigateTo({
        url: `../show/show?id=${petId}`
      });
    },
    // 返回回调函数
    myGobackFunction: function () {
      // do your job here
      // 跳转
      wx.redirectTo({
        url: '../index/index'
      })
    }
})