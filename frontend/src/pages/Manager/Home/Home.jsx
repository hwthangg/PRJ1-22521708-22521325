import React, { useEffect, useContext } from "react";
import Society from "../../../components/Society/Society";
import a1 from "../../../assets/a1.jpg";
import a2 from "../../../assets/a2.jpg";
import a3 from "../../../assets/a3.jpg";
import { AuthContext } from "../../../../context/AuthContext";
import socket from "../../../socket";

const Home = () => {
  const {role, isLogged} = useContext(AuthContext)
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

  useEffect(()=>{
    console.log(`${role}`)
    socket.emit('access', true)
  },[])

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

export default Home;
