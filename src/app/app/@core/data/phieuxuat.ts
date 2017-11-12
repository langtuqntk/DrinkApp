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

export class HoaDon {
  phieuxuat: PhieuXuat;
  phieuXuatCtiets: PhieuXuatCtiet[];
}
  