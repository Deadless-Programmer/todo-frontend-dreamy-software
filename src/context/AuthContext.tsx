"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { publicAxios } from "../lib/api/publicAxios";
import { privateAxios } from "../lib/api/privateAxios";

import { setTokens, clearTokens, getAccessToken } from "../utils/token";

import { LOGIN_URL, SIGNUP_URL, ME_URL } from "../lib/constants";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

type User = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
  address?: string;
  contact_number?: string;
  birthday?: string;
 
  bio?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    
  }) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // INITIAL LOAD → CHECK TOKEN
  // ------------------------------
  useEffect(() => {
    const init = async () => {
      const access = getAccessToken();

      if (access) {
        try {
          await refreshUser();
        } catch (err) {
          console.error("Error fetching user on init:", err);
          clearTokens();
          setUser(null); // 🔥 FIX #1 → ensure user resets
        }
      }

      setLoading(false); // 🔥 FIX #2 → render only after user state final
    };

    init();
  }, []);

  // ------------------------------
  // SIGNUP
  // ------------------------------
  const signup = async (payload: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) => {
    const form = new FormData();
    form.append("first_name", payload.first_name);
    form.append("last_name", payload.last_name);
    form.append("email", payload.email);
    form.append("password", payload.password);

    return await publicAxios.post(SIGNUP_URL, form);
  };

  // ------------------------------
  // LOGIN
  // ------------------------------
  const login = async (email: string, password: string) => {
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    const res = await publicAxios.post(LOGIN_URL, form);

    // save tokens
    setTokens(res.data.access, res.data.refresh);

    // load user
    await refreshUser();

    return res;
  };

  // ------------------------------
  // LOGOUT
  // ------------------------------
  const logout = () => {
    clearTokens();
    setUser(null);
  };

  // ------------------------------
  // FETCH USER FROM /me/
  // ------------------------------
  const refreshUser = async () => {
    const res = await privateAxios.get(ME_URL); // baseURL + token already present
    setUser(res.data);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout, refreshUser }}
    >
      {loading ? <LoadingSkeleton /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
