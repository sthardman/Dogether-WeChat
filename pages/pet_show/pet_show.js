Page({
  data: {
  },
  onLoad: function (options) {
    let page = this;
    let user = wx.getStorageSync("currentUser");
    let api_url = wx.getStorageSync("apiUrl");
    let pet_id = options.id
    let applied
    
    console.log(api_url)
    // Get api data
    wx.request({
      //url: `http://localhost:3000/api/v1/pets/${options.id}`,
      url: `${api_url}/pets/${options.id}`,
      method: 'GET',
      success(res) {
        const pet = res.data.pet;
        if (pet.vaccinated) {
          pet.vaccinated = 'Yes'
        }
        else {
          pet.vaccinated = 'No'
        }
        if (pet.healthy) {
          pet.healthy = 'Yes'
        }
        else {
          pet.healthy = 'No'
        }
        if (pet.spayed) {
          pet.spayed = 'Yes'
        }
        else {
          pet.spayed = 'No'
        }
        pet.time_updated = pet.time_updated 
        
        console.log(pet)
        page.setData({
          pet:pet,
          user:user});
      }
    });
    // let user = wx.getStorageSync("currentUser");
    // let api_url = wx.getStorageSync("apiUrl");

    //// checking to see if current user has applied for the pet
    wx.request({
      //url: `http://localhost:3000/api/v1/pets/${options.id}`,
      url: `${api_url}/pets/${pet_id}/applied`,
      method: 'GET',
      success(res) {
        const applied_users = res.data.applied_users;
        if (applied_users.id.includes(user.id)) {
          applied = true
        }
        else {
          applied = false
        }
        console.log("testing applied users")
        console.log(applied_users)
        console.log("testing applied")
        console.log(applied)
        page.setData({
          applied: applied
        });
      }
    });
  },
  newApplication(e) {
    let page = this;
    wx.navigateTo({
      url: `/pages/application_new/application_new?pet_id=${page.data.pet.id}`
    });

  },

  

  myApplications(e) {
    const data = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/application_my_apps/application_my_apps`
    });
  },

  showUser(e) {
    const data = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/user_show/user_show?id=${data}`
    });
  },

  viewWebShowPet(e) {
    let page = this;
    wx.navigateTo({
      url: `http://www.apple.com`
    });
  },

  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: true 
    })
  },
  petEdit(e) {
    let data = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/pet_edit/pet_edit?id=${data}`,
    })
  }
})


