import useLogin from "./helper";
import Button from "../../../components/button";
import InputField from "../../../components/InputField";

const LoginPage = () => {
  const {
    loginData,
    loading,
    onChangeHandler,
    onSubmit,
    errors,
    disbledValidation,
    navigateToSignUp,
  } = useLogin();

  return (
    <div
      className={`w-full bg-slate-100 flex justify-center items-center h-screen bg-cover`}
    >
      <div className="bg-white w-[27rem] h-[27rem] px-20 rounded-2xl flex justify-center items-center  shadow-2xl">
        <div className=" w-[25rem] h-[24rem] flex flex-col">
          <div className="my-4 flex justify-center items-center flex-col bg-white">
            <h1 className="font-bold text-xl text-black">Welcome Back</h1>
            <p className="text-xs text-slate-600">Login in to your account</p>
          </div>
          <div className="mt-8">
            <InputField
              name={"email"}
              label={"Email:"}
              placeholder={"john@gmail.com"}
              type={"email"}
              className={"mb-4"}
              value={loginData.email}
              onChange={onChangeHandler}
              error={errors.email}
            />
            <InputField
              name={"password"}
              label={"Password:"}
              type={"password"}
              placeholder={"******"}
              value={loginData.password}
              onChange={onChangeHandler}
              error={errors.password}
            />
          </div>
          <div className="bg-white flex justify-center  mt-10">
            <Button
              loading={loading}
              disabled={disbledValidation}
              onClick={onSubmit}
            >
              Continue
            </Button>
          </div>
          <div className="text-xs text-slate-600 mt-8 flex justify-center">
            <p>Don't have an account?</p>
            <p
              className="underline text-blue-800 ml-1 cursor-pointer"
              onClick={navigateToSignUp}
            >
              SIGNUP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
