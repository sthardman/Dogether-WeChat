const app = getApp()
Page({
  onLoad: function () {
    let api_url = wx.getStorageSync("apiUrl");
    const page = this;
    wx.request({
      //url: "http://localhost:3000/api/v1/infos",
      url: `${api_url}/infos`,
      success(res) {
        const infos = res.data.infos;
        page.setData(res.data)
      },
    })
  },
  showInfo(event) {
    let data = event.currentTarget.dataset;
    const info = data.info;
    wx.navigateTo({
      url: `../info_show/info_show?id=${info.id}`
    });
  },
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
})
