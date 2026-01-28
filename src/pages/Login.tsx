import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateLogin } from "@/lib/auth";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (validateLogin(email, password)) {
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error("Invalid credentials. Try: demo@project.com / Dashboard123");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div
      className="
        min-h-screen 
        flex items-center justify-center 
        px-4 pt-16
        text-white
        bg-gradient-to-br 
        from-[#0a0528] 
        via-[#1b0c42] 
        to-[#3e1b6f]
      "
    >
      <div className="w-full max-w-md animate-scale-in">
        
        {/* GLASS CARD */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          
          {/* ICON + TITLE */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-white/20 mb-4">
              <LogIn className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-white/70">
              Login to explore the dashboards
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <Label htmlFor="email" className="text-white">Username / Email</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@project.com"
                required
                className="
                  mt-2 
                  bg-white/10 
                  border-white/30 
                  text-white 
                  placeholder-white/50
                "
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Dashboard123"
                required
                className="
                  mt-2 
                  bg-white/10 
                  border-white/30 
                  text-white 
                  placeholder-white/50
                "
              />
            </div>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              className="
                w-full
                bg-purple-600 
                hover:bg-purple-700 
                text-white 
                rounded-xl 
                shadow-lg 
                transition
              "
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* SIGNUP LINK */}
          <div className="mt-6 text-center">
            <p className="text-sm text-white/70">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-300 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* DEMO CREDENTIALS BOX */}
          <div className="mt-6 p-4 bg-white/10 border border-white/20 rounded-lg">
            <p className="text-xs text-white/70 text-center leading-relaxed">
              <strong>Demo Credentials:</strong>
              <br />
              Email: demo@project.com  
              <br />
              Password: Dashboard123
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
