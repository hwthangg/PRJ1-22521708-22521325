import Account from "../../models/account.model.js";
import Chapter from "../../models/chapter.model.js";
import Member from "../../models/member.model.js";
import Event from "../../models/event.model.js";

async function scriptDB() {
  try {
    const accountCount = await Account.countDocuments();
    if (accountCount > 0) return console.log("Database already has data");

    // 1. Tạo 3 tài khoản leader
    const leaderAccounts = await Account.insertMany([
      {
        email: 'tran.minhquan@cdtn.vn',
        phone: '0901123123',
        fullname: 'Trần Minh Quân',
        birthday: '1992-05-10',
        gender: 'male',
        password: '12345678',
        role: 'leader',
        status: 'activated',
        chapterId: null
      },
      {
        email: 'le.hoailinh@cdtn.vn',
        phone: '0901456789',
        fullname: 'Lê Hoài Linh',
        birthday: '1990-11-22',
        gender: 'female',
        password: '12345678',
        role: 'leader',
        status: 'activated',
        chapterId: null
      },
      {
        email: 'nguyen.haianh@cdtn.vn',
        phone: '0901789456',
        fullname: 'Nguyễn Hải Anh',
        birthday: '1994-03-18',
        gender: 'male',
        password: '12345678',
        role: 'leader',
        status: 'activated',
        chapterId: null
      }
    ]);

    // 2. Tạo 3 chi đoàn tương ứng
    const chapters = await Chapter.insertMany([
      {
        name: "Chi đoàn Khoa Công nghệ Thông tin",
        address: "Đại học CNTT, Quận Thủ Đức",
        affiliated: "Đoàn Trường Đại học CNTT",
        establishedDate: new Date("2010-09-01")
      },
      {
        name: "Chi đoàn Khoa Kinh tế",
        address: "Đại học Kinh tế, Quận 3",
        affiliated: "Đoàn Trường Đại học Kinh tế",
        establishedDate: new Date("2009-08-15")
      },
      {
        name: "Chi đoàn Khoa Ngoại ngữ",
        address: "Đại học KHXH&NV, Quận 1",
        affiliated: "Đoàn Trường KHXH&NV",
        establishedDate: new Date("2011-01-10")
      }
    ]);

    // Cập nhật chapterId cho các leader
    for (let i = 0; i < leaderAccounts.length; i++) {
      leaderAccounts[i].chapterId = chapters[i]._id;
      await leaderAccounts[i].save();
    }

    // 3. Tạo mỗi chi đoàn 3 đoàn viên (1 bí thư)
    const memberData = [];

    for (let i = 0; i < chapters.length; i++) {
      memberData.push(
        {
          chapterId: chapters[i]._id,
          cardId: `CD${i}01`,
          fullname: `Nguyễn Văn A${i + 1}`,
          birthday: new Date("2002-03-15"),
          gender: 'male',
          hometown: "TP.HCM",
          address: "123 Lê Lợi",
          ethnicity: "Kinh",
          eduLevel: "Đại học",
          religion: "Không",
          joinedDate: new Date("2020-09-01"),
          email: `a${i + 1}@example.com`,
          phone: `090000000${i + 1}`,
          position: "secretary"
        },
        {
          chapterId: chapters[i]._id,
          cardId: `CD${i}02`,
          fullname: `Trần Thị B${i + 1}`,
          birthday: new Date("2001-07-21"),
          gender: 'female',
          hometown: "Long An",
          address: "456 Trần Hưng Đạo",
          ethnicity: "Kinh",
          eduLevel: "Cao đẳng",
          religion: "Không",
          joinedDate: new Date("2020-10-15"),
          email: `b${i + 1}@example.com`,
          phone: `091100000${i + 1}`,
          position: "member"
        },
        {
          chapterId: chapters[i]._id,
          cardId: `CD${i}03`,
          fullname: `Lê Minh C${i + 1}`,
          birthday: new Date("2000-12-05"),
          gender: 'male',
          hometown: "Đồng Nai",
          address: "789 Nguyễn Huệ",
          ethnicity: "Kinh",
          eduLevel: "Trung cấp",
          religion: "Không",
          joinedDate: new Date("2019-08-30"),
          email: `c${i + 1}@example.com`,
          phone: `092200000${i + 1}`,
          position: "member"
        }
      );
    }

    await Member.insertMany(memberData);

    // 4. Tạo mỗi chi đoàn 3 sự kiện
    const eventData = [];

    for (let i = 0; i < chapters.length; i++) {
      eventData.push(
        {
          chapterId: chapters[i]._id,
          title: "Ngày hội Thanh niên khỏe",
          description: "Tổ chức các hoạt động thể thao và rèn luyện sức khỏe cho đoàn viên",
          tag: ["thể thao", "ngoại khóa"],
          location: "Sân vận động Đại học",
          startTime: new Date("2025-06-01T08:00:00"),
        },
        {
          chapterId: chapters[i]._id,
          title: "Tình nguyện mùa hè xanh",
          description: "Chương trình tình nguyện giúp đỡ cộng đồng tại vùng sâu vùng xa",
          tag: ["tình nguyện", "mùa hè"],
          location: "Tây Ninh",
          startTime: new Date("2025-07-15T07:30:00"),
        },
        {
          chapterId: chapters[i]._id,
          title: "Hội thảo khởi nghiệp trẻ",
          description: "Tạo cơ hội cho đoàn viên học hỏi và phát triển ý tưởng khởi nghiệp",
          tag: ["khởi nghiệp", "hội thảo"],
          location: "Hội trường A",
          startTime: new Date("2025-08-10T09:00:00"),
        }
      );
    }

    await Event.insertMany(eventData);

    console.log("✅ Đã seed xong 3 account, 3 chi đoàn, 9 đoàn viên và 9 sự kiện.");
  } catch (err) {
    console.error("❌ Lỗi khi seed dữ liệu:", err);
  }
}

export default scriptDB;
