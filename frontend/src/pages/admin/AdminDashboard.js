import { useAuth } from "../../context/AuthContext";
import PlaceholderPage from "../../components/Common/PlaceholderPage";

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <PlaceholderPage
      title={`Welcome, ${user.name.split(" ")[0]}`}
      description="Admin Dashboard overview will appear here."
    />
  );
}
