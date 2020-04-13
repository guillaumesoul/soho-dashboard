export default {
  path: '/jeux_de_la_vie_categories',
  name: 'jeux_de_la_vie_categories',
  component: () => import('../components/jeuxdelaviecategory/Layout'),
  redirect: { name: 'JeuxDeLaVieCategoryList' },
  children: [
    {
      name: 'JeuxDeLaVieCategoryList',
      path: '',
      component: () => import('../views/jeuxdelaviecategory/List')
    },
    {
      name: 'JeuxDeLaVieCategoryCreate',
      path: 'new',
      component: () => import('../views/jeuxdelaviecategory/Create')
    },
    {
      name: 'JeuxDeLaVieCategoryUpdate',
      path: ':id/edit',
      component: () => import('../views/jeuxdelaviecategory/Update')
    },
    {
      name: 'JeuxDeLaVieCategoryShow',
      path: ':id',
      component: () => import('../views/jeuxdelaviecategory/Show')
    }
  ]
};
