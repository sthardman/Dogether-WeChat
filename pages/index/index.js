const app = getApp()
var WxSearch = require('../../wxSearchView/wxSearchView.js');
Page({
  onLoad: function () {
    let api_url = wx.getStorageSync("apiUrl");
    const page = this;
    wx.request({
      //url: `http://localhost:3000/api/v1/pets`,
      url: `${api_url}/pets`,
      method: 'GET',
      success(res) {
        const pets = res.data;
        page.setData(
          { pets: pets }
        );
      },
    })
  },

  showPet(event) {
    let data = event.currentTarget.dataset;
    const pet = data.pet;
    console.log(pet.id)
    wx.navigateTo({
      url: `../pet_show/pet_show?id=${pet.id}`
    });
  },
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  data: {
    showButton1: false
  },
  tapButton1: function () {
    this.setData({
      showButton1: !this.data.showButton1
    })
  },

  wxSearchTab: function () {
    wx.redirectTo({
      url: '../search/search'
    })
  },
})
