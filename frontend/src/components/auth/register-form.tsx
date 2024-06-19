import { useRegisterUser } from "@/api/auth/register";
import { passwordRegex } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/password-input";

const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Please enter your name" })
      .min(2, { message: "Please enter your name" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(7, {
        message: "Password must contain at least 7 characters",
      })
      .regex(passwordRegex, {
        message:
          "Password must contain at least 7 characters, one uppercase, one lowercase, and one number",
      }),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(7, {
        message: "Password must contain at least 7 characters",
      })
      .regex(passwordRegex, {
        message:
          "Password must contain at least 7 characters, one uppercase, one lowercase, and one number",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export type RegisterType = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { mutate: registerUser, isPending } = useRegisterUser();

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  function handleSignUp(values: RegisterType) {
    registerUser(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignUp)}
        className="w-full space-y-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Max Verstappen" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="email@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  id="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  id="confirm-password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" isLoading={isPending}>
          Create Account
        </Button>
      </form>
    </Form>
  );
}
