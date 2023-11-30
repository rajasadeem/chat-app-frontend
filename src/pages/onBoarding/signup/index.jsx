import InputField from "../../../components/InputField";
import Button from "../../../components/button";
import useSignUp from "./helper";

const SignUpPage = () => {
  const {
    onChangeHandler,
    onSubmit,
    loading,
    errors,
    disbledValidation,
    signupData,
    navigateToLogin,
  } = useSignUp();

  return (
    <div
      className={`w-full bg-slate-100 flex justify-center items-center h-screen bg-cover`}
    >
      <div className="bg-white w-[27rem] h-[32rem] px-20 rounded-2xl flex justify-center items-center  shadow-2xl">
        <div className=" w-[25rem] h-[27rem] flex flex-col  ">
          <div className="flex justify-center items-center flex-col">
            <h1 className="font-bold text-xl text-black">Register</h1>
            <p className="text-xs text-slate-600">Getting started is easy</p>
          </div>
          <div className="mt-10">
            <InputField
              name={"name"}
              label={"Name:"}
              placeholder={"John"}
              type={"text"}
              className={"mb-2"}
              value={signupData.name}
              onChange={onChangeHandler}
              error={errors.name}
            />
            <InputField
              name={"email"}
              label={"Email:"}
              placeholder={"john@gmail.com"}
              type={"email"}
              className={"mb-2"}
              value={signupData.email}
              onChange={onChangeHandler}
              error={errors.email}
            />
            <InputField
              name={"password"}
              label={"Password:"}
              type={"password"}
              placeholder={"******"}
              value={signupData.password}
              onChange={onChangeHandler}
              error={errors.password}
            />
          </div>
          <div className="bg-white flex justify-center  mt-14">
            <Button
              disabled={disbledValidation}
              loading={loading}
              onClick={onSubmit}
            >
              Register
            </Button>
          </div>
          <div className="text-xs text-slate-600 mt-5 flex justify-center">
            <p>Already have an account?</p>
            <p
              className="underline text-blue-800 ml-1 cursor-pointer"
              onClick={navigateToLogin}
            >
              LOGIN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
