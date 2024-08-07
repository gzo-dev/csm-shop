

// Middleware để chuyển đổi WebP sang JPEG
const checkFileExist = async (req, res, next) => {
  try {
    // console.log(req.body.productId)
    // console.log(req.files, req.body)
    if (req.files?.length <= 0) {
      return res.status(200).json({ success: true, data: [], ok: true })
    }
    next()
  } catch (error) {
    console.error('Error in converting image:', error);
    res.status(500).send('Error in converting image');
  }
};

export default checkFileExist