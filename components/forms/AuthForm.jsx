"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Loader } from "../index";

const AuthForm = ({
  signupForm,
  loginForm,
  onSignupSubmit,
  onLoginSubmit,
  isSubmitting,
}) => {
  
  return (
    <>
      <Dialog>
        <DialogTrigger className="btn-primary px-4 py-2 rounded-md text-white cursor-pointer">
          Sign up
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-body-bold">
              Claim Your Free Account
            </DialogTitle>
          </DialogHeader>
          <Form {...signupForm}>
            <form
              className="mt-10 flex flex-col justify-start gap-10"
              onSubmit={signupForm.handleSubmit(onSignupSubmit)}
            >
              <FormField
                control={signupForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1">
                    <FormLabel className="text-base-semibold text-slate-gray">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        className="no-focus border border-slate-gray"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1">
                    <FormLabel className="text-base-semibold text-slate-gray">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="john.doe@example.com"
                        className="no-focus border border-slate-gray"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`${isSubmitting && "btn-submit"} btn-primary gap-4`}
              >
                <span>Sign up</span>
                {isSubmitting && <Loader />}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger className="bg-[#1d1b2014] text-primary border border-primary hover:bg-[#1d1b2014] px-4 py-2 rounded-md">
          Log in
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-body-bold">Welcome Back</DialogTitle>
          </DialogHeader>
          <Form {...loginForm}>
            <form
              className="mt-10 flex flex-col justify-start gap-10"
              onSubmit={loginForm.handleSubmit(onLoginSubmit)}
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1">
                    <FormLabel className="text-base-semibold text-slate-gray">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="john.doe@example.com"
                        className="no-focus border border-slate-gray"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`${isSubmitting && "btn-submit"} btn-primary gap-4`}
              >
                <span>Log in</span>
                {isSubmitting && <Loader />}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthForm;
