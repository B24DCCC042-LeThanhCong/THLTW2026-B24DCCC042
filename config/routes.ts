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
    path: '/fitness',
    name: 'Dashboard Fitness',
    component: './Dashboard',
  },

  {
    path: '/nhat-ky-tap-luyen',
    name: 'Nhật ký tập luyện',
    component: './Nhatkytapluyen',
  },

  {
    path: '/nhat-ky-chi-so',
    name: 'Nhật ký chỉ số sức khỏe',
    component: './Nhatkychiso',
  },

  {
    path: '/quan-ly-muc-tieu',
    name: 'Quản lý mục tiêu',
    component: './Quanlymuctieu',
  },

  {
    path: '/thu-vien-bai-tap',
    name: 'Thư viện bài tập',
    component: './Thuvienbaitap',
  },

  {
    path: '/random-user',
    name: 'RandomUser',
    component: './RandomUser',
    icon: 'ArrowsAltOutlined',
  },

  {
    path: '/',
    redirect: '/fitness', // ✅ FIX
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