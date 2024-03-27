import { useForm } from "react-hook-form";
import { Mutation, useMutation } from "react-query";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

export type registerFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    mutation.mutate(data);

    setLoading(false);
  });

  return (
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
      <label htmlFor="email" className="text-gray-700 text-sm font-bold flex-1">
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
            errors.confirmPassword ? "border-red-500 focus:outline-red-500" : ""
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
        disabled={loading}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${
          loading ? "cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        <span>Register</span>
        {loading && <FiLoader className="animate-spin inline ml-4" />}
      </button>
    </form>
  );
};

export default Register;
