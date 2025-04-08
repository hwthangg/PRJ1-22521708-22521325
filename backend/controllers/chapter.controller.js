import Chapter from "../models/chapter.model.js";

const ChapterController = () => {
  // Tạo chi đoàn mới
  const createChapter = async (req, res) => {
    try {
      const inputChapter = req.body;
  
      // Kiểm tra địa chỉ đã tồn tại chưa
      const isExistedAddress = await Chapter.findOne({ address: inputChapter.address });
      if (isExistedAddress) {
        return res.status(409).send({
          status: "error",
          message: "Address is already used",
        });
      }
  
      // Tạo và lưu chi đoàn
      const newChapter = await new Chapter(inputChapter).save();
      console.log(newChapter);
  
      res.status(201).send({
        status: "success",
        message: "Creating chapter successfully",
        data: { chapter: newChapter },
      });
    } catch (error) {
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send("Server Error");
    }
  };

  // Lấy danh sách chi đoàn theo bộ lọc
  const getAllChaptersWithFilter = async (req, res) => {
    try {
      const inputFilter = req.query;
      const chapters = await Chapter.find(inputFilter);

      if (chapters.length < 1) {
        res.status(404).send({
          status: "error",
          message: "No chapters found",
        });
        return;
      }

      res.status(200).send({
        status: "success",
        message: "Retrieving chapters successfully",
        data: { chapters },
      });
    } catch (error) {
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  };

  // Lấy chi đoàn theo ID
  const getChapterById = async (req, res) => {
    try {
      const chapterId = req.params.chapterId;
      const chapter = await Chapter.findById(chapterId);

      if (!chapter) {
        res.status(404).send({
          status: "error",
          message: "Chapter not found",
        });
        return;
      }

      res.status(200).send({
        status: "success",
        message: "Retrieving chapter successfully",
        data: { chapter },
      });
    } catch (error) {
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  };

  // Cập nhật chi đoàn theo ID
  const updateChapterById = async (req, res) => {
    try {
      const inputChapterId = req.params.chapterId;
      const inputUpdatingChapter = req.body;
  
      const currentChapter = await Chapter.findById(inputChapterId);
  
      if (!currentChapter) {
        return res.status(404).send({
          status: "error",
          message: "Chapter not found",
        });
      }
  
      const isModifiedAddress = currentChapter.address !== inputUpdatingChapter.address;
  
      if (isModifiedAddress) {
        const isExistedAddress = await Chapter.findOne({ address: inputUpdatingChapter.address });
        if (isExistedAddress) {
          return res.status(409).send({
            status: "error",
            message: "Address is already used",
          });
        }
      }
  
      const updatedChapter = await Chapter.findByIdAndUpdate(
        inputChapterId,
        inputUpdatingChapter,
        { new: true }
      );
  
      res.status(200).send({
        status: "success",
        message: "Updating chapter successfully",
        data: { chapter: updatedChapter },
      });
    } catch (error) {
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error: error,
      });
    }
  };
  

  // Xoá mềm chi đoàn theo ID (đổi status thành "deleted")
  const deleteChapterById = async (req, res) => {
    try {
      const chapterId = req.params.chapterId;

      const deletedChapter = await Chapter.findByIdAndUpdate(
        chapterId,
        { status: "deleted" },
        { new: true }
      );

      if (!deletedChapter) {
        res.status(404).send({
          status: "error",
          message: "Chapter not found",
        });
        return;
      }

      res.status(200).send({
        status: "success",
        message: "Deleting chapter successfully",
        data: { chapter: deletedChapter },
      });
    } catch (error) {
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  };

  return {
    createChapter,
    getAllChaptersWithFilter,
    getChapterById,
    updateChapterById,
    deleteChapterById,
  };
};

export default ChapterController();
