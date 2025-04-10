import React from "react";
import HistoricalSiteInfo from "../../components/Society/Society";

const AdminDashboard = () => {
    const site = {
      name: 'Nhà Tù Phú Lợi',
      level: 'Quốc gia',
      images: [
        '/assets/a1.jpg',
        '/assets/a1.jpg',
        '/assets/a1.jpg'
      ],
      description:
      'Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản. Lorem Ipsum có ưu điểm hơn so với đoạn văn bản chỉ gồm nội dung kiểu "Nội dung, nội dung, nội dung" là nó khiến văn bản giống thật hơn, bình thường hơn. Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản. Lorem Ipsum có ưu điểm hơn so với đoạn văn bản chỉ gồm nội dung kiểu. Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản.  Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản.  Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản. '
    };
  
    return (
      <div>
        <HistoricalSiteInfo site={site} />
      </div>
    );
  };
  
  export default AdminDashboard;