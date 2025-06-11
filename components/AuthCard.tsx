"use client";

import { useState } from "react";
import { useSession, signIn, signUp, signOut } from "@/utils/auth-client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";

export const AuthCard = () => {
  const { data, isPending, error } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    setMessage("Mencoba mendaftar...");
    try {
        await signUp.email({ email : email, password: password, name: email.split("@")[0] });
      setMessage("Pendaftaran berhasil! Silakan login.");
    } catch (err: any) {
      setMessage(`Error: ${err?.message || "Pendaftaran gagal"}`);
    }
  };

  const handleSignIn = async () => {
    setMessage("Mencoba masuk...");
    try {
      await signIn.email({ email: email, password: password });
      setMessage("");
    } catch (err: any) {
      setMessage(`Error: ${err?.message || "Login gagal"}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (isPending) {
    return <div>Loading session...</div>;
  }

  if (data?.user) {
    return (
      <Card className="max-w-[400px] mx-auto mt-10">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Selamat Datang!</h2>
        </div>
        <div className="p-4">
          <p>Anda telah login sebagai:</p>
          <Snippet className="mt-2">
            <Code>{data.user.email}</Code>
          </Snippet>
        </div>
        <div className="p-4 border-t">
          <Button color="danger" variant="flat" onPress={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-[400px] mx-auto mt-10">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Autentikasi</h2>
      </div>
      <div className="p-4 gap-4 flex flex-col">
        <Input
          type="email"
          label="Email"
          placeholder="Masukkan email Anda"
          value={email}
          onValueChange={setEmail}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Masukkan password Anda"
          value={password}
          onValueChange={setPassword}
        />
        {message && <p className="text-sm text-default-500">{message}</p>}
      </div>
      <div className="p-4 border-t gap-3 flex">
        <Button color="primary" onPress={handleSignIn}>
          Sign In
        </Button>
        <Button color="secondary" variant="bordered" onPress={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </Card>
  );
};
