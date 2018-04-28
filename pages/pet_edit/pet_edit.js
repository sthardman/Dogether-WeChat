// pet_edit.js
let cos_utils = require('../../utils/cos')
var config = require('../../config')
let Key = ''
let image_src = 'https://petwalk-1256477841.cos.ap-shanghai.myqcloud.com'
let params;
var app = getApp()
let pet_id;
let img_upload;
let origin_img;
Page({
  onLoad: function (options) {
    let gender_male;
    let gender_female;
    let adopted_t;
    let adopted_f;
    let vaccinated_t;
    let vaccinated_f;
    let healthy_t;
    let healthy_f;
    let spayed_t;
    let spayed_f;
    let page = this
    let params = wx.getStorageSync("currentUser");
    let api_url = wx.getStorageSync("apiUrl");
    wx.request({
      //url: `http://localhost:3000/api/v1/pets/${options.id}`,
      url: `${api_url}/pets/${options.id}`,
      method: 'GET',
      success(res) {
        const pet = res.data;
        
        if (pet.pet.gender == 'male') {
          gender_male = true
        } else {gender_female = true};

        if (pet.pet.adopted == true) {
          adopted_t = true
        } else { adopted_f = true };

        if (pet.pet.vaccinated == true) {
          vaccinated_t = true
        } else { vaccinated_f = true };

        if (pet.pet.healthy == true) {
          healthy_t = true
        } else { healthy_f = true };

        if (pet.pet.spayed == true) {
          spayed_t = true
        } else { spayed_f = true };

        pet.gender_male = gender_male;
        pet.gender_female = gender_female;
        pet.adopted_t = adopted_t;
        pet.adopted_f = adopted_f;
        pet.vaccinated_t = vaccinated_t;
        pet.vaccinated_f = vaccinated_f;
        pet.healthy_t = healthy_t;
        pet.healthy_f = healthy_f;
        pet.spayed_t = spayed_t;
        pet.spayed_f = spayed_f;
        pet_id = pet.pet.id;
        origin_img = pet.pet.image;
        page.setData(pet);
      },
    });
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
    let id = pet_id;

    let pet = {
      id: id,
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
    }
    if (img_upload) {
      pet.image = image_src
    } else { pet.image = origin_img }
    console.log(pet.image)
    
    let api_url = wx.getStorageSync("apiUrl");
    wx.request({
      //url: `http://localhost:3000/api/v1/pets/${pet_id}`,
      url: `${api_url}/pets/${pet.id}`,
      method: 'PUT',
      data: {
        pet: pet,
        user_id: currentUserId
      },
      success() {
        // set data on index page and show
        wx.reLaunch({
          url: `/pages/user/user`,
        });
      }
    });
  },

  bindSizeChange: function (e) {
    this.setData({
      size_index: e.detail.value
    })
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
        },cos_utils.requestCallback);
        image_src = "https://petwalk-1256477841.cos.ap-shanghai.myqcloud.com" + Key;
        img_upload = true;
      },
    })
  },
})