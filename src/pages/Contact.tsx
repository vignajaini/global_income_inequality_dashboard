import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="
        min-h-screen relative overflow-hidden text-gray-200
        bg-gradient-to-br from-[#1a0b2e] via-[#240f45] to-[#0a1b3c]
      "
    >
      {/* Neon Blobs — Matches the Home Page */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full 
                      bg-purple-600 opacity-40 blur-[160px] pointer-events-none"></div>

      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] rounded-full 
                      bg-blue-500 opacity-40 blur-[160px] pointer-events-none"></div>

      <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] rounded-full 
                      bg-pink-400 opacity-30 blur-[180px] pointer-events-none"></div>

      <Navbar />

      <div className="pt-24 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur mb-4">
              <Mail className="text-purple-300" size={32} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>

            <p className="text-lg text-gray-300">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Contact Form */}
            <div className="glass rounded-2xl p-8 card-shadow animate-scale-in">
              <h2 className="text-2xl font-bold mb-6">Send Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="mt-2 bg-black/30 border-white/10 text-gray-200"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="mt-2 bg-black/30 border-white/10 text-gray-200"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message here..."
                    required
                    className="mt-2 min-h-32 bg-black/30 border-white/10 text-gray-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 transition-opacity"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="ml-2" size={18} />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">

              <div className="glass rounded-2xl p-8 card-shadow animate-fade-in-up">
                <h3 className="text-xl font-bold mb-4 text-white">Contact Information</h3>

                <div className="space-y-4 text-gray-300">
                  <p>
                    <strong className="text-white">Email:</strong>
                    <br /> info@inequalitydata.com
                  </p>

                  <p>
                    <strong className="text-white">Address:</strong>
                    <br />
                    123 Data Analytics Street <br />
                    Research City, RC 12345
                  </p>

                  <p>
                    <strong className="text-white">Hours:</strong>
                    <br />
                    Monday - Friday: 9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>

              <div
                className="glass rounded-2xl p-8 card-shadow animate-fade-in-up"
                style={{ animationDelay: "120ms" }}
              >
                <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>

                <ul className="space-y-2 text-gray-300">
                  <li>• Documentation</li>
                  <li>• API Access</li>
                  <li>• Data Sources</li>
                  <li>• Privacy Policy</li>
                  <li>• Terms of Service</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
