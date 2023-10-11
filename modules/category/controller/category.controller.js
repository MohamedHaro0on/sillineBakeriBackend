import { StatusCodes } from "http-status-codes";
import Category from "../model/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const newCategory = new Category({
      title,
      picture: req.file.path,
    });

    await newCategory.save();

    // updating the Feed with the latest Categories  created :
    const all = await Category.count();
    const limit = 10;
    const totalPages = Math.ceil(all / limit);
    const skip = (totalPages - 1) * limit;
    const categories = await Category.find({}).skip(skip).limit(limit);

    res.status(StatusCodes.OK).json({
      message: "successfull",
      all,
      totalPages,
      limit: 10,
      skip: 0,
      data: categories,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error ........ ${e}`,
      e: JSON.stringify(e),
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
      .skip(req.pagination.skip)
      .limit(req.pagination.limit);

    const all = await Category.count();
    const totalPages = Math.ceil(all / req.pagination.limit);
    res.status(StatusCodes.OK).json({
      message: "successfull",
      all,
      totalPages,
      limit: req.pagination.limit,
      skip: req.pagination.skip,
      data: categories,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error ........ ${e}`,
      e,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({
      message: "Category deleteted Successfully",
      data: deletedCategory,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error ........ ${e}`,
      e,
    });
  }
};
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(StatusCodes.OK).json({
      message: "Successfull",
      data: category,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error ........ ${e}`,
      e,
    });
  }
};

export const editCategory = async (req, res) => {
  try {
    const { title , id} = req.body;

    const updatedCategory = await Category.updateOne(
      { _id: id },
      { title:title , picture: req.file.path}
    );

    res.status(StatusCodes.OK).json({
      message: "Successfull",
      data: updatedCategory,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error ........ ${e}`,
      e,
    });
  }
};
