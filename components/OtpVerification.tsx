"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface OtpVerificationProps {
  email: string;
}

export default function OtpVerification({ email }: OtpVerificationProps) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (otp === "123456") { // In real app, verify with backend
      toast.success("Email verified successfully!", {
        description: "You can now sign in to your account.",
      });
    } else {
      toast.error("Invalid OTP code", {
        description: "Please try again or request a new code.",
      });
    }
    setIsVerifying(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Verify your email</CardTitle>
        <CardDescription className="text-center">
          We've sent a verification code to<br />
          <span className="font-medium text-primary">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-6">
          <InputOTP
            value={otp}
            onChange={setOtp}
            maxLength={6}
            render={({ slots }) => (
              <InputOTPGroup className="gap-2">
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}
              </InputOTPGroup>
            )}
          />
          <Button 
            onClick={handleVerify} 
            className="w-full"
            disabled={otp.length !== 6 || isVerifying}
          >
            {isVerifying ? (
              "Verifying..."
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" /> Verify Email
              </>
            )}
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Didn't receive the code?{" "}
            <button 
              onClick={() => toast.success("New code sent!")} 
              className="text-primary underline-offset-4 hover:underline"
            >
              Resend
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}