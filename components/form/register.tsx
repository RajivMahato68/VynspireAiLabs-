"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Link from "next/link";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useRegister } from "@/app/hooks/useRegister";
import { useUserStore } from "@/app/store/useRegisterStore";

const registerSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["ADMIN", "USER"], {
      message: "Please choose a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync, isPending } = useRegister();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit = async (data: RegisterForm) => {
    const body = {
      email: data.email,
      password: data.password,
      username: data.username,
      role: data.role,
    };

    try {
      const res = await mutateAsync(body);

      setUser(res.data);

      toast.success("Account created successfully!");

      reset();

      setTimeout(() => {
        router.push("/login");
      }, 800);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (typeof error === "object" && error !== null) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message ?? "Registration failed");
      } else {
        toast.error("Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Join us today and start writing!</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register("username")} />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label>Role</Label>
              <Select
                onValueChange={(val) =>
                  setValue("role", val as RegisterForm["role"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
