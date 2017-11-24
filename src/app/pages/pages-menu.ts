import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'TRANG CHỦ',
    icon: 'nb-home',
    link: '/',
    home: true,
  },
  {
    title: 'BÁN HÀNG',
    link: '/banhang',
    home: true,
  },
  {
    title: 'NHẬP HÀNG',
    link: '/nhaphang',
    home: true,
  },
  {
    title: 'CẬP NHẬT GIÁ BÁN',
    link: '/capnhatgia',
    home: true,
  },
  {
    title: 'QUẢN LÝ DANH MỤC',
    icon: 'nb-tables',
    children: [
      {
        title: 'QUẢN LÝ BÀN',
        link: '/danhmuc/bans',
      },
      {
        title: 'QUẢN LÝ KHÁCH',
        link: '/danhmuc/khachhangs',
      },
      {
        title: 'QUẢN LÝ HÀNG',
        link: '/danhmuc/hangs',
      },
      {
        title: 'QUẢN LÝ PHIẾU NHẬP',
        link: '/danhmuc/phieunhaps',
      },
      {
        title: 'QUẢN LÝ HÀNG BÁN',
        link: '/danhmuc/phieuxuats',
      },
      {
        title: 'QUẢN LÝ NHÂN VIÊN',
        link: '/danhmuc/nhanviens',
      },
    ],
  },
  {
    title: 'THỐNG KÊ',
    icon: 'nb-tables',
    children: [
      {
        title: 'THỐNG KÊ BÁN HÀNG',
        link: '/thongke/thongkebanhang',
      },
      {
        title: 'THỐNG KÊ HÀNG TRONG KHO',
        link: '/thongke/thongkehangtrongkho',
      },
    ],
  },
  {
    title: 'HỆ THỐNG',
    icon: 'nb-tables',
    children: [
      {
        title: 'QUẢN LÝ TÀI KHOẢN',
        link: '/hethong/taikhoan',
      },
      {
        title: 'THIẾT LẬP',
        link: '/hethong/thietlap',
      },
      {
        title: 'HƯỚNG DẪN',
        link: '/hethong/huongdan',
      },
    ],
  },
];
