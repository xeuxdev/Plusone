import RegisterForm from "@/components/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />

        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="ml-3 underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
