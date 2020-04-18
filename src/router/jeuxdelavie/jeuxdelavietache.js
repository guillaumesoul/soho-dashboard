export default {
  path: 'taches',
  name: 'jeux_de_la_vie_taches',
  component: () => import('../../components/jeuxdelavietache/Layout'),
  redirect: { name: 'JeuxDeLaVieTacheList' },
  children: [
    {
      name: 'JeuxDeLaVieTacheList',
      path: '',
      component: () => import('../../views/jeuxdelavie/jeuxdelavietache/List')
    },
    {
      name: 'JeuxDeLaVieTacheCreate',
      path: 'new',
      component: () => import('../../views/jeuxdelavie/jeuxdelavietache/Create')
    },
    {
      name: 'JeuxDeLaVieTacheUpdate',
      path: ':id/edit',
      component: () => import('../../views/jeuxdelavie/jeuxdelavietache/Update')
    },
    {
      name: 'JeuxDeLaVieTacheShow',
      path: ':id',
      component: () => import('../../views/jeuxdelavie/jeuxdelavietache/Show')
    }
  ]
};
