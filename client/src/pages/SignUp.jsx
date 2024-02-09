import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setError("Please fill out all fields");
    }

    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setIsLoading(false);
        return setError(data.message);
      }
      setIsLoading(false);

      navigate("/signin");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 flex-col md:flex-row  md:items-center p-3 max-w-3xl mx-auto">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className=" whitespace-nowrap text-4xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
              Ben&apos;s
            </span>
            Blog
          </Link>

          <p className="text-sm mt-5">
            You can sign up with you email and password or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div>
              <Label value="Your username" />
              <TextInput
                onChange={handleChange}
                type="text"
                placeholder="Username"
                id="username"
              />
            </div>

            <div>
              <Label value="Your email" />
              <TextInput
                onChange={handleChange}
                type="email"
                placeholder="name@gmail.com"
                id="email"
              />
            </div>

            <div>
              <Label value="Your password" />
              <TextInput
                onChange={handleChange}
                type="password"
                placeholder="**********"
                id="password"
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={isLoading}
              isProcessing={isLoading}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>

            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {error && (
            <Alert className="mt-5 " color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
