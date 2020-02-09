export default {
  path: '/tests',
  name: 'tests',
  component: () => import('../components/test/Layout'),
  redirect: { name: 'TestList' },
  children: [
    {
      name: 'TestList',
      path: '',
      component: () => import('../views/test/List')
    },
    {
      name: 'TestCreate',
      path: 'new',
      component: () => import('../views/test/Create')
    },
    {
      name: 'TestUpdate',
      path: ':id/edit',
      component: () => import('../views/test/Update')
    },
    {
      name: 'TestShow',
      path: ':id',
      component: () => import('../views/test/Show')
    }
  ]
};
