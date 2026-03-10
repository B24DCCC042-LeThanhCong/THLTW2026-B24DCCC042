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
  path: '/oantuti',
  name: 'Oẳn Tù Tì',
  
  component: '@/pages/TH02-Bai1_OanTuTi/index',
  },
  {
  path: '/quanlycauhoi',
  name: 'Ngân hàng câu hỏi',
  
  component: '@/pages/TH02-Bai2_QuanLyNganHangCauHoi/index'
  },
  {
    path: '/',
    redirect: '/dashboard',
  },

  {
    component: './exception/404',
  },
];