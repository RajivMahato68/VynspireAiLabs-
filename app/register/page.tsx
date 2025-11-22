import RegisterPage from "@/components/form/register";
import PublicRoute from "@/components/routeProtection/publicRoute";

const page = () => {
  return (
    <div>
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    </div>
  );
};

export default page;
