export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', layout: false, name: 'login', component: './user/Login' },
      { path: '/user', redirect: '/user/login' },
    ],
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './TrangChu',
    icon: 'HomeOutlined',
  },

  {
    path: '/gioi-thieu',
    name: 'About',
    component: './TienIch/GioiThieu',
    hideInMenu: true,
  },

  {
    path: '/random-user',
    name: 'RandomUser',
    component: './RandomUser',
    icon: 'ArrowsAltOutlined',
  },

  {
    path: '/notification',
    routes: [
      { path: '/notification/subscribe', exact: true, component: './ThongBao/Subscribe' },
      { path: '/notification/check', exact: true, component: './ThongBao/Check' },
      { path: '/notification', exact: true, component: './ThongBao/NotifOneSignal' },
    ],
    layout: false,
    hideInMenu: true,
  },

      {
        path: '/home',
        name: 'Home',
        component: './home',
      },
      {
        path: '/lanner',
        name: 'Planner',
        component: './planner',
      },
      {
        path: '/budget',
        name: 'Budget',
        component: './budget',
      },
      {
        path: '/admin',
        name: 'Admin',
        component: './admin',
      },

  

  {
    path: '/',
    redirect: '/dashboard',
  },

  {
    path: '/403',
    component: './exception/403/403Page',
    layout: false,
  },

  {
    path: '/hold-on',
    component: './exception/DangCapNhat',
    layout: false,
  },

  {
    component: './exception/404',
  },
];