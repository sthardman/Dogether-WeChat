Page({
  data: {},
  onLoad: function (options) {
    let page = this;
    let api_url = wx.getStorageSync("apiUrl");
    wx.request({
      //url: `http://localhost:3000/api/v1/users/${options.id}`,
      url: `${api_url}/users/${options.id}`,
      method: 'GET',
      success(res) {
        console.log(res)
        const user = res.data;
        page.setData(
          { user: user }
        );
        // wx.hideToast();
      }
    });
  },

})

