import React, { useState } from "react";
import CommonForm from "@/components/common/form";
import { Link } from "react-router-dom";
import { LoginFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const initialFormData = {
  email: "",
  password: "",
};

const AuthLogIn = () => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(logInUser(formData)).then((res) => {
      if (res.payload?.success) {
        toast({
          title: "Login successful",
          description: res.payload?.message,
          variant: "success",
        });
        navigate("/shop/home");
      } else {
        toast({
          title: "Login failed",
          description: res.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign In to your account
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Don't have an account
          <Link
            to="/auth/register"
            className="font-medium ml-2 text-primary hover:underline"
          >
            Register
          </Link>
        </p>
        <CommonForm
          formControls={LoginFormControls}
          buttonText={"Log In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AuthLogIn;
