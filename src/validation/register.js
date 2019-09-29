import Joi from '@hapi/joi';

const validateInput = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required()
  });
  return schema.validate(data);
};

export default validateInput;
