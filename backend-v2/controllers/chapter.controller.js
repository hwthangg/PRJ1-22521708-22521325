
const ChapterController = () =>{
  const getChapterById = async(req, res)=>{
    try {
      const {chapterId} = req.cookies.chapterId
      console.log(chapterId)
    } catch (error) {
        console.error("❌ Lỗi khi tạo tài khoản:", error);
            return response(res, 500, "Đã xảy ra lỗi máy chủ", error.message);
    }
  }

  return {getChapterById}
}

export default ChapterController()