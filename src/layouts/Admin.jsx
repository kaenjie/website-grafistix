import { Routes, Route, Navigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";

export function Admin() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="flex min-h-screen bg-blue-gray-50/50">
      {/* Sidebar */}
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        className="h-screen overflow-y-auto fixed top-0 left-0 xl:w-80 w-64 bg-white shadow-lg"
      />
      {/* Main Content */}
      <div className="flex-1 xl:ml-80 ml-64 p-4">
        <DashboardNavbar />
        <div className="mt-6">
          <Routes>
            {/* Redirect /admin to /admin/beranda */}
            <Route path="/" element={<Navigate to="/admin/profil" replace />} />
            {routes.map(
              ({ layout, pages }) =>
                layout === "admin" &&
                pages.map(({ path, element }) => (
                  <Route key={path} exact path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
        {/* Footer */}
        <div className="mt-10 text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Admin.displayName = "/src/layout/admin.jsx";

export default Admin;
