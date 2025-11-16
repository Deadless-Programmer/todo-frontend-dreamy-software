import { useAuth } from "@/context/AuthContext";

const Comp = () => {
  const { user, login, signup, logout, loading } = useAuth();
 
};