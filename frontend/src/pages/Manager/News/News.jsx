import React from "react";
import Society from "../../../components/Society/Society.jsx"
import a1 from "../../../assets/a1.jpg";
import a2 from "../../../assets/a2.jpg";
import a3 from "../../../assets/a3.jpg";

const News = () => {
  const sites = [
    {
      name: "",
      images: [a1, a2, a3],
      description:
        "Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản..."
    },
    {
      name: "",
      images: [a2, a1, a3],
      description:
        "Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản..."
    },
    {
      name: "",
      images: [a3, a2, a1],
      description:
        "Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa dễ gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản..."
    }
  ];

  return (
    <div>
      {sites.map((site, index) => (
        <div key={index} style={{ marginBottom: "40px" }}>
          <Society site={site} />
        </div>
      ))}
    </div>
  );
};

export default News;
