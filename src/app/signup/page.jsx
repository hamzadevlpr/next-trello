"use client";
import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { auth } from "../components/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { MyContext } from "../components/MyContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../components/firebase";

function Signup() {
  const router = useRouter();
  const { setIsLogin } = useContext(MyContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handeSignup = async (e) => {
    e.preventDefault();
    if (fullName === "" || email === "" || password === "") {
      return toast.error("All fields are required!");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        try {
          const docRef = await addDoc(collection(db, "users"), {
            fullName: fullName,
            email: email,
            userId: user.uid,
          });
          router.push("/login");
        } catch (e) {
          toast.error("Error adding document: ", e);
        }
        toast.success("User created successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
        <div className="relative container m-auto px-6">
          <div className="m-auto md:w-[35rem]">
            <div className="rounded-xl glass-effect shadow-xl">
              <div className="p-8 h-[vh] ">
                <div className="space-y-4">
                  <Image
                    src={Logo}
                    loading="lazy"
                    className="w-40"
                    alt="logo"
                  />
                  <h2 className="mb-8 text-4xl text-cyan-900  font-bold">
                    Welcome back :)
                  </h2>
                </div>
                <div className="mt-10 grid space-y-4 px-5">
                  <form onSubmit={handeSignup}>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="fullName"
                          className="text-sm font-medium text-cyan-900"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="group h-12 px-6 border-2 rounded-lg outline-none border-pink-400"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-cyan-900"
                        >
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
                          className="text-sm font-medium text-cyan-900"
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
                        className="font-semibold text-cyan-900 tracking-wide h-12 px-6 border rounded-lg hover:bg-pink-400 hover:text-white transition-all ease-in-out duration-300 hover:border"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                  {/* <div className="flex items-center gap-3">
                    <hr className="w-full border-t-2 border-gray-300" />
                    <span className="mb-2 text-gray-900 text-center">or</span>
                    <hr className="w-full border-t-2 border-gray-300" />
                  </div> */}
                  <div className="flex items-center gap-3">
                    <span className="mb-2 text-gray-900 text-center">
                      Already have an Account?
                      <button
                        onClick={() => {
                          router.push("/login");
                        }}
                      >
                        Login
                      </button>
                    </span>
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

export default Signup;
