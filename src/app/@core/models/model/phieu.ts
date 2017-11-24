export class PhieuXuat {
    _id: string;
    Sophieuxuat: number;
    Ngayxuat: Date;
    NgayxuatFormat: string;
    MaNV: string;
    Nhanvien: string;
    LoaiKH: string;
    Khachhang: string;
    Maban: string;
    Ban: string;
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
    NgaynhapFormat: string;
    MaNV: string;
    Nhanvien: string;
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

export class Detail {
  phieunhap: PhieuNhap;
  phieuNhapCtiets: PhieuNhapCtiet[];
}
  