import axios from 'axios';

export default {
    getAjax({ commit, state }, data) {
        var param = {
            params: {
                offset: data
            }
        }
        var type = 'restaurant_category_ids[]';
        //有种类id，请求就加上id请求特定类型
        if (state.rstCategoriesId) {
            param.params[type] = state.rstCategoriesId
        }
        var url = 'https://mainsite-restapi.ele.me/shopping/restaurants?extras%5B%5D=activities&geohash=wtmkw85zj0w&latitude=30.32347&limit=24&longitude=120.17383&terminal=web';
        axios.get(url, param).then((data) => {
            if (data.statusText == "OK") {
                commit('setrestaurants', data.data)
            }
        })
    }
}
