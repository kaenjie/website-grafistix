import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {
  UserGroupIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  ShoppingCartIcon,
  GlobeAltIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function Beranda() {
  // Data for the line chart
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Nama bulan
    datasets: [
      {
        label: "Pengunjung Web",
        data: [420, 580, 610, 790, 890, 1120, 1430, 1550, 1380, 1290, 1040, 960], // Data abstrak
        borderColor: "#4f46e5", // Warna garis (indigo)
        backgroundColor: "rgba(79, 70, 229, 0.2)", // Warna area di bawah garis
        fill: true,
      },
    ],
  };
  

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Statistik Pengunjung Web (Bulanan)",
      },
    },
  };

  return (
    <div className="mt-12 px-6 py-6 max-w-7xl mx-auto space-y-12">
      {/* Section: Welcome Message */}
      <Card className="mb-8 bg-gray-900 text-white shadow-2xl rounded-xl border border-gray-700">
        <CardBody>
          <Typography variant="h4" className="mb-2 text-xl font-semibold">
            Selamat Datang di Panel Admin Grafistik!
          </Typography>
          <Typography variant="small" className="text-gray-400">
            Kelola layanan desain grafis dan kebutuhan digital Anda dengan mudah.
          </Typography>
        </CardBody>
      </Card>

      {/* Section: Quick Stats */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[
          {
            icon: GlobeAltIcon,
            title: "Total Pengunjung Web",
            value: "5,430",
          },
          {
            icon: ChatBubbleLeftEllipsisIcon,
            title: "Pesan Baru",
            value: "32",
          },
          {
            icon: ShoppingCartIcon,
            title: "Total Pemesanan",
            value: "320",
          },
          {
            icon: ChartBarIcon,
            title: "Total Pendapatan",
            value: "Rp 120 Juta",
          },
          {
            icon: BriefcaseIcon,
            title: "Proyek Aktif",
            value: "45",
          },
          {
            icon: BriefcaseIcon,
            title: "Proyek Berjalan",
            value: "76",
          },
          {
            icon: CheckCircleIcon,
            title: "Proyek Selesai",
            value: "31",
          },
        ].map(({ icon, title, value }, index) => (
          <Card
            key={index}
            className="p-6 shadow-lg bg-white rounded-xl transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-gray-500"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gray-700 p-4 text-white">
                {React.createElement(icon, { className: "w-8 h-8" })}
              </div>
              <div>
                <Typography variant="h6" className="font-medium text-black">
                  {title}
                </Typography>
                <Typography variant="h4" className="font-bold text-black">
                  {value}
                </Typography>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Section: Statistik Pengunjung */}
      <div>
        <Card className="shadow-2xl bg-white border border-gray-300 rounded-xl hover:shadow-xl hover:shadow-gray-500">
          <CardHeader
            floated={false}
            shadow={false}
            className="p-4 border-b border-gray-300 bg-gray-50"
          >
            <Typography variant="h6" className="font-medium text-black">
              Statistik Pengunjung Web
            </Typography>
          </CardHeader>
          <CardBody className="p-4">
            {/* Line Chart */}
            <Line data={lineChartData} options={lineChartOptions} />
          </CardBody>
        </Card>
      </div>

      {/* Aktifitas Terbaru */}
      <div className="mb-12">
        <Card className="shadow-2xl bg-white border border-gray-300 rounded-xl hover:shadow-xl hover:shadow-gray-500">
          <CardHeader
            floated={false}
            shadow={false}
            className="p-4 border-b border-gray-300 bg-gray-50"
          >
            <Typography variant="h6" className="font-medium text-black">
              Aktivitas Terbaru
            </Typography>
          </CardHeader>
          <CardBody className="p-4">
            <div className="space-y-4">
              {[
                {
                  activity: "Proyek A telah selesai.",
                  icon: CheckCircleIcon,
                },
                {
                  activity: "Pengguna B bergabung.",
                  icon: UserGroupIcon,
                },
                {
                  activity: "Pesan baru dari klien C.",
                  icon: ChatBubbleLeftEllipsisIcon,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="flex-shrink-0 rounded-full border border-gray-500 p-3 text-gray-600">
                    {React.createElement(item.icon, { className: "w-6 h-6" })}
                  </div>
                  <Typography variant="small" className="text-gray-800">
                    {item.activity}
                  </Typography>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Beranda;
