export default {
  path: '/taches',
  name: 'taches',
  component: () => import('../components/tache/Layout'),
  redirect: { name: 'TacheList' },
  children: [
    {
      name: 'TacheList',
      path: '',
      component: () => import('../views/tache/List')
    },
    {
      name: 'TacheCreate',
      path: 'new',
      component: () => import('../views/tache/Create')
    },
    {
      name: 'TacheUpdate',
      path: ':id/edit',
      component: () => import('../views/tache/Update')
    },
    {
      name: 'TacheShow',
      path: ':id',
      component: () => import('../views/tache/Show')
    }
  ]
};
