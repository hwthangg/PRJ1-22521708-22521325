import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {  Account, Chapter, Member } from '../models/index.js'; // Giả sử bạn đã export các schema từ file models.js

async function seedData() {
  try {
    // Kết nối MongoDB (thay đổi connection string cho phù hợp)
    await mongoose.connect('mongodb://localhost:27017/Union', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });



    // Xóa dữ liệu hiện có
    await Account.deleteMany({});
    await Chapter.deleteMany({});
    await Member.deleteMany({});

    console.log('Đã xóa dữ liệu cũ');

    // Hash mật khẩu cho tất cả tài khoản
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Tạo 4 chi đoàn
    const chapters = await Chapter.insertMany([
      {
        name: 'Chi đoàn 1',
        affiliated: 'Đoàn trường Đại học X',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        establishedAt: new Date('2010-01-15'),
      },
      {
        name: 'Chi đoàn 2',
        affiliated: 'Đoàn trường Đại học X',
        address: '456 Đường XYZ, Quận 2, TP.HCM',
        establishedAt: new Date('2012-05-20'),
      },
      {
        name: 'Chi đoàn 3',
        affiliated: 'Đoàn trường Đại học Y',
        address: '789 Đường DEF, Quận 3, TP.HCM',
        establishedAt: new Date('2015-03-10'),
      },
      {
        name: 'Chi đoàn 4',
        affiliated: 'Đoàn trường Đại học Z',
        address: '101 Đường GHI, Quận 4, TP.HCM',
        establishedAt: new Date('2018-11-25'),
      },
    ]);

    console.log('Đã tạo 4 chi đoàn');

    // Tạo 1 tài khoản admin
    const adminAccount = await Account.create({
      status: 'active',
      email: 'admin@example.com',
      phone: '0987654321',
      password: hashedPassword,
      fullname: 'Nguyễn Văn Admin',
      birthday: new Date('1985-01-01'),
      gender: 'Nam',
      role: 'admin',
    });

    console.log('Đã tạo tài khoản admin');

    // Tạo 5 tài khoản quản lý (mỗi người quản lý một chi đoàn, một chi đoàn không có quản lý)
    const managerAccounts = [];
    for (let i = 0; i < 5; i++) {
      // Chỉ gán managerOf cho 4 quản lý đầu (chúng ta có 4 chi đoàn)
      const managerOf = i < 4 ? chapters[i]._id : null;
      
      const manager = await Account.create({
        status: 'active',
        email: `manager${i+1}@example.com`,
        phone: `09876543${20 + i}`,
        password: hashedPassword,
        fullname: `Trần Thị Quản Lý ${i+1}`,
        birthday: new Date(`199${i}-0${i+1}-0${i+1}`),
        gender: i % 2 === 0 ? 'Nam' : 'Nữ',
        role: 'manager',
        managerOf: managerOf,
      });
      managerAccounts.push(manager);
    }

    console.log('Đã tạo 5 tài khoản quản lý');

    // Tạo 14 tài khoản đoàn viên và thông tin đoàn viên
    const memberAccounts = [];
    const memberInfos = [];
    
    for (let i = 0; i < 14; i++) {
      // Phân bổ vào các chi đoàn theo vòng tròn
      const chapterIndex = i % chapters.length;
      const chapterId = chapters[chapterIndex]._id;
      
      // Tạo thông tin đoàn viên trước
      const memberInfo = await Member.create({
        status: 'active',
        chapterId: chapterId,
        position: i < 3 ? 'Bí thư' : (i < 6 ? 'Phó Bí thư' : (i < 9 ? 'Ủy viên BCH' : 'Đoàn viên')),
        cardId: `MEM${1000 + i}`,
        joinedAt: new Date(`202${i % 3}-0${(i % 12) + 1}-${(i % 28) + 1}`),
        address: `${i+1} Đường số ${i+1}, Quận ${(i % 9) + 1}, TP.HCM`,
        hometown: `Tỉnh ${String.fromCharCode(65 + (i % 26))}`,
        ethnicity: i % 3 === 0 ? 'Kinh' : (i % 3 === 1 ? 'Tày' : 'Hoa'),
        religion: i % 4 === 0 ? 'Không' : (i % 4 === 1 ? 'Phật giáo' : (i % 4 === 2 ? 'Thiên chúa' : 'Cao đài')),
        eduLevel: i % 5 === 0 ? 'Đại học' : (i % 5 === 1 ? 'Cao đẳng' : (i % 5 === 2 ? 'Trung cấp' : (i % 5 === 3 ? 'THPT' : 'THCS'))),
      });
      memberInfos.push(memberInfo);

      // Sau đó tạo tài khoản với tham chiếu đến thông tin đoàn viên
      const member = await Account.create({
        status: 'active',
        email: `member${i+1}@example.com`,
        phone: `09876543${30 + i}`,
        password: hashedPassword,
        fullname: `Lê Văn Đoàn Viên ${i+1}`,
        birthday: new Date(`199${(i % 10) + 1}-0${(i % 12) + 1}-${(i % 28) + 1}`),
        gender: i % 2 === 0 ? 'Nam' : 'Nữ',
        role: 'member',
        infoMember: memberInfo._id,
      });
      memberAccounts.push(member);
    }

    console.log('Đã tạo 14 tài khoản đoàn viên với thông tin đoàn viên');

    console.log('Hoàn tất seed dữ liệu!');
    console.log(`Đã tạo: 
    - 1 tài khoản admin
    - 5 tài khoản quản lý
    - 14 tài khoản đoàn viên với thông tin đoàn viên
    - 4 chi đoàn`);

    // Đóng kết nối
    await mongoose.disconnect();
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error);
    process.exit(1);
  }
}

// Gọi hàm
seedData();