import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import logo from "./assets/AK_logo.png"
import otpimg from "./assets/undraw_confirmed_81ex.png"
import successimg from "./assets/Artboard 1.png"

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bg-white-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <div>
            <img src={successimg} alt=""/>
          <h2 className="text-center text-gray-700 font-worksans text-3xl font-semibold leading-normal mt-20 mb-5">
            Welcome to AdmitKard
          </h2>
          <p className="text-gray-600 text-center font-worksans text-base font-normal leading-normal text-center">In order to provide you with a custom experience,</p>
          <p className="text-gray-900 text-center font-worksans text-base font-normal leading-normal text-center"> we need to ask you a few questions.</p>
          <button
                  className="rounded-full bg-yellow-400 w-2/4 items-center mt-32 ml-24 flex gap-1 items-center justify-center py-2.5 text-white text-center font-work-sans text-base font-normal"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Get Started</span>
                </button>
                <p className="text-gray-600 font-worksans text-sm font-normal leading-normal text-center mt-5">*This will only take 5 min.</p>
          </div>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            
            {showOTP ? (
              <>
                {/* <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div> */}
                <img src={otpimg} alt="" className="h-auto w-32 ml-20 items-center"/>
                <p className="text-center text-gray-700 font-work-sans text-lg font-normal">Please verify Mobile Number</p>
                {/* <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label> */}
                <p className="text-gray-700 font-work-sans text-base font-normal text-center mt-9">An OTP is sent to +{ph}</p>
                <a href="/"className="text-yellow-400 font-work-sans text-xs font-normal text-center underline mb-20">Change Phone Number</a>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus={true}
                  className="opt-container"
                ></OtpInput>
                <p className="text-gray-600 font-work-sans text-base font-normal text-center">Didn’t receive the code?<span className="text-yellow-400 font-work-sans text-base font-normal">&nbsp; &nbsp;<a href="" onClick={onSignup}>Resend</a></span></p>
                <button
                  onClick={onOTPVerify}
                  className="rounded-full bg-yellow-400 w-full flex gap-1 items-center justify-center py-2.5 text-white text-center font-work-sans text-base font-normal"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                {/* <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div> */}
              <img src={logo} alt=""/>
              <h1 className="text-center leading-normal mb-1 mt-20 text-black font-work-sans text-2xl font-normal">
                Welcome Back <br /> 
              </h1>
                <label
                  htmlFor=""
                  className="text-gray-600 font-work-sans text-base font-normal text-center"
                >
                  Please sign in to your account
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} className=" rounded border border-yellow-600" />
                <p className="text-gray-600 text-center font-work-sans text-xs font-normal">
                We will send you a one time SMS message.Charges may apply.
                </p>
                <button
                  onClick={onSignup}
                  className="rounded-full bg-yellow-400 w-full flex gap-1 items-center justify-center py-2.5 text-white text-center font-work-sans text-base font-normal"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Sign In with OTP</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
