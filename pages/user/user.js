const app = getApp()
// new_pet.js
Page({
  data: { },
  onLoad: function (options) {
    let page = this
    let user = wx.getStorageSync("currentUser");
    let api_url = wx.getStorageSync("apiUrl");

    //console.log(user.id)
    // Get api data
    wx.request({
      //url: `http://localhost:3000/api/v1/users/${user.id}`,
      url: `${api_url}/users/${user.id}`,
      method: 'GET',
      success(res) {
        const user = res.data;
        const pets = res.data.pets;
        page.setData(
          { user: user, 
          pets: pets }
        );
      }
    });
  },
  myApplications(e) {
    const data = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/application_my_apps/application_my_apps`
    });
  },
  
  editProfile(e) {
    let page = this
    let user = wx.getStorageSync("currentUser");
    wx.navigateTo({
      url: `/pages/profile_edit/profile_edit?id=${user.id}`
    });
  },

  addPet: function (e) {
    let page = this
    let id = e.currentTarget.id;
    // console.log(id)
    wx.switchTab({
      url: `/pages/pet_add/pet_add?id=${id}`
    });
  },
  deletePet(e) {
    const data = e.currentTarget.dataset;
    const id = data.petId;
    console.log(id)
    let api_url = wx.getStorageSync("apiUrl");
    let user = wx.getStorageSync("currentUser");
    //console.log(user.id)
    wx.request({
      //url: `http://localhost:3000/api/v1/users/${user.id}/pets/${id}`,
      url: `${api_url}/users/${user.id}/pets/${id}`,
      method: 'DELETE',
      success() {
        // pets.splice(index, 1);
        wx.reLaunch({
          url: `/pages/user/user?user_id=${user.id}`
        });
      },
    })
  },
  showPet(e) {
    const data = e.currentTarget.dataset;
    const id = data.petId;
    wx.navigateTo({
      url: `../pet_show/pet_show?id=${id}`
    });
  },
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
})
