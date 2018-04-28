// new_pet.js
let cos_utils = require('../../utils/cos')
var config = require('../../config')
let Key = ''
let image_src = 'https://petwalk-1256477841.cos.ap-shanghai.myqcloud.com'
let params;
var app = getApp()

Page({
  data: {
    loading: false,
    size_index:""
  },
  onLoad: function (options) {
    let page = this
    let api_url = wx.getStorageSync("apiUrl");
    let params = wx.getStorageSync("currentUser");
  },
  bindSizeChange: function (e) {
    this.setData({
      size_index: e.detail.value
    })
  },
  bindSubmit: function (e) {
    let currentUserId = wx.getStorageSync("currentUser").id

    this.setData({
      loading: !this.data.loading
    })

    wx.showToast({
      title: 'Sending...',
      icon: 'loading',
      duration: 5000
    });
    image_src = "https://petwalk-1256477841.cos.ap-shanghai.myqcloud.com/" + Key
    let name = e.detail.value.name;
    let color = e.detail.value.color;
    let age = e.detail.value.age;
    let city = e.detail.value.pet_city;
    let size = e.detail.value.size;
    let description = e.detail.value.description;
    let pet_type = e.detail.value.pet_type;
    let gender = e.detail.value.gender;
    let adopted = e.detail.value.adopted;
    let vaccinated = e.detail.value.vaccinated;
    let healthy = e.detail.value.healthy;
    let spayed = e.detail.value.spayed;
    let image = image_src;
    console.log(e.detail);
    let pet = {
      name: name,
      color: color,
      age: age,
      city: city,
      size: size,
      description: description,
      pet_type: pet_type,
      gender: gender,
      adopted: adopted,
      vaccinated: vaccinated,
      healthy: healthy,
      spayed: spayed,
      image: image,
    }
    let api_url = wx.getStorageSync("apiUrl");
    wx.request({
      //url: `http://localhost:3000/api/v1/users/${currentUserId}/pets/`,
      url: `${api_url}/users/${currentUserId}/pets/`,
      method: 'POST',
      data: {
        pet: pet
      },
      success() {
        // set data on index page and show
        wx.reLaunch({
          url: `/pages/index/index`,
        });
      }
    });
  },
  choosePhoto: function () {
    const page = this;
    let filePath = '';
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        filePath = res.tempFilePaths[0]
        Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
        page.setData({
          filePath: filePath,
          Key: Key
        })
        cos_utils.cos.postObject({
          Bucket: config.Bucket,
          Region: config.Region,
          Key: Key,
          FilePath: filePath,
          onProgress: function (info) {
            console.log(JSON.stringify(info));
          },
        },
          cos_utils.requestCallback);
        image_src = "https://petwalk-1256477841.cos.ap-shanghai.myqcloud.com" + Key
      },
    })
  },
})