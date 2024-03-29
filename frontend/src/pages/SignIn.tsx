import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { signIn } from "../api-client";
import { FiLoader } from "react-icons/fi";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToastr } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation((formData: SignInFormData) => signIn(formData), {
    onSuccess: () => {
      showToastr("Logged in successfully", "SUCCESS");
      navigate("/");
      window.location.reload();
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
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
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
      <button
        type="submit"
        disabled={mutation.isLoading}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${
          mutation.isLoading ? "cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {mutation.isLoading ? (
          <>
            <span>loggin in</span>
            <FiLoader className="animate-spin inline ml-4" />
          </>
        ) : (
          <span>Login</span>
        )}
      </button>
    </form>
  );
};

export default SignIn;
