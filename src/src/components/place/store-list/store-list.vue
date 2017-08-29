<!-- 店家商品的分类的组件，分类的导航列表 -->
<template>
  <div class="store-container">
    <ul class="excavator-filter">
      <li v-for="(item,index) in rstCategories" @click="changeCategory(item)" :class="{active:item.id==isactive}">{{item.name}}</li>
    </ul>
    <ul class="excavator-filter-subbox" v-show="subCategories">
      <li v-for="subitem in subCategories" @click="changeCategory(subitem)" :class="{focus:subitem.id==isfocus}">{{subitem.name}}</li>
    </ul>
    <span class="excavator-filter-name">商家分类:</span>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      rstCategories: '',//列表
      isactive: '',//选中
      subCategories: '',//子列表
      isfocus: ''//子选中
    }
  },
  created() {
    //请求商品分类列表
    this.ajax('https://mainsite-restapi.ele.me/shopping/v2/restaurant/category?latitude=30.33695&longitude=120.11753');
  },
  methods: {
    ajax: function(url) {
      axios.get(url).then((data) => {
        if (data.statusText == 'OK') {
          this.rstCategories = data.data;
        }
      }).catch(function() {
         console.log("error")
      })
    },
    //类目的事件
    changeCategory(item) {
      this.isactive = item.id;
      this.isfocus = item.id
      if (item.sub_categories) {
        this.subCategories = item.sub_categories
      }
      this.$store.commit('setIsScroll', false);
      this.$store.commit('setMaxOffset', 3);
      item.id && this.$store.commit('setrstCategoriesId', item.id);
      this.$store.dispatch('getAjax', 0);
    }
  }
}

</script>
<style lang="scss">
.store-container {
  .focus {
    color: white;
    color: #fff;
    background-color: #0089dc;
    border-radius: 3px;
  }
  .active {
    background-color: #f6f6f6;
    border-radius: 0;
    margin: 0;
    padding: 0 16px;
    height: 36px;
  }
}


.store-container {
  padding: 10px 10px 10px 98px;
  position: relative;
  overflow: hidden;
  background-color: white;
  border: 1px solid #e6e6e6;
  text-align: center;
  .excavator-filter {
    overflow: hidden;
    li {
      padding: 0 10px;
      margin: 5px 6px;
      float: left;
      line-height: 36px;
      color: #666;

      &:hover {
        background-color: #f6f6f6;
        border-radius: 3px;
      }
    }
  }
  .excavator-filter-subbox {
    background-color: #f6f6f6;
    padding: 6px 0;
    overflow: hidden;
    li {
      padding: 0 10px;
      margin: 5px 6px;
      float: left;
      line-height: 26px;
    }
  }
  .excavator-filter-name {
    position: absolute;
    top: 20px;
    left: 20px;
    color: #666;
  }
}

</style>
