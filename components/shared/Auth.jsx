"use client";

import { useEffect, useState } from "react";

import { redirect, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "../ui/use-toast";
import AuthForm from "../forms/AuthForm";

import { Button } from "../ui/button";

import { signupValidation, loginValidation } from "../../lib/validations/auth";
import {
  createUser,
  fetchUserCredential,
  validateUserEmail,
} from "../../lib/actions/user.actions";

const Auth = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState({
    credential: null,
    userId: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    //Check user credentials exists in local storage. If credentials exists in local storage Check local storage credentials with backend credentials, if it matches show logout button or else show login button. This credential is nothing but UUID . Each time user loggedIn new UUID update in user credential column in a database then update the local storage with newly generated UUID
    const clientToken = localStorage.getItem("skaiLamaUserCredentials");
    if (clientToken) {
      (async () => {
        try {
          // Fetch user credentials from the server using the clientToken.
          const userDetail = await fetchUserCredential(clientToken);
          // Check if local storage credentials match backend credentials.
          setIsUserLoggedIn({
            credential: clientToken === userDetail.credentials,
            userId: userDetail._id,
          });
        } catch (error) {
          // Handle fetch errors, e.g., log or show an error message.
          console.error("Error fetching user credentials:", error);
        }
      })();
    } else {
      setIsUserLoggedIn({ credential: false, userId: null });
    }
  }, []);

  isUserLoggedIn.credential === false && pathname !== "/" && redirect("/");

  const signupForm = useForm({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const loginForm = useForm({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSignupSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const user = await createUser({
        username: values.username,
        email: values.email,
      });
      toast({
        title: "Your account has been successfully created.",
        duration: 2500,
      });
      localStorage.setItem("skaiLamaUserCredentials", user.credential);
      setIsSubmitting(false);
      setIsUserLoggedIn({ ...isUserLoggedIn, credential: true });
      setOpenSignup(false);
      router.push(`/create-project/${user.userId}`);
    } catch (error) {
      toast({
        title: error.message,
        variant: "destructive",
        duration: 2500,
      });
      setIsSubmitting(false);
      setOpenSignup(false);
    }
  };

  const onLoginSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const user = await validateUserEmail(values.email);
      toast({
        title: "You have successfully logged into your Skai Lama account.",
        duration: 1500,
      });
      localStorage.setItem("skaiLamaUserCredentials", user.credential);
      setIsSubmitting(false);
      setIsUserLoggedIn({ ...isUserLoggedIn, credential: true });
      setOpenLogin(false);
      router.push(`/create-project/${user.userId}`);
    } catch (error) {
      toast({
        title: error.message,
        variant: "destructive",
        duration: 2500,
      });

      setIsSubmitting(false);
      setOpenLogin(false);
    }
  };

  return (
    <div className="flex gap-3">
      {isUserLoggedIn.credential === null ? null : isUserLoggedIn.credential ===
        false ? (
        <AuthForm
          signupForm={signupForm}
          loginForm={loginForm}
          onSignupSubmit={onSignupSubmit}
          onLoginSubmit={onLoginSubmit}
          isSubmitting={isSubmitting}
          openLogin={openLogin}
          openSignup={openSignup}
          setOpenLogin={setOpenLogin}
          setOpenSignup={setOpenSignup}
        />
      ) : (
        <>
          {pathname === "/" && (
            <Link
              href={`/create-project/${isUserLoggedIn.userId}`}
              className="flex items-center gap-3 pl-5 pr-8 py-2 bg-[#211935] text-[#F8F8F8] hover:bg-opacity-70  font-semibold rounded-xl"
            >
              <div className="w-5 h-5 flex items-center justify-center rounded-full text-[20px] text-[#211935] bg-[#F8F8F8]">
                +
              </div>

              <p className="text-[18px]">Create New Project</p>
            </Link>
          )}
          <Button
            className="btn-primary"
            onClick={() => {
              localStorage.removeItem("skaiLamaUserCredentials");
              setIsUserLoggedIn({ credential: false, userId: null });
            }}
          >
            Logout
          </Button>
        </>
      )}
    </div>
  );
};

export default Auth;
