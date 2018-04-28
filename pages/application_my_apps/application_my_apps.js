Page({
  onLoad: function () {
    const page = this;
    let current_user = wx.getStorageSync("currentUser").id;
    let api_url = wx.getStorageSync("apiUrl");
    wx.request({
      //url: `http://localhost:3000/api/v1/users/3/applications`,
      url: `${api_url}/users/${current_user}/applications`,
      method: 'GET',
      success(res) {
        const my_apps = res.data.my_apps;
        const apps_received = res.data.apps_received;
        page.setData(
          { my_apps: my_apps,
            apps_received: apps_received
            }
        );
        console.log(my_apps)
        console.log(apps_received)
        console.log(res)
      },

    })
  },

  showApplicationList(e) {
    const data = e.currentTarget.id;
    console.log(data)
    wx.navigateTo({
      url: `/pages/application_list/application_list?id=${data}`
    });
  },
  onShareAppMessage: function () {
  
  }
})