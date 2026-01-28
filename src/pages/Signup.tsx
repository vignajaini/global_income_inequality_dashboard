import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveUser } from "@/lib/auth";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (saveUser({ name, email, password })) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error("User already exists!");
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
              <UserPlus className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-white/70">Join us to explore inequality insights</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="
                  mt-2 bg-white/10 border-white/30 
                  text-white placeholder-white/50
                "
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
                className="
                  mt-2 bg-white/10 border-white/30
                  text-white placeholder-white/50
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
                placeholder="••••••••"
                required
                className="
                  mt-2 bg-white/10 border-white/30
                  text-white placeholder-white/50
                "
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="
                  mt-2 bg-white/10 border-white/30
                  text-white placeholder-white/50
                "
              />
            </div>

            {/* SIGN UP BUTTON */}
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
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          {/* LOGIN LINK */}
          <div className="mt-6 text-center">
            <p className="text-sm text-white/70">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-300 hover:underline">
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
