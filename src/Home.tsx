"use client";
import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useAuthActions } from "@convex-dev/auth/react";
import SeConnecte from "./SeConnecte";
import Inscrire from "./Inscrire";

function Home() {
  const { signIn } = useAuthActions();
  const [openNav, setOpenNav] = React.useState(false);
  const [showSignIn, setShowSignIn] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  // If showing sign in form, render SeConnecte component
  if (showSignIn) {
    return (
      <SeConnecte 
        onBack={() => setShowSignIn(false)} 
        onSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />
    );
  }

  // If showing sign up form, render Inscrire component
  if (showSignUp) {
    return (
      <Inscrire 
        onBack={() => setShowSignUp(false)} 
        onSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />
    );
  }

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
              as="a"
              href="#"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
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
            <Button
              variant="text"
              size="sm"
              onClick={() => setShowSignIn(true)}
              className="font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 px-6 py-2 rounded-full"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={() => setShowSignUp(true)}
              className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Sign Up
            </Button>
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
              <Typography
                as="a"
                href="#services"
                variant="small"
                className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer py-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Services
              </Typography>
              <Typography
                as="a"
                href="#testimonials"
                variant="small"
                className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer py-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Testimonials
              </Typography>
              <Typography
                as="a"
                href="#contact"
                variant="small"
                className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer py-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Contact Us
              </Typography>
            </div>
            <div className="flex flex-col space-y-3">
              <Button 
                fullWidth 
                variant="text" 
                size="sm" 
                onClick={() => setShowSignIn(true)}
                className="font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 py-3 rounded-lg"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Sign In
              </Button>
              <Button 
                fullWidth 
                size="sm" 
                onClick={() => setShowSignUp(true)}
                className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg shadow-lg"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Collapse>
      </Navbar>

      {/* Hero Section - Full Width */}
      <div className="w-full px-4 lg:px-8">
        <div className="max-w-7xl mx-auto py-16 lg:py-24">
          <div className="text-center mb-16">
            <Typography 
              variant="h1" 
              color="blue-gray" 
              className="mb-6 text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Interactive Quiz Experience
            </Typography>
            <Typography 
              color="gray" 
              className="font-normal text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto mb-12"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Experience the thrill of real-time quiz competitions with our advanced buzzer system. 
              Perfect for classrooms, corporate training, and competitive events.
            </Typography>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Sign In Card */}
            <div className="w-full">
              <Card 
                className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <Typography 
                  variant="h3" 
                  color="blue-gray" 
                  className="mb-6 text-center font-bold"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Get Started Now
                </Typography>
                <div className="flex flex-col gap-6">
                  <button 
                    type="button"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-lg" 
                    onClick={() => void signIn("anonymous")}
                  >
                    🚀 Start Quiz Session Anonymously
                  </button>
                  <div className="text-center">
                    <Typography 
                      color="gray" 
                      className="font-normal text-sm"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      No registration required • Instant access • Free to use
                    </Typography>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Feature Image */}
            <div className="w-full">
              <Card 
                className="overflow-hidden shadow-2xl border-0 h-96"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <img
                  alt="Quiz Buzzer Application Interface"
                  className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                />
              </Card>
            </div>
          </div>

          {/* Features Section */}
          <div id="services" className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              className="p-6 text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <Typography 
                variant="h5" 
                color="blue-gray" 
                className="mb-2 font-bold"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Real-time Buzzing
              </Typography>
              <Typography 
                color="gray" 
                className="font-normal"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Instant response detection with millisecond precision for fair competition.
              </Typography>
            </Card>

            <Card 
              className="p-6 text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <Typography 
                variant="h5" 
                color="blue-gray" 
                className="mb-2 font-bold"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Multi-player Support
              </Typography>
              <Typography 
                color="gray" 
                className="font-normal"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Support for unlimited participants in your quiz competitions.
              </Typography>
            </Card>

            <Card 
              className="p-6 text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <Typography 
                variant="h5" 
                color="blue-gray" 
                className="mb-2 font-bold"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Easy Management
              </Typography>
              <Typography 
                color="gray" 
                className="font-normal"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Simple admin interface for creating and managing quiz sessions.
              </Typography>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div id="contact" className="w-full bg-gradient-to-br from-gray-50 to-blue-50 px-4 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Typography 
              variant="h2" 
              color="blue-gray" 
              className="mb-4 text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Get in Touch
            </Typography>
            <Typography 
              color="gray" 
              className="font-normal text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Have questions about our quiz buzzer system? We'd love to hear from you and help you get started.
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card 
              className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <Typography 
                variant="h4" 
                color="blue-gray" 
                className="mb-6 font-bold"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Send us a Message
              </Typography>
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    size="lg"
                    className="!border-gray-300 focus:!border-blue-500"
                    placeholder="First Name"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    crossOrigin=""
                  />
                  <Input
                    size="lg"
                    className="!border-gray-300 focus:!border-blue-500"
                    placeholder="Last Name"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    crossOrigin=""
                  />
                </div>
                <Input
                  size="lg"
                  type="email"
                  className="!border-gray-300 focus:!border-blue-500"
                  placeholder="Email Address"
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  crossOrigin=""
                />
                <Input
                  size="lg"
                  className="!border-gray-300 focus:!border-blue-500"
                  placeholder="Subject"
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  crossOrigin=""
                />
                <Textarea
                  size="lg"
                  rows={6}
                  className="!border-gray-300 focus:!border-blue-500"
                  placeholder="Message"
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                />
                <Button
                  size="lg"
                  className="bg-gradient-to-r mt-3 from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card 
                className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <Typography 
                      variant="h6" 
                      color="blue-gray" 
                      className="font-bold"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Email Us
                    </Typography>
                    <Typography 
                      color="gray" 
                      className="font-normal"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      support@quizbuzzer.com
                    </Typography>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <Typography 
                      variant="h6" 
                      color="blue-gray" 
                      className="font-bold"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Call Us
                    </Typography>
                    <Typography 
                      color="gray" 
                      className="font-normal"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      +1 (555) 123-4567
                    </Typography>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <Typography 
                      variant="h6" 
                      color="blue-gray" 
                      className="font-bold"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      Visit Us
                    </Typography>
                    <Typography 
                      color="gray" 
                      className="font-normal"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      123 Tech Street, Innovation City, IC 12345
                    </Typography>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="w-full bg-white px-4 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Typography 
              variant="h2" 
              color="blue-gray" 
              className="mb-4 text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              What Our Users Say
            </Typography>
            <Typography 
              color="gray" 
              className="font-normal text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Discover how educators and trainers are transforming their quiz experiences with our platform.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card 
              className="p-6 shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-2xl transition-shadow duration-300"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="Sarah Johnson"
                />
                <div>
                  <Typography 
                    variant="h6" 
                    color="blue-gray" 
                    className="font-bold"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Sarah Johnson
                  </Typography>
                  <Typography 
                    color="gray" 
                    className="text-sm"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    High School Teacher
                  </Typography>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <Typography 
                color="gray" 
                className="font-normal italic"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                "This quiz buzzer system has completely transformed my classroom engagement. Students are more excited about participating, and the real-time responses make learning so much more interactive!"
              </Typography>
            </Card>

            {/* Testimonial 2 */}
            <Card 
              className="p-6 shadow-xl border-0 bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-2xl transition-shadow duration-300"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="Michael Chen"
                />
                <div>
                  <Typography 
                    variant="h6" 
                    color="blue-gray" 
                    className="font-bold"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Michael Chen
                  </Typography>
                  <Typography 
                    color="gray" 
                    className="text-sm"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Corporate Trainer
                  </Typography>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <Typography 
                color="gray" 
                className="font-normal italic"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                "Perfect for our corporate training sessions! The system is incredibly easy to set up, and our employees love the competitive element it brings to learning."
              </Typography>
            </Card>

            {/* Testimonial 3 */}
            <Card 
              className="p-6 shadow-xl border-0 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-shadow duration-300"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="Emily Rodriguez"
                />
                <div>
                  <Typography 
                    variant="h6" 
                    color="blue-gray" 
                    className="font-bold"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Emily Rodriguez
                  </Typography>
                  <Typography 
                    color="gray" 
                    className="text-sm"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Event Organizer
                  </Typography>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <Typography 
                color="gray" 
                className="font-normal italic"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                "We've used this for multiple trivia nights and corporate events. The reliability and user-friendly interface make it our go-to choice for interactive entertainment!"
              </Typography>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white px-4 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <Typography
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Quiz Buzzer
                </Typography>
              </div>
              <Typography 
                color="gray" 
                className="font-normal text-gray-400"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Making interactive learning and competitive quizzing accessible to everyone, everywhere.
              </Typography>
              <div className="flex space-x-4">
                <IconButton
                  variant="text"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.77.35-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.83.5-1.75.85-2.72.95C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </IconButton>
                <IconButton
                  variant="text"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.77.35-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.83.5-1.75.85-2.72.95C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </IconButton>
                <IconButton
                  variant="text"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.77.35-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.83.5-1.75.85-2.72.95C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </IconButton>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <Typography 
                variant="h6" 
                className="font-bold text-white"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Quick Links
              </Typography>
              <ul className="space-y-2">
                <li>
                  <Typography
                    as="a"
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Services
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#testimonials"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Testimonials
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Contact Us
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Documentation
                  </Typography>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <Typography 
                variant="h6" 
                className="font-bold text-white"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Support
              </Typography>
              <ul className="space-y-2">
                <li>
                  <Typography
                    as="a"
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Help Center
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    FAQ
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Community
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Support Tickets
                  </Typography>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <Typography 
                variant="h6" 
                className="font-bold text-white"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Legal
              </Typography>
              <ul className="space-y-2">
                <li>
                  <Typography
                    as="a"
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Privacy Policy
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Terms of Service
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Cookie Policy
                  </Typography>
                </li>
                <li>
                  <Typography
                    as="a"
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    GDPR
                  </Typography>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <Typography 
                color="gray" 
                className="font-normal text-gray-400 text-center md:text-left"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                © 2024 Quiz Buzzer. All rights reserved. Built with ❤️ for interactive learning.
              </Typography>
              <div className="flex items-center space-x-6">
                <Typography
                  as="a"
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-sm"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Status
                </Typography>
                <Typography
                  as="a"
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-sm"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  API
                </Typography>
                <Typography
                  as="a"
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-sm"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Changelog
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
