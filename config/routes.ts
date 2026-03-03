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

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './TrangChu',
    icon: 'HomeOutlined',
  },

  {
    path: '/quan-ly',
    name: 'QuanLyDonHang',
    component: './QuanLyDonHang',
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
  },

  {
    path: '/bai1',
    name: 'Bai1DoanSo',
    component: './Bai1_Doanso',
  },

  {
    path: '/bai2',
    name: 'Bai2QuanLyHocTap',
    component: './Bai2_QuanLyHocTap',
  },

  {
    path: '/',
    redirect: '/dashboard',
  },

  {
    component: './exception/404',
  },
];