let apiUrl = require('../../app')
var app = getApp()
Page({
  data: {
    loading: false
  },

  onLoad: function (options) {
    let page = this;
    const petId = options.pet_id
    this.setData({ petId: petId });
    let currentUserId = wx.getStorageSync("currentUser").id
    let api_url = wx.getStorageSync("apiUrl")
    console.log(api_url)
    wx.request({
      //url: `http://localhost:3000/api/v1/pets/${petId}`,
      url: `${api_url}/pets/${petId}`,
      method: 'GET',
      success(res) {
        console.log(res)
        const pet = res.data.pet;
        page.setData({
          pet: pet
        });
      }
    });

  },

  bindSubmit: function (e) {
    let currentUserId = wx.getStorageSync("currentUser").id
    let api_url = wx.getStorageSync("apiUrl")

    this.setData({
      loading: !this.data.loading
    })

    wx.showToast({
      title: 'Sending...',
      icon: 'loading',
      duration: 5000
    });
    let comment = e.detail.value.comment;
    let contact_comment = e.detail.value.contact_comment;
    let page = this
    
    let application = {
      status: false,
      comment: comment,
      contact_comment: contact_comment,
      pet_id: page.data.pet.id,
      user_id: currentUserId,
    }
    console.log(page.data.pet.id)
    // get api data
    wx.request({
      //url: `http://localhost:3000/api/v1/applications`,
      url: `${api_url }/applications`,
      method: 'POST',
      data: application,
      success(res) {        
        wx.reLaunch({
          url: `/pages/application_confirm/application_confirm`,
        });
      }
    });
  }
})