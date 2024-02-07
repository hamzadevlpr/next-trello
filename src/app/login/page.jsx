"use client";
import React, { useState } from "react";
import Logo from "../../app/assets/logo.png";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { auth } from "../components/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return toast.error("All fields are required!");
    }
    setLoading(true);
    try {
      // sign in with email and password via firebase firestore
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);

      router.push("/");
      toast.success("User logged in successfully!");
    } catch (error) {
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      console.error("Error logging in: ", errorCode, errorMessage);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
        <div className="relative container m-auto px-6">
          <div className="m-auto md:w-[30rem]">
            <div className="rounded-xl glass-effect shadow-xl">
              <div className="p-8">
                <div className="space-y-4">
                  <Image
                    src={Logo}
                    loading="lazy"
                    className="w-40"
                    alt="logo"
                  />
                  <h2 className="mb-8 text-3xl text-cyan-900  font-bold">
                    Log in to unlock the best of Trello Magic App.
                  </h2>
                </div>
                <div className="mt-10 grid space-y-4 px-5">
                  <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="group h-12 px-6 border-2 rounded-lg outline-none border-pink-400"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium"
                        >
                          Passsword
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="group h-12 px-6 border-2 rounded-lg outline-none border-pink-400"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center justify-center ${
                          loading ? "font-normal" : "font-semibold"
                        } text-cyan-900 tracking-wide h-12 px-6 border rounded-lg hover:bg-pink-400 hover:text-white transition-all ease-in-out duration-300 hover:border`}
                      >
                        {loading ? "Loading..." : "Log in"}
                      </button>
                    </div>
                  </form>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-900 text-center">
                      Don't have an account yet?
                    </span>
                    <button
                      className="font-medium hover:text-pink-800 underline"
                      onClick={() => {
                        router.push("/signup");
                      }}
                    >
                      Register now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
