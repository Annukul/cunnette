import Comment from "../models/commentModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// Add Comment comment/new/add
export const addComment = catchAsyncErrors(async (req, res) => {
  const newComment = new Comment({
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    comment: req.body.comment,
    name: req.body.name,
  });
  const comment = await newComment.save();
  res.status(200).json({ success: true, comment });
});

// Edit Single Comment comment/edit/:id
export const editComment = catchAsyncErrors(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new ErrorHandler("Comment Not Found", 404));
  }
  const editedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  res.status(200).json({ success: true, editedComment });
});

// Delete Single Comment comment/delete/:id
export const deleteComment = catchAsyncErrors(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  await comment.delete();
  res.status(200).json({ success: true, message: "Comment deleted" });
});

// Get Single Comment comment/single/:id
export const getComments = catchAsyncErrors(async (req, res) => {
  const comment = await Comment.find({ post_id: `${req.params.id}` });
  res.status(200).json({ success: true, comment });
});
