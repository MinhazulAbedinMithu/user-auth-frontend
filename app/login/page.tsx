"use client";
import axiosApi from "@/axiosApi";
import { useLoginMutation, useMeQuery } from "@/store/api/authApi";
import { setError, setLoading, setUser } from "@/store/authSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axiosApi.post("/auth/login", { email, password });
      const { token, user } = response.data?.data;

      localStorage.setItem("token", token);

      dispatch(setUser(user));
    } catch (error: any) {
      dispatch(setError(error?.response.data.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect((): any => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="text-black">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-lg text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border rounded-lg text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </form>
      <h5 className="text-end">
        <Link href="/register">Register</Link>
      </h5>
      {error && (
        <div className="text-red-500 mt-4">{error || "An error occurred"}</div>
      )}
    </div>
  );
};

export default Login;
