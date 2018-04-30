// app.js
App({
  onLaunch: function () {
    //PRODUCTION ENVIRONMENT///
    let api_url = 'https://dogether.wogengapp.cn/api/v1';
    
    //DEVELOPMENT ENVIRONMENT///
    // let api_url = 'http://localhost:3000/api/v1';

    wx.setStorageSync("apiUrl", api_url);
    // console.log('登录')
    wx.login({
      success: function (res) {
        if (res.code) {
          const code = res.code
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country

              const user = {
                name: nickName,
                image: avatarUrl,
                city: city,
                
              }
              console.log(user)
              let api_url = wx.getStorageSync("apiUrl");
              wx.request({
                url: `${api_url}/users`,
                method: 'POST',
                data: {
                  code: code,
                  user: user
                },
                
                success: function (res) {
                  let currentUser = res.data
                  console.log(currentUser);
                  wx.setStorageSync("currentUser", currentUser)
                }

              })
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    console.log("starting put area")
    // let user = wx.getStorageSync("currentUser");
    // let api_url = wx.getStorageSync("apiUrl");
    let current_user = wx.getStorageSync("currentUser").id;
    const sign_in_time_stamp = new Date()
    let user = {
      last_sign_in_at: sign_in_time_stamp
    }
    wx.request({

      /// url: `http://localhost:3000/api/v1/users/${currentUserId}`,
      url: `${api_url}/users/${current_user}`,
      method: 'PUT',
      data: {
        user
      },
      // success() {
      //   // set data on index page and show
      //   wx.reLaunch({
      //     url: `/pages/user/user?current_user_id=${currentUserId}`,
      //   });
      // }
    });
  },
  // Global variable
  globalData: {
    userInfo: null,
  }




  
})

