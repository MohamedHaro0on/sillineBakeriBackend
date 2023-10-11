import Joi from "joi";

export const loginSchema = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
};

export const registerSchema = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      userName: Joi.string().required().min(2).max(20),
      picture: Joi.string(),
    }),
};



export const updateProfileSchema = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
};
