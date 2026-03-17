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
    path: '/',
    redirect: '/dashboard',
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './TrangChu',
    icon: 'HomeOutlined',
  },

  {
    path: '/random-user',
    name: 'RandomUser',
    component: './RandomUser',
    icon: 'ArrowsAltOutlined',
  },

  
  {
    name: 'Quản lý lịch',
    icon: 'CalendarOutlined',
    path: '/quan-ly',
    routes: [
      {
        path: '/quan-ly/nhan-vien',
        name: 'Nhân viên',
        component: './NhanVien',
        icon: 'UserOutlined',
      },
      {
        path: '/quan-ly/dich-vu',
        name: 'Dịch vụ',
        component: './DichVu',
        icon: 'AppstoreOutlined',
      },
      {
        path: '/quan-ly/lich-hen',
        name: 'Lịch hẹn',
        component: './LichHen',
        icon: 'CalendarOutlined',
      },
      {
        path: '/quan-ly/danh-gia',
        name: 'Đánh giá',
        component: './DanhGia',
        icon: 'StarOutlined',
      },
    ],
  },


  {
    path: '/gioi-thieu',
    name: 'About',
    component: './TienIch/GioiThieu',
    hideInMenu: true,
  },

  {
    path: '/notification',
    layout: false,
    hideInMenu: true,
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