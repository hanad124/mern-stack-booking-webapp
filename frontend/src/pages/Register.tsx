import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { FiLoader } from "react-icons/fi";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type registerFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToastr } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToastr("Account created successfully", "SUCCESS");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      console.error(error.message);
      showToastr(error.message, "ERROR");
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h1 className="text-3xl font-bold">Create An account</h1>
        <div className="flex flex-col md:flex-row gap-5">
          <label
            htmlFor="firstName"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            First Name
            <input
              type="text"
              className={`border focus:outline-blue-600 rounded w-full py-1 px-2 font-normal ${
                errors.firstName ? "border-red-500 focus:outline-red-500" : ""
              }`}
              {...register("firstName", {
                required: "this field is required",
              })}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm font-normal">
                {errors.firstName.message}
              </span>
            )}
          </label>
          <label
            htmlFor="lastName"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            Last Name
            <input
              type="text"
              className={`border focus:outline-blue-600 rounded w-full py-1 px-2 font-normal ${
                errors.lastName ? "border-red-500 focus:outline-red-500" : ""
              }`}
              {...register("lastName", {
                required: "this field is required",
              })}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm font-normal">
                {errors.lastName.message}
              </span>
            )}
          </label>
        </div>
        <label
          htmlFor="email"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Email
          <input
            type="email"
            className={`border focus:outline-blue-600  rounded w-full py-1 px-2 font-normal ${
              errors.email ? "border-red-500 focus:outline-red-500" : ""
            }`}
            {...register("email", {
              required: "this field is required",
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-normal">
              {errors.email.message}
            </span>
          )}
        </label>
        <label
          htmlFor="password"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Password
          <input
            type="password"
            className={`border rounded focus:outline-blue-600 w-full py-1 px-2 font-normal ${
              errors.password ? "border-red-500 focus:outline-red-500" : ""
            }`}
            {...register("password", {
              required: "this field is required",
              minLength: { value: 6, message: "Minimum length should be 6 " },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-normal">
              {errors.password.message}
            </span>
          )}
        </label>
        <label
          htmlFor="confirmPassword"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Confirm Password
          <input
            type="password"
            className={`border rounded focus:outline-blue-600 w-full py-1 px-2 font-normal ${
              errors.confirmPassword
                ? "border-red-500 focus:outline-red-500"
                : ""
            }`}
            {...register("confirmPassword", {
              validate: (value) => {
                if (value === "") return "this field is required";
                if (value === watch("password")) return true;
                return "passwords do not match";
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm font-normal">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            mutation.isLoading ? "cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          <span>Register</span>
          {mutation.isLoading && (
            <FiLoader className="animate-spin inline ml-4" />
          )}
        </button>
      </form>
      <button
        className="mt-4 text-slate-600"
        onClick={() => navigate("/sign-in")}
      >
        Already have an account? Sign In
      </button>
    </>
  );
};

export default Register;
