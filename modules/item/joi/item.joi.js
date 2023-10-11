import Joi from "joi";

export const createItemSchema = {
  body: Joi.object().required().keys({
    description: Joi.string().required(),
    picture: Joi.string(),
    price: Joi.string().required(),
    allergy: Joi.string().required(),
    category: Joi.string().required(),
  }),
};

export const editItemSchema = {
  body: Joi.object().required().keys({
    description: Joi.string().required(),
    picture: Joi.string(),
    price: Joi.string().required(),
    allergy: Joi.string().required(),
    category: Joi.string().required(),
    id: Joi.string().required(),
  }),
};

export const deleteItemSchema = {
  parms: Joi.object().required().keys({
    id: Joi.string().required(),
  }),
};
