"use client";
import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

interface InscrireProps {
  onBack: () => void;
  onSignIn: () => void;
}

function Inscrire({ onBack, onSignIn }: InscrireProps) {
  const { signIn } = useAuthActions();
  const createUser = useMutation(api.auth.createUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions!");
      return;
    }

    // Password validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars) {
      toast.error("Password must be at least 6 characters long and contain uppercase, lowercase, numbers, and special characters!");
      return;
    }

    setSubmitting(true);

    try {
      // Create the user record in the database
      await createUser({
        name: `${firstName} ${lastName}`,
        email: email,
        isAnonymous: false,
      });

      // Show success alert with green background and animation
      toast.success(
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Account created successfully!</span>
        </div>,
        {
          style: {
            background: '#4CAF50',
            color: 'white',
            fontSize: '16px',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            animation: 'slideIn 0.5s ease-out',
          },
          duration: 3000,
          className: 'animate-slide-in',
        }
      );
      
    } catch (error: any) {
      toast.error(error.message || "Could not create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle anonymous sign in
  const handleAnonymousSignIn = () => {
    setSubmitting(true);
    void (async () => {
      try {
        await signIn("anonymous");
        await createUser({
          isAnonymous: true,
        });
        toast.success("Signed in anonymously!");
      } catch (error: any) {
        toast.error("Could not sign in anonymously. Please try again.");
      } finally {
        setSubmitting(false);
      }
    })();
  };

  // Fix the form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleSignUp(e);
  };

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
              as="button"
              onClick={onBack}
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
              onClick={onSignIn}
              className="font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 px-6 py-2 rounded-full"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Sign In
            </Button>
            <Button
              size="sm"
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
                onClick={onSignIn}
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

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-lg">
          <Card 
            className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <Typography 
                variant="h3" 
                color="blue-gray" 
                className="mb-2 font-bold"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                S'inscrire
              </Typography>
              <Typography 
                color="gray" 
                className="font-normal text-lg"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Create your account to get started with Quiz Buzzer
              </Typography>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    size="lg"
                   label="First Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="!border-gray-300 focus:!border-blue-500"
                    placeholder="First Name"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    crossOrigin=""
                  />
                </div>
                <div>
                  <Input
                    size="lg"
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="!border-gray-300 focus:!border-blue-500"
                    placeholder="Last Name"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    crossOrigin=""
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <Input
                  size="lg"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="!border-gray-300 focus:!border-blue-500"
                  placeholder="Email Address"
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  crossOrigin=""
                />
              </div>

              {/* Password Fields */}
              <div>
                <Input
                  size="lg"
                  
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="!border-gray-300 focus:!border-blue-500"
                  placeholder="Password"
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  crossOrigin=""
                />
              </div>

              <div>
                <Input
                  size="lg"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="!border-gray-300 focus:!border-blue-500"
                  placeholder="Confirm Password"
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  crossOrigin=""
                />
              </div>

              {/* Password Requirements */}
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Password must contain:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>At least 6 characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one lowercase letter</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                </ul>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="checked:bg-blue-600 checked:border-blue-600 mt-1"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  crossOrigin=""
                />
                <Typography
                  color="blue-gray"
                  className="font-medium text-sm leading-relaxed"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  I agree to the{" "}
                  <Typography
                    as="a"
                    href="#"
                    color="blue"
                    className="font-semibold hover:text-blue-700 transition-colors duration-300"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Terms and Conditions
                  </Typography>
                  {" "}and{" "}
                  <Typography
                    as="a"
                    href="#"
                    color="blue"
                    className="font-semibold hover:text-blue-700 transition-colors duration-300"
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    Privacy Policy
                  </Typography>
                </Typography>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-4 text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Anonymous Sign In */}
            <Button
              onClick={handleAnonymousSignIn}
              variant="outlined"
              size="lg"
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-all duration-300"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              🚀 Continue Anonymously
            </Button>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <Typography 
                color="gray" 
                className="font-normal text-sm"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Already have an account?{" "}
                <Typography
                  as="button"
                  onClick={onSignIn}
                  color="blue"
                  className="font-semibold hover:text-blue-700 transition-colors duration-300 cursor-pointer"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Sign in here
                </Typography>
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Inscrire;