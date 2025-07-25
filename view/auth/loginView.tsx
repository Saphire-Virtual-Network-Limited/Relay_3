"use client";

import { Button } from "@heroui/react";
import { FormField, PasswordField } from "@/components/reususables";
import { z } from "zod";
import { useEffect, useState } from "react";

import {
  GeneralSans_Meduim,
  GeneralSans_SemiBold,
  cn,
  useField,
  showToast,
  useAuth,
} from "@/lib";
import { Card, CardBody, CardHeader } from "@heroui/react";
const EmailSchema = z.string().email("Please enter a valid email address");

const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export default function LoginView() {
  const {
    value: email,
    error: emailError,
    handleChange: handleEmailChange,
  } = useField("", EmailSchema);
  const {
    value: password,
    error: passwordError,
    handleChange: handlePasswordChange,
  } = useField("", PasswordSchema);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { login } = useAuth();

  useEffect(() => {
    // Update disabled state when email or password changes
    setIsDisabled(!email?.trim() || !password?.trim());
  }, [email, password]);

  const handleLogin = async () => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      // Call the login method from the context
      await login(email, password);
    } catch (error) {
      console.error("Login failed", error);
      showToast({
        type: "error",
        message: "Login failed. Please try again.",
        duration: 8000,
      });
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  return (
    <Card className={cn("p-5")}>
      <CardHeader className="flex flex-col gap-2 text-center mb-5">
        <h1 className={cn("text-2xl", GeneralSans_SemiBold.className)}>
          Welcome back
        </h1>
        <p className="text-xs text-muted-foreground">
          Enter your details to access dashboard
        </p>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted with value:", email);
            handleLogin();
          }}
        >
          <div className="grid gap-6">
            {/*<div className="flex flex-col gap-4">
								<Button
									variant="outline"
									className="w-full">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24">
										<path
											d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
											fill="currentColor"
										/>
									</svg>
									Login with Apple
								</Button>
								<Button
									variant="outline"
									className="w-full">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24">
										<path
											d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
											fill="currentColor"
										/>
									</svg>
									Login with Google
								</Button>
							</div>
							<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
								<span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
							</div>*/}
            <div className="grid gap-6">
              <div className="grid gap-2">
                <FormField
                  label="Enter your email"
                  reqValue="*"
                  htmlFor="username"
                  type="text"
                  id="username"
                  variant="bordered"
                  isInvalid={!!emailError}
                  errorMessage={emailError || ""}
                  size="sm"
                  placeholder="Input your email"
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <PasswordField
                  PasswordText="Password"
                  placheolderText="Enter your password"
                  handlePasswordChange={handlePasswordChange}
                  showForgotPassword={true}
                  forgotPasswordLink="/auth/forget-password"
                  passwordError={passwordError}
                />
              </div>
              <Button
                className={cn(
                  "w-full p-6 mb-0 bg-primary text-white font-medium text-base",
                  GeneralSans_Meduim.className
                )}
                size="md"
                radius="lg"
                isDisabled={isDisabled}
                isLoading={isLoading}
                onPress={handleLogin}
                type="submit"
              >
                Access Dashboard
              </Button>
            </div>
            {/*<div className="text-center text-sm">
							Don&apos;t have an account?{" "}
							<a
								href="#"
								className="underline underline-offset-4">
								Sign up
							</a>
						</div>*/}
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
