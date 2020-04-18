import jeuxdelavietacheRoutes from './jeuxdelavietache'
import jeuxdelaviecategoryRoutes from './jeuxdelaviecategory'
import jeuxdelavietachefaiteRoutes from './jeuxdelavietachefaite'

export default {
  path: '/jeux_de_la_vie',
  name: 'jeux_de_la_vie',
  component: () => import('../../views/jeuxdelavie/home'),
  children: [
    jeuxdelavietacheRoutes,
    jeuxdelaviecategoryRoutes,
    jeuxdelavietachefaiteRoutes
  ]
};
