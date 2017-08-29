import home from '@/components/home/home'
import place from '@/components/place/place'
import shop from '@/components/shop/shop.vue'
import info from '@/components/shop/info/info.vue'
import rate from '@/components/shop/rate/rate.vue'
import list from '@/components/shop/list/list.vue'

const routes = [{
    path: '/home',
    component: home
  },
  {
    path: '/place',
    component: place
  },
  {
    path: '/shop/:id',
    component: shop,
    children: [{
        path: '/',
        name: 'index',
        component: list
      },
      {
        path: 'rate',
        name: 'rate',
        component: rate
      },
      {
        path: 'info',
        name: 'info',
        component: info
      }
    ]
  },
  {
    path: '/',
    redirect: '/place'
  }
]
export default routes
