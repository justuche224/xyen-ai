import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import { googleSignIn } from "@/lib/google-sign-in";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl translate-y-1/2" />
      </div>
      <header className="flex items-center justify-between px-10 py-3 bg-sidebar/60 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold">
            Xyen AI
          </Link>
        <nav className="md:flex items-center justify-center gap-2 hidden">
          <Button asChild variant="link">
            <Link to="/demo">Demo</Link>
          </Button>
          <Button asChild variant="link">
            <a href="#pricing">Pricing</a>
          </Button>
          <Button asChild variant="link">
            <Link to="/about">About</Link>
          </Button>
          <Button asChild variant="link">
            <Link to="/contact">Contact</Link>
          </Button>
        </nav>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="md:flex items-center justify-center gap-2 hidden">
            <Button asChild aria-label="Sign in" variant="outline">
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button
              type="button"
              aria-label="Continue with Google"
              variant="outline"
              onClick={() => {
                void googleSignIn();
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
              Google
            </Button>
          </div>
          {/* <ModeToggle /> */}
          <Drawer>
            <DrawerTrigger className="md:hidden" aria-label="Menu">
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent className="md:hidden" role="navigation">
              <DrawerHeader>
                <DrawerTitle>Xyen AI</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                <Button asChild variant="outline">
                  <Link to="/demo">Demo</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/about">About</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Contact</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/sign-in">Sign in</Link>
                </Button>
                <Button
                  type="button"
                  aria-label="Continue with Google"
                  variant="outline"
                  onClick={() => {
                    void googleSignIn();
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
                  Google
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </header>
      <Hero />
    </section>
  );
}
