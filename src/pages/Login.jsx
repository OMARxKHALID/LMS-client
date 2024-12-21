import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "rive-react";
import "@/styles/teddy.css";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const STATE_MACHINE_NAME = "Login Machine";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { rive: riveInstance, RiveComponent } = useRive({
    src: "teddy.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  const isCheckingInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    "isChecking"
  );

  const isHandsUpInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    "isHandsUp"
  );

  const trigSuccessInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    "trigSuccess"
  );

  const trigFailInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    "trigFail"
  );

  const onSubmit = async (data) => {
    try {
      const response = await signIn({
        email: data.email,
        password: data.password,
      });
      if (response.message === "Login successful") {
        trigSuccessInput.fire();
        toast({
          title: "Success",
          description: "Login successfully",
        });
        navigate("/admin");
      } else {
        trigFailInput.fire();
        toast({
          title: "Error",
          description: "Incorrect password",
          variant: "destructive",
        });
      }
    } catch (error) {
      trigFailInput.fire();
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-2 min-h-[calc(115vh-14rem)]">
      <div className="w-full max-w-lg">
        <div className="rive-wrapper">
          <RiveComponent className="rive-container" />
        </div>
        <Card className="rounded-t-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to log in</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-9"
                    {...register("email")}
                    onFocus={() => (isCheckingInput.value = true)}
                    onBlur={() => (isCheckingInput.value = false)}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-9"
                    {...register("password")}
                    onFocus={() => (isHandsUpInput.value = true)}
                    onBlur={() => (isHandsUpInput.value = false)}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              <Link
                to="/request-password-reset"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline font-medium"
                >
                  Create one
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
