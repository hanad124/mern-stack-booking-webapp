import { useMutation, useQueryClient } from "react-query";
import { signOut } from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const { showToastr } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(signOut, {
    onSuccess: async () => {
      showToastr("Signed out successfully", "SUCCESS");
      await queryClient.invalidateQueries("validateToken");
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      console.error(error.message);
      showToastr(error.message, "ERROR");
    },
  });
  return (
    <div>
      <button
        className="rounded px-4 py-1 text-blue-600 bg-white font-medium hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out hover:ring-[2px] hover:ring-white "
        onClick={() => mutation.mutate()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
