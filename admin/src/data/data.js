export const listPassenger = [
  { value: 1, label: "1 hành khách" },
  { value: 2, label: "2 hành khách" },
  { value: 3, label: "3 hành khách" },
  { value: 4, label: "4 hành khách" },
  { value: 5, label: "5 hành khách" },
  { value: 6, label: "6+ hành khách" },
];

export const listGuest = [
  { value: 1, label: "1 người" },
  { value: 2, label: "2 người" },
  { value: 3, label: "3 người" },
  { value: 4, label: "4 người" },
  { value: 5, label: "5 người" },
  { value: 6, label: "5+ người" },
];

export const listRoom = [
  { value: 1, label: "1 phòng" },
  { value: 2, label: "2 phòng" },
  { value: 3, label: "3 phòng" },
  { value: 4, label: "4 phòng" },
  { value: 5, label: "5 phòng" },
  { value: 6, label: "5+ phòng" },
];

export const listBudget = [
  { value: 1, label: "< 1 triệu" },
  { value: 2, label: "1 - 3 triệu" },
  { value: 3, label: "3 - 5 triệu" },
  { value: 4, label: "5 - 10 triệu" },
  { value: 5, label: "Trên 10 triệu" },
];

export const listStar = [
  { value: 1, label: "1 sao" },
  { value: 2, label: "2 sao" },
  { value: 3, label: "3 sao" },
  { value: 4, label: "4 sao" },
  { value: 5, label: "5 sao" },
];

export const listStatusRoom = [
  { value: 0, label: "Chưa thuê" },
  { value: 1, label: "Đã thuê" },
  { value: 2, label: "Sắp trống" },
];

export const listEstate = [
  { value: 1, label: "Căn hộ" },
  { value: 2, label: "Phòng trọ" },
  { value: 3, label: "Văn phòng" },
  { value: 4, label: "Mặt bằng" },
  { value: 5, label: "Nhà nguyên căn" },
];

export const listAdult = [
  { value: 0, label: "0 người lớn" },

  { value: 1, label: "1 người lớn" },
  { value: 2, label: "2 người lớn" },
  { value: 3, label: "3 người lớn" },
  { value: 4, label: "4 người lớn" },
  { value: 5, label: "5 người lớn" },
  { value: 6, label: "6 người lớn" },
  { value: 7, label: "7 người lớn" },
  { value: 8, label: "8 người lớn" },
  { value: 9, label: "9 người lớn" },
  { value: 10, label: "10 người lớn" },
  { value: 11, label: "10+ người lớn" },
];

export const listChildren = [
  { value: 0, label: "0 trẻ em" },

  { value: 1, label: "1 trẻ em" },
  { value: 2, label: "2 trẻ em" },
  { value: 3, label: "3 trẻ em" },
  { value: 4, label: "4 trẻ em" },
  { value: 5, label: "5 trẻ em" },
  { value: 6, label: "6 trẻ em" },
  { value: 7, label: "7 trẻ em" },
  { value: 8, label: "8 trẻ em" },
  { value: 9, label: "9 trẻ em" },
  { value: 10, label: "10 trẻ em" },
  { value: 11, label: "10+ trẻ em" },
];

export const listInfants = [
  { value: 0, label: "0 em bé" },

  { value: 1, label: "1 em bé" },
  { value: 2, label: "2 em bé" },
  { value: 3, label: "3 em bé" },
  { value: 4, label: "4 em bé" },
  { value: 5, label: "5 em bé" },
  { value: 6, label: "6 em bé" },
  { value: 7, label: "7 em bé" },
  { value: 8, label: "8 em bé" },
  { value: 9, label: "9 em bé" },
  { value: 11, label: "10+ em bé" },
];

export const listPrice = [
  { minBudget: 0, maxBudget: 1000000, value: 1, label: "< 1 triệu" },
  { minBudget: 1000000, maxBudget: 3000000, value: 2, label: "1 - 3 triệu" },
  { minBudget: 3000000, maxBudget: 5000000, value: 3, label: "3 - 5 triệu" },
  { minBudget: 5000000, maxBudget: 10000000, value: 4, label: "5 - 10 triệu" },
  {
    minBudget: 10000000,
    maxBudget: 20000000,
    value: 5,
    label: "Trên 10 triệu",
  },
];

export const listBedRoom = [
  { value: 1, label: "1 phòng ngủ" },
  { value: 2, label: "2 phòng ngủ" },
  { value: 3, label: "3 phòng ngủ" },
  { value: 4, label: "4 phòng ngủ" },
  { value: 5, label: "5 phòng ngủ" },
  { value: 6, label: "5+ phòng ngủ" },
  { value: 7, label: "Nhà nguyên căn" },
  { value: 8, label: "Phòng trọ" },
  { value: 9, label: "Chung cư cao cấp" },
  { value: 10, label: "Penhouse" },
  { value: 11, label: "Studio" },
  { value: 12, label: "Deluxe" },
  { value: 13, label: "Suite Double" },
  { value: 14, label: "Classic Double" },
  { value: 15, label: "Premier Deluxe" },
  { value: 16, label: "Ocean Penthouse" },
  { value: 17, label: "Grand Suites" },
  { value: 18, label: "Superior" },
];


export const listSquare = [
    { value: 1, label: "< 20", unit: "meter" },
    { value: 2, label: "20 - 40", unit: "meter" },
    { value: 3, label: "> 40", unit: "meter" },
  ];