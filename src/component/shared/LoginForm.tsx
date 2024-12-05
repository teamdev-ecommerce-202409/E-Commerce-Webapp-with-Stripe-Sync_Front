import "../../style/LoginForm.css";
import useLogin from "../../hook/useLogin";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { AddressType } from "@e-commerce/lib/type/AddressUserInfoType";

type Props = {
  // signUpFlag: boolean;
  handleClose: () => void;
};
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  address: AddressType,
  shipping: AddressType
};
const LoginForm = ({ handleClose }: Props) => {
  const { login, signUp, loading, errorMsg } = useLogin();
  const [signUpFlag, setSignUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const password = watch("password"); // パスワードの値を監視

  const onSubmit = async (data: FormData) => {
    if (signUpFlag) {
      await signUp(data.name, data.email, data.password, data.confirmPassword,
        data.address, data.shipping);
      handleClose();
    } else {
      await login(data.email, data.password);
    }
  };

  return (
    <>
      <div className="loginForm_container">
        <span className="loginForm__close">
          <IconButton onClick={handleClose} aria-label="delete">
            <CloseIcon />
          </IconButton>
        </span>

        <div className="loginForm_title_container">
          {signUpFlag ? <h1>アカウント作成</h1> : <h1>ログイン</h1>}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="loginForm_input_container"
        >
          {signUpFlag ? (
            <>
              {errorMsg && (
                <p className="errMsg loginForm_errMsg">{errorMsg}</p>
              )}
              <div className="loginForm_input-group">
                <input
                  id="email"
                  type="email"
                  placeholder="email"
                  {...register("email", {
                    required: "Email is required",
                    maxLength: {
                      value: 255,
                      message: "Email must be less than 255 characters long",
                    },
                  })}
                />
                {errors.email && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="name"
                  type="text"
                  placeholder="name"
                  {...register("name", {
                    required: "Username is required",
                    maxLength: {
                      value: 25,
                      message: "username must be less than 25 characters long",
                    },
                  })}
                />
                {errors.name && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 30,
                      message: "Password must be less than 30 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="confirmPassword"
                  {...register("confirmPassword", {
                    required: "confirmPassword is required",
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div>請求先住所</div>
              <div className="loginForm_input-group">
                <input
                  id="address_postal_code"
                  type="text"
                  placeholder="postal-code (XXX-XXXX)"
                  {...register("address.postal_code", {
                    required: "Postal-code is required",
                    maxLength: {
                      value: 8,
                      message: "Postal-code must be less than 7 characters long",
                    },
                  })}
                />
                {errors.address?.postal_code && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.address.postal_code.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="address_state"
                  type="text"
                  placeholder="state"
                  {...register("address.state", {
                    required: "State is required",
                    maxLength: {
                      value: 255,
                      message: "State must be less than 255 characters long",
                    },
                  })}
                />
                {errors.address?.state && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.address.state.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="address_city"
                  type="text"
                  placeholder="city"
                  {...register("address.city", {
                    required: "City is required",
                    maxLength: {
                      value: 255,
                      message: "City must be less than 255 characters long",
                    },
                  })}
                />
                {errors.address?.city && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.address.city.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="address_line1"
                  type="text"
                  placeholder="line-1"
                  {...register("address.line1", {
                    required: "Line-1 is required",
                    maxLength: {
                      value: 255,
                      message: "Line-1 must be less than 255 characters long",
                    },
                  })}
                />
                {errors.address?.line1 && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.address.line1.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="address_line2"
                  type="text"
                  placeholder="line-2"
                  {...register("address.line2", {
                    required: "Line-2 is required",
                    maxLength: {
                      value: 255,
                      message: "Line-2 must be less than 255 characters long",
                    },
                  })}
                />
                {errors.address?.line2 && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.address.line2.message}
                  </p>
                )}
              </div>
              <div>配送先住所</div>
              <div className="loginForm_input-group">
                <input
                  id="shipping_postal_code"
                  type="text"
                  placeholder="postal-code (XXX-XXXX)"
                  {...register("shipping.postal_code", {
                    required: "Postal-code is required",
                    maxLength: {
                      value: 8,
                      message: "Postal-code must be less than 7 characters long",
                    },
                  })}
                />
                {errors.shipping?.postal_code && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.shipping.postal_code.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="shipping_state"
                  type="text"
                  placeholder="state"
                  {...register("shipping.state", {
                    required: "State is required",
                    maxLength: {
                      value: 255,
                      message: "State must be less than 255 characters long",
                    },
                  })}
                />
                {errors.shipping?.state && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.shipping.state.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="shipping_city"
                  type="text"
                  placeholder="city"
                  {...register("shipping.city", {
                    required: "City is required",
                    maxLength: {
                      value: 255,
                      message: "City must be less than 255 characters long",
                    },
                  })}
                />
                {errors.shipping?.city && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.shipping.city.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="shipping_line1"
                  type="text"
                  placeholder="line-1"
                  {...register("shipping.line1", {
                    required: "Line-1 is required",
                    maxLength: {
                      value: 255,
                      message: "Line-1 must be less than 255 characters long",
                    },
                  })}
                />
                {errors.shipping?.line1 && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.shipping.line1.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="shipping_line2"
                  type="text"
                  placeholder="line-2"
                  {...register("shipping.line2", {
                    required: "Line-2 is required",
                    maxLength: {
                      value: 255,
                      message: "Line-2 must be less than 255 characters long",
                    },
                  })}
                />
                {errors.shipping?.line2 && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.shipping.line2.message}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {errorMsg && (
                <p className="errMsg loginForm_errMsg">{errorMsg}</p>
              )}
              <div className="loginForm_input-group">
                <input
                  id="email"
                  type="email"
                  placeholder="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="loginForm_input-group">
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="errMsg loginForm_errMsg">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="loginForm_loginButton_container">
            <PrimaryButton
              loading={loading}
              text={signUpFlag ? "Sign Up" : "Log in"}
              onClick={handleSubmit(onSubmit)}
            />
            <Button variant="text" onClick={() => setSignUp(!signUpFlag)}>
              {signUpFlag ? "ログインする" : "アカウント作成する"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
