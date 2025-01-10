import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ServerStackIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  DocumentIcon,
  ClipboardDocumentCheckIcon,
  ShoppingCartIcon,
  ChatBubbleLeftEllipsisIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { Beranda, Profil, Tabel, Portofolio, Layanan, Paket, Pesanan, Testimoni, Faq } from "@/pages/dashboard";
import { Daftar, Masuk } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "admin",
    pages: [
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "beranda",
      //   path: "/beranda",
      //   element: <Beranda />,
      // },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profil",
        path: "/profil",
        element: <Profil />,
      },
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "portofolio",
        path: "/portofolio",
        element: <Portofolio />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "layanan",
        path: "/layanan",
        element: <Layanan />,
      },
      {
        icon: <DocumentIcon {...icon} />,
        name: "paket",
        path: "/paket",
        element: <Paket />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "pesanan",
        path: "/pesanan",
        element: <Pesanan />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tabel",
        path: "/tabel",
        element: <Tabel />,
      },
      {
        icon: <QuestionMarkCircleIcon {...icon} />,
        name: "faq",
        path: "/faq",
        element: <Faq />,
      },
      {
        icon: <ChatBubbleLeftEllipsisIcon {...icon} />,
        name: "testimoni",
        path: "/testimoni",
        element: <Testimoni />,
      },
    ],
  },
  {
    title: "Autentikasi",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "masuk",
        path: "/masuk",
        element: <Masuk />,
      },
    ],
  },
];

export default routes;


