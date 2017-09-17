new Vue({
  el: '.container',
  data: {
    addressList:new Array(),
    shippingMethod:1,
    limitNum:3,
    addressIndex:0,
    currentDefaultAddress:{}
  },
  mounted: function(){
    var _this = this;
    this.$nextTick(function(){
      _this.addressView();
    })
  },
  methods: {
    addressView: function(){
      var _this = this;
      this.$http.get("data/address.json").then(function(respond){
        _this.addressList = respond.body.result;
      })
    },
    setDefaultAddress: function(address){
      this.addressList.forEach(address=>{
        address.isDefault = false;
      });
      this.currentDefaultAddress = address;
      address.isDefault = true;
    }
  },
  computed: {
    filteAddress: function(){
      return this.addressList.slice(0,this.limitNum);
    }
  }
})