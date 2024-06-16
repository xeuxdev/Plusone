import { useLoginUser } from "@/api/auth/login";
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

const loginSchema = z.object({
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
});

export type LoginType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { mutate, isPending } = useLoginUser();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  function handleLogin(values: LoginType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="w-full space-y-5"
      >
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

        <Button type="submit" className="w-full" isLoading={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
}
