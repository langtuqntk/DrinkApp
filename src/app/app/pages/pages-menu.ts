import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/app/pages/dashboard',
    home: true,
  },
  {
    title: 'BÁN HÀNG',
    link: '/app/pages/banhang',
    home: true,
  },
  {
    title: 'NHẬP HÀNG',
    link: '/app/pages/nhaphang',
    home: true,
  },
  {
    title: 'CẬP NHẬT GIÁ BÁN',
    link: '/app/pages/capnhatgia',
    home: true,
  },
  {
    title: 'QUẢN LÝ DANH MỤC',
    icon: 'nb-tables',
    children: [
      {
        title: 'QUẢN LÝ BÀN',
        link: '/app/pages/tables/bans',
      },
      {
        title: 'QUẢN LÝ KHÁCH',
        link: '/app/pages/tables/khachhangs',
      },
      {
        title: 'QUẢN LÝ HÀNG',
        link: '/app/pages/tables/hangs',
      },
      {
        title: 'QUẢN LÝ PHIẾU NHẬP',
        link: '/app/pages/tables/phieunhaps',
      },
      {
        title: 'QUẢN LÝ HÀNG BÁN',
        link: '/app/pages/tables/phieuxuats',
      },
      {
        title: 'QUẢN LÝ NHÂN VIÊN',
        link: '/app/pages/tables/nhanviens',
      },
    ],
  },
  {
    title: 'THỐNG KÊ',
    icon: 'nb-tables',
    children: [
      {
        title: 'THỐNG KÊ BÁN HÀNG',
        link: '/app/pages/charts/thongkebanhang',
      },
      {
        title: 'THỐNG KÊ HÀNG TRONG KHO',
        link: '/app/pages/charts/thongkehangtrongkho',
      },
    ],
  },
  {
    title: 'HỆ THỐNG',
    icon: 'nb-tables',
    children: [
      {
        title: 'QUẢN LÝ TÀI KHOẢN',
        link: '/app/pages/tables/smart-table',
      },
      {
        title: 'THIẾT LẬP',
        link: '/app/pages/tables/smart-table',
      },
      {
        title: 'HƯỚNG DẪN',
        link: '/app/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'nb-keypad',
    link: '/app/pages/ui-features',
    children: [
      {
        title: 'Buttons',
        link: '/app/pages/ui-features/buttons',
      },
      {
        title: 'Grid',
        link: '/app/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/app/pages/ui-features/icons',
      },
      {
        title: 'Modals',
        link: '/app/pages/ui-features/modals',
      },
      {
        title: 'Typography',
        link: '/app/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/app/pages/ui-features/search-fields',
      },
      {
        title: 'Tabs',
        link: '/app/pages/ui-features/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'nb-compose',
    children: [
      {
        title: 'Form Inputs',
        link: '/app/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/app/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'Components',
    icon: 'nb-gear',
    children: [
      {
        title: 'Tree',
        link: '/app/pages/components/tree',
      }, {
        title: 'Notifications',
        link: '/app/pages/components/notifications',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    children: [
      {
        title: 'Google Maps',
        link: '/app/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/app/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/app/pages/maps/bubble',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/app/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/app/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/app/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/app/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/app/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/app/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/app/auth/login',
      },
      {
        title: 'Register',
        link: '/app/auth/register',
      },
      {
        title: 'Request Password',
        link: '/app/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/app/auth/reset-password',
      },
    ],
  },
];
