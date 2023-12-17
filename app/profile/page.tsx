"use client";
import axiosApi from "@/axiosApi";
import { useLogoutMutation, useMeQuery } from "@/store/api/authApi";
import { setError, setLoading, setUser } from "@/store/authSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    const authToken = localStorage.getItem("token");

    if (!authToken && !user) {
      router.push("/login");
    }
    const response = await axiosApi.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    dispatch(setUser(null));
    localStorage.removeItem("token");
    response && router.push("/login");
  };
  const fetchUserProfile = async () => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        router.push("/login");
      }
      const response = await axiosApi("/auth/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      router.push("/login");
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      dispatch(setLoading(true));

      try {
        if (!user) {
          const userData = await fetchUserProfile();
          console.log({ userData });

          dispatch(setUser(userData));
        }
      } catch (error: any) {
        dispatch(setError(error.message));
        router.push("/login");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
