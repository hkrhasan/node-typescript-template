import joi from "joi";

export class AuthValidator {
  public static registerWithEmailAndPassword = joi.object({
    email: joi.string().email().required(),
    firstName: joi.string().required(),
    lastName: joi.string().optional(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmPassword: joi.ref("password"),
  });

  public static loginWithEmailAndPassword = joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
}
