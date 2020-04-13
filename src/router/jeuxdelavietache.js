export default {
  path: '/jeux_de_la_vie_taches',
  name: 'jeux_de_la_vie_taches',
  component: () => import('../components/jeuxdelavietache/Layout'),
  redirect: { name: 'JeuxDeLaVieTacheList' },
  children: [
    {
      name: 'JeuxDeLaVieTacheList',
      path: '',
      component: () => import('../views/jeuxdelavietache/List')
    },
    {
      name: 'JeuxDeLaVieTacheCreate',
      path: 'new',
      component: () => import('../views/jeuxdelavietache/Create')
    },
    {
      name: 'JeuxDeLaVieTacheUpdate',
      path: ':id/edit',
      component: () => import('../views/jeuxdelavietache/Update')
    },
    {
      name: 'JeuxDeLaVieTacheShow',
      path: ':id',
      component: () => import('../views/jeuxdelavietache/Show')
    }
  ]
};
