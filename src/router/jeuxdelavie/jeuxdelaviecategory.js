export default {
  path: 'categories',
  name: 'jeux_de_la_vie_categories',
  component: () => import('../../components/jeuxdelaviecategory/Layout'),
  redirect: { name: 'JeuxDeLaVieCategoryList' },
  children: [
    {
      name: 'JeuxDeLaVieCategoryList',
      path: '',
      component: () => import('../../views/jeuxdelavie/jeuxdelaviecategory/List')
    },
    {
      name: 'JeuxDeLaVieCategoryCreate',
      path: 'new',
      component: () => import('../../views/jeuxdelavie/jeuxdelaviecategory/Create')
    },
    {
      name: 'JeuxDeLaVieCategoryUpdate',
      path: ':id/edit',
      component: () => import('../../views/jeuxdelavie/jeuxdelaviecategory/Update')
    },
    {
      name: 'JeuxDeLaVieCategoryShow',
      path: ':id',
      component: () => import('../../views/jeuxdelavie/jeuxdelaviecategory/Show')
    }
  ]
};
