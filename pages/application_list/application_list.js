// pages/application_list/application_list.js
Page({
  onLoad: function (options) {
    const page = this;
    console.log(options.id)
    let api_url = wx.getStorageSync("apiUrl");
    let application_status
    wx.request({
      //url: `http://localhost:3000/api/v1/pets/${options.id}/applications`,
      url: `${api_url}/pets/${options.id}/applications`,
      method: 'GET',
      success(res) {
        const my_apps = res.data.applications;
        console.log(res)
        console.log(application_status)
        page.setData(
          {
            my_apps: my_apps,
          }
        );
      },
    })
  },


   showApplication(e) {
    const data = e.currentTarget.id;
    console.log(data)
    wx.navigateTo({
      url: `/pages/application_show/application_show?id=${data}`
    });
  },
})