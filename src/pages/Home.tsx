import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, MessageSquare, Folder, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

export default function Home() {
  const token = localStorage.getItem("token");

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Real-time Chat",
      description: "Instant messaging powered by Socket.IO for seamless collaboration.",
    },
    {
      icon: <Folder className="w-6 h-6 text-primary" />,
      title: "Organized Workspaces",
      description: "Create, manage, and switch between projects effortlessly.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Team Collaboration",
      description: "Invite teammates and assign roles to boost productivity.",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Lightning Fast",
      description: "Optimized with modern tech for smooth and instant performance.",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure by Design",
      description: "JWT-based authentication ensures your data stays protected.",
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Cross Platform",
      description: "Works seamlessly on desktop and mobile devices.",
    },
  ];

  return (
    <div className="flex flex-col items-center text-center px-6 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Collaborate <span className="text-primary">Smarter</span> with CollabSphere
        </h1>
        <p className="text-muted-foreground text-lg mb-10">
          A modern platform to connect your team, share ideas, and manage projects — all in one place.
        </p>

        {token ? (
          <Link to="/workspaces">
            <Button size="lg" className="px-8 py-6 text-lg">
              Go to Workspaces <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/register">
              <Button size="lg" className="px-8 py-6 text-lg">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                Log In
              </Button>
            </Link>
          </div>
        )}
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-24 max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mx-auto mb-3">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-24 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">
          Ready to build your next big idea?
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Start collaborating with your team today — it’s free to get started.
        </p>
        <Link to={token ? "/workspaces" : "/auth/register"}>
          <Button size="lg" className="px-10 py-6 text-lg">
            {token ? "Go to Dashboard" : "Create Your Account"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </motion.div>
      <Footer/>
    </div>
  );
}
