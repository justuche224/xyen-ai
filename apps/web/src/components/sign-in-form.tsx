import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { Link, Navigate, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { defaultRedirect } from "@/routes";
export default function SignInForm({
  className,
  callbackURL,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & {
  className?: string;
  callbackURL?: string;
}) {
  const navigate = useNavigate({
    from: "/",
  });
  const { isPending, data: session } = authClient.useSession();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = () => {
    alert(
      "🚧 App in Testing Mode\n\nOur Google sign-in is currently under development. Please use the email and password sign-in option instead.\n\nThank you for your patience!"
    );
  };
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            navigate({
              to: callbackURL || defaultRedirect,
            });
            toast.success("Sign in successful");
          },
          onError: (ctx) => {
            console.log(ctx);
            toast.error(ctx.error.message);
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string(),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  if (session) {
    return <Navigate to={callbackURL || defaultRedirect} />;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className={cn(
        "flex flex-col gap-6 mx-auto w-full mt-10 max-w-md p-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="grid gap-6">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleGoogleSignIn();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Login with Google
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <form.Field name="email">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="m@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                required
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-500 text-sm">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor={field.name}>Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="********"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-500 text-sm">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Subscribe>
          {(state) => (
            <Button
              type="submit"
              className="w-full"
              disabled={!state.canSubmit || state.isSubmitting}
            >
              {state.isSubmitting ? "Submitting..." : "Login"}
            </Button>
          )}
        </form.Subscribe>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/sign-up"
          className="underline underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
