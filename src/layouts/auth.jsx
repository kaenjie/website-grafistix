import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/widgets/layout";
import routes from "@/routes";

export function Auth() {
  const navbarRoutes = [
    {
      name: "admin",
      path: "/admin/beranda",
      icon: ChartPieIcon,
    },
    {
      name: "profil",
      path: "/admin/profil",
      icon: UserIcon,
    },
    {
      name: "daftar",
      path: "/auth/daftar",
      icon: UserPlusIcon,
    },
    {
      name: "masuk",
      path: "/auth/masuk",
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route key={path} exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
