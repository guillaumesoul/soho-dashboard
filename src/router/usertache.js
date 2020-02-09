export default {
  path: '/user_taches',
  name: 'user_taches',
  component: () => import('../components/usertache/Layout'),
  redirect: { name: 'UserTacheList' },
  children: [
    {
      name: 'UserTacheList',
      path: '',
      component: () => import('../views/usertache/List')
    },
    {
      name: 'UserTacheCreate',
      path: 'new',
      component: () => import('../views/usertache/Create')
    },
    {
      name: 'UserTacheUpdate',
      path: ':id/edit',
      component: () => import('../views/usertache/Update')
    },
    {
      name: 'UserTacheShow',
      path: ':id',
      component: () => import('../views/usertache/Show')
    }
  ]
};
