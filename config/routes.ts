export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },

  ///////////////////////////////////
  // DEFAULT MENU
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

  // BLOG
  {
    path: '/blog',
    name: 'Home',
    component: './BlogHome',
  },
  {
    path: '/blog/:id',
    name: 'Detail',
    component: './BlogDetail/[id]', 
  },
  {
    path: '/blog-admin',
    name: 'Admin',
    component: './BlogAdmin', // ❗ FIX dấu /
  },
  {
    path: '/about',
    name: 'About Blog',
    component: './BlogAbout',
  },

  // NOTIFICATION (FIX)
  {
    path: '/notification',
    routes: [
      {
        path: '/notification/subscribe',
        component: './ThongBao/Subscribe',
      },
      {
        path: '/notification/check',
        component: './ThongBao/Check',
      },
      {
        path: '/notification',
        component: './ThongBao/NotifOneSignal',
      },
    ],
    layout: false,
    hideInMenu: true,
  },

  // REDIRECT HOME
  {
    path: '/',
    redirect: '/blog', 
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