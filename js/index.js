var vm = new Vue({
  el: '#app',
  data: {
    totalMoney:0,
    list:new Array(),
    isSelectAll:false,
    confirmDelete:false,
    readyToDelIndex:-1
  },
  mounted: function(){
    var _this = this;
    this.$nextTick(function(){
      // 这样写代码保证 this.$el 在 document 中
      _this.cartView();
    })
  },
  filters: {
    formatMoney: function(value){
      return "￥ " + value.toFixed(2);
    }
  },
  methods: {
    cartView: function(){
      var _this = this;
      _this.$http.get("data/cartData.json").then(function(response){
        _this.list = response.body.result.list;
        _this.totalMoney = response.body.result.totalMoney;
      })
    },
    changeQuentity: function(item,nums){
      item.productQuentity += nums;
      if(item.productQuentity < 1){
        item.productQuentity = 1;
      }
    },
    selectGood: function(item,index){
      if(typeof item.isChecked == 'undefined'){
        this.$set(item,"isChecked",true)
      } else {
        item.isChecked = !item.isChecked;
      }
      this.isCheckAll();
    },
    selectAll: function(flag){
      var _this = this;
      this.isSelectAll = flag;
      this.list.forEach(function(item){
        if(typeof item.isChecked == 'undefined'){
          _this.$set(item,"isChecked",flag)
        }else{
          item.isChecked = flag;
        }
      })
    },
    isCheckAll: function(){
      var flag = true;
      this.list.forEach(function(item){
        if(!item.isChecked){
          flag = false;
        }
      });
      if(!flag){
        this.isSelectAll = false;
      } else {
        this.isSelectAll = true;
      }
    },
    delGood: function(item,_index){
      this.confirmDelete = true;
      this.readyToDelIndex = _index;
    },
    cancelDel: function(){
      this.confirmDelete = false;
      this.readyToDelIndex = -1;
    },
    doDel: function(){
      this.list.splice(this.readyToDelIndex,1);
      this.confirmDelete = false;
    }
  },
  computed:{
    totalPrice:function(){
      var total = 0;
      this.list.forEach(function(good){
        if(good.isChecked){
          total += good.productPrice * good.productQuentity;
        }
      });
      return total;
    }
  }
})