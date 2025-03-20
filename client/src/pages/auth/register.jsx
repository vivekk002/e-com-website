import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { Link } from "react-router-dom";
import { RegisterFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  username: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      console.log("this is formdata ", data);

      if (data?.payload?.success) {
        toast({
          title: "Registration Successful",
          description: "Please login to continue",
          variant: "success",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: "Registration Failed",
          description:
            data?.payload?.message || "User already exists with same email",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Already have an account
          <Link
            to="/auth/login"
            className="font-medium ml-2 text-primary hover:underline"
          >
            Login
          </Link>
        </p>
        <CommonForm
          formControls={RegisterFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AuthRegister;
