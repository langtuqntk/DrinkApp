export class PhieuXuat {
    _id: string;
    Sophieuxuat: number;
    Ngayxuat: Date;
    MaNV: string;
    LoaiKH: string;
    Maban: string;
    TienTra: number;
    TienDu: number;
    Thanhtoan: number;
  }
  
export class PhieuXuatCtiet {
    _id: string;
    Sophieuxuat: string;
    Mahang: string;
    Soluong: number;
    Dongia: number;
    Tralai: boolean;
  }

export class PhieuNhap {
    _id: string;
    Sophieunhap: number;
    Ngaynhap: Date;
    MaNV: string;;
    Ghichu: string;
}
  
export class PhieuNhapCtiet {
    _id: string;
    Sophieunhap: string;
    Mahang: string;
    Soluong: number;
    Gianhap: number;
}

export class HoaDon {
  phieuxuat: PhieuXuat;
  phieuXuatCtiets: PhieuXuatCtiet[];
}
  