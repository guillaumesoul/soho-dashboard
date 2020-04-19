export default {
  path: 'tache_faites',
  name: 'jeux_de_la_vie_tache_faites',
  component: () => import('../../components/jeuxdelavie/jeuxdelavietachefaite/Layout'),
  redirect: { name: 'JeuxDeLaVieTacheFaiteList' },
  children: [
    {
      name: 'JeuxDeLaVieTacheFaiteList',
      path: '',
      component: () => import('../../views/jeuxdelavie/jeuxdelavietachefaite/List')
    },
    {
      name: 'JeuxDeLaVieTacheFaiteCreate',
      path: 'new',
      component: () => import('../../views/jeuxdelavie/jeuxdelavietachefaite/Create'),
      props: true
    },
    {
      name: 'JeuxDeLaVieTacheFaiteUpdate',
      path: ':id/edit',
      component: () => import('../../views/jeuxdelavie/jeuxdelavietachefaite/Update')
    },
    {
      name: 'JeuxDeLaVieTacheFaiteShow',
      path: ':id',
      component: () => import('../../views/jeuxdelavie/jeuxdelavietachefaite/Show')
    }
  ]
};
