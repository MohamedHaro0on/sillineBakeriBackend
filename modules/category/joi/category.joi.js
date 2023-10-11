import Joi from "joi";

export const createCategorySchema = {
  body: Joi.object().required().keys({
    title: Joi.string().required(),
    image: Joi.string(),
  }),
};

export const editCategorySchema = {
  body: Joi.object().required().keys({
    id: Joi.string().required(),
    image: Joi.string(),
  }),
};

export const deleteCategory = {
  parms: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};
export const getCategorySchema = {
  parms: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};
