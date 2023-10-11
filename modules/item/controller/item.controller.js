import { StatusCodes } from "http-status-codes";
import Item from "../model/item.model.js";

export const createItem = async (req, res) => {
  try {
    const { description, price, category, allergy } = req.body;
    const newItem = new Item({
      description,
      picture: req.file.path,
      price,
      category,
      allergy,
    });

    await newItem.save();

    // updating the Feed with the latest items  created :
    const all = await Item.count();
    const limit = 10;
    const totalPages = Math.ceil(all / limit);
    const skip = (totalPages - 1) * limit;
    const items = await Item.find({}).skip(skip).limit(limit);

    res.status(StatusCodes.OK).json({
      message: "successfull",
      all,
      totalPages,
      limit: 10,
      skip: 0,
      data: items,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error ........ ${e}`,
      e: JSON.stringify(e),
    });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find({})
      .skip(req.pagination.skip)
      .limit(req.pagination.limit);
    const all = await Item.count();
    const totalPages = Math.ceil(all / req.pagination.limit);
    res.status(StatusCodes.OK).json({
      message: "successfull",
      all,
      totalPages,
      limit: req.pagination.limit,
      skip: req.pagination.skip,
      data: items,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error ........ ${e}`,
      e,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await Item.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({
      message: "Item deleteted Successfully",
      data: deleteItem,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error ........ ${e}`,
      e,
    });
  }
};
export const getItem = async (req, res) => {
  try {
    console.log("this is the get Item Function");
    const { id } = req.params;
    const item = await Item.findById(id);
    res.status(StatusCodes.OK).json({
      message: "Successfull",
      data: item,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error ........ ${e}`,
      e,
    });
  }
};
export const editItem = async (req, res) => {
  try {
    const { id, description, price, allergy, category } = req.body;
    const item = await Item.updateOne(
      { _id: id },
      { description, price, picture: req.file.path, allergy, category }
    );

    res.status(StatusCodes.OK).json({
      message: "Successfull",
      data: item,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error ........ ${e}`,
      e,
    });
  }
};
