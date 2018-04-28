Page({
  
  
  onLoad: function (options) {
    const page = this;
    let api_url = wx.getStorageSync("apiUrl");
    console.log(options.id)
    wx.request({
      url: `${api_url}/applications/${options.id}`,
      method: 'GET',
      success(res) {
        const application = res.data;
        page.setData(
          {
            application: application,
          }
        );
      },
    })
  },
  showApplication(e) {
    const data = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/application_show/application_show?id=${data.id}`,
    });
  },
  bindSubmit: function (e) {
    this.setData({
      loading: !this.data.loading
    }),
      wx.showToast({
        title: 'Sending...',
        icon: 'loading',
        duration: 1500
      });
    let user_id = this.data.user_id;
    let pet = {
      name: name,
      image: image,
      size: size,
      age: age
    }
    let api_url = wx.getStorageSync("apiUrl");
    wx.request({
      //url: `http://localhost:3000/api/v1/applications`,
      url: `${api_url}/applications`,
      method: 'POST',
      data: pet,
      success() {
        wx.reLaunch({
          url: `/pages/user/user`,
        });
      },
    })
  },
})
