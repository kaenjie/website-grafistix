import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Masuk() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login gagal. Silakan periksa email dan kata sandi Anda.");
      }

      const data = await response.json();
      // Simpan token atau data lainnya sesuai kebutuhan
      localStorage.setItem("token", data.access_token);

      alert("Login berhasil! Selamat datang.");
      
      navigate("/admin/profil", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Masuk</Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Masukkan email dan kata sandi Anda untuk masuk.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleLogin}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Email Anda
            </Typography>
            <Input
              size="lg"
              placeholder="nama@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Kata Sandi
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {error && (
            <Typography
              variant="small"
              color="red"
              className="mt-2 text-center"
            >
              {error}
            </Typography>
          )}
          <Button className="mt-6" fullWidth type="submit">
            Masuk
          </Button>
        </form>
      </div>
      <div className="w-1/2 hidden lg:block">
        <img
          src="/img/pattern.png"
          className="w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default Masuk;