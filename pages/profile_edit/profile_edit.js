var app = getApp()
Page({
  onLoad: function (options) {
    const page = this;
    let api_url = wx.getStorageSync("apiUrl");
    console.log(options)
    wx.request({
      //url: `http://localhost:3000/api/v1/users/${options.id}`,
      url: `${api_url}/users/${options.id}`,
      method: 'GET',
      success(res) {
        const user = res.data;
        page.setData({ 
          user: user 
          });
      },
    })
  },

  bindSubmit: function (e) {
    let currentUserId = wx.getStorageSync("currentUser").id
    this.setData({
      loading: !this.data.loading
    }),
      wx.showToast({
        title: 'Sending...',
        icon: 'loading',
        duration: 1500
      });

    let name = e.detail.value.name;
    let city = e.detail.value.city;
    let description = e.detail.value.description;

    let user = {
      name: name,
      city: city,
      description: description,
    }
    console.log(user)
    let api_url = wx.getStorageSync("apiUrl");
    wx.request({
     /// url: `http://localhost:3000/api/v1/users/${currentUserId}`,
      url: `${api_url}/users/${currentUserId}`,
      method: 'PUT',
      data: {
        user
      },
      success() {
        // set data on index page and show
        wx.reLaunch({
          url: `/pages/user/user?current_user_id=${currentUserId}`,
        });
      }
    });
  },
})
