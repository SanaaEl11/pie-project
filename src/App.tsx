import React, { useState, useEffect } from "react";
import { Authenticated, Unauthenticated } from "convex/react";
import Home from "./Home";
import { SignOutButton } from "./SignOutButton";
import { AdminInterface } from "./AdminInterface";
import { PlayerInterface } from "./PlayerInterface";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Card,
} from "@material-tailwind/react";

function App() {
  const [mode, setMode] = useState<"admin" | "player" | null>(null);
  const [openNav, setOpenNav] = useState(false);

  const handleBack = () => {
    setMode(null);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      <li>
        <Typography
          as="a"
          href="#services"
          variant="small"
          className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer relative group"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Services
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Typography>
      </li>
      <li>
        <Typography
          as="a"
          href="#testimonials"
          variant="small"
          className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer relative group"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Testimonials
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Typography>
      </li>
      <li>
        <Typography
          as="a"
          href="#contact"
          variant="small"
          className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer relative group"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Contact Us
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Typography>
      </li>
    </ul>
  );

  return (
    <main>
      <Unauthenticated>
        <Home />
      </Unauthenticated>
      <Authenticated>
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {/* Advanced Navigation Bar */}
          <Navbar 
            className="sticky top-0 z-50 h-max w-full rounded-none border-0 bg-white/95 backdrop-blur-md shadow-lg px-4 py-3 lg:px-8 lg:py-4"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <Typography
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Quiz Buzzer
                </Typography>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navList}
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex items-center space-x-4">
                <SignOutButton />
              </div>

              {/* Mobile Menu Button */}
              <IconButton
                variant="text"
                className="ml-auto h-8 w-8 text-gray-700 hover:bg-gray-100 lg:hidden rounded-lg transition-colors duration-300"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>

            {/* Mobile Navigation Menu */}
            <Collapse open={openNav}>
              <div className="w-full max-w-7xl mx-auto mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-4 mb-6">
                  {navList}
                </div>
                <div className="flex flex-col space-y-3">
                  <SignOutButton />
                </div>
              </div>
            </Collapse>
          </Navbar>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            {!mode && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <Typography 
                    variant="h2" 
                    className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Choose Your Role
                  </Typography>
                  <Typography 
                    color="gray" 
                    className="font-normal text-xl"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Select your role to start the quiz experience
                  </Typography>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card 
                    className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 cursor-pointer"
                    onClick={() => setMode("admin")}
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                    <Typography 
                      variant="h4" 
                      className="text-center font-bold mb-4"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Admin
                    </Typography>
                    <Typography 
                      color="gray" 
                      className="text-center"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Create and manage quiz competitions, control the flow, and evaluate answers.
                    </Typography>
                  </Card>

                  <Card 
                    className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 cursor-pointer"
                    onClick={() => setMode("player")}
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                    <Typography 
                      variant="h4" 
                      className="text-center font-bold mb-4"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Player
                    </Typography>
                    <Typography 
                      color="gray" 
                      className="text-center"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Join competitions, answer questions, and compete with other players.
                    </Typography>
                  </Card>
                </div>
              </div>
            )}

            {mode === "admin" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-700">Admin Panel</h2>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    ← Back
                  </button>
                </div>
                <AdminInterface onBack={handleBack} />
              </div>
            )}

            {mode === "player" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-700">Player Interface</h2>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    ← Back
                  </button>
                </div>
                <PlayerInterface onBack={handleBack} />
              </div>
            )}
          </div>
        </div>
      </Authenticated>
    </main>
  );
}

export default App;