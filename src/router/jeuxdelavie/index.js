import jeuxdelavietacheRoutes from './jeuxdelavietache'
import jeuxdelaviecategoryRoutes from './jeuxdelaviecategory'
import jeuxdelavietachefaiteRoutes from './jeuxdelavietachefaite'

export default {
  path: '/jeux_de_la_vie',
  name: 'jeux_de_la_vie',
  component: () => import('../../views/jeuxdelavie/Layout'),
  redirect: { name: 'JeuxDeLaVieDashboard' },
  children: [
    {
      name: 'JeuxDeLaVieDashboard',
      path: 'dashboard',
      component: () => import('../../views/jeuxdelavie/dashboard/Dashboard')
    },
    jeuxdelavietacheRoutes,
    jeuxdelaviecategoryRoutes,
    jeuxdelavietachefaiteRoutes
  ]
};
