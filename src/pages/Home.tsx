import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare, CheckSquare, BarChart3, Lock, Star } from "lucide-react";

import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const token = localStorage.getItem("token");

  const features = [
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Instant messaging for seamless team communication with full message history.",
    },
    {
      icon: CheckSquare,
      title: "Smart Task Management",
      description: "Organize, assign, and track tasks with progress updates and due dates.",
    },
    {
      icon: BarChart3,
      title: "Project Tracking",
      description: "Monitor project timelines and keep everyone aligned on goals.",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "JWT authentication and role-based access control for your peace of mind.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "CollabSphere transformed how our team communicates. We've cut planning time by 50%.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Engineering Lead",
      company: "StartupXYZ",
      content: "The real-time sync is incredible. No more missed updates or communication gaps.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Team Lead",
      company: "DesignStudio",
      content: "Beautiful interface and powerful features. Exactly what we were looking for.",
      rating: 5,
    },
  ];

  const stats = [
    { label: "50%", desc: "Faster planning" },
    { label: "100+", desc: "Team members" },
    { label: "24/7", desc: "Real-time sync" },
    { label: "99.9%", desc: "Uptime SLA" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48 bg-muted/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Real-time collaboration
              </span>{" "}
              for teams that ship fast
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Chat, manage tasks, track projects — all in one place. Built for teams who want to focus on what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={token ? "/workspaces" : "/auth/register"}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition text-center"
              >
                {token ? "Go to Workspaces" : "Start Free Trial"}
              </Link>
              <Link
                to="#demo"
                className="px-8 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted transition text-center"
              >
                Watch Demo
              </Link>
            </div>
          </motion.div>

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card border border-border rounded-lg p-6 md:p-8 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg" />
              <div className="relative space-y-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-3 pt-4">
                  <div className="h-3 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                  <div className="h-24 bg-gradient-to-b from-primary/20 to-transparent rounded mt-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-border max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{stat.label}</CardTitle>
                {/* <CardDescription>{stat.desc}</CardDescription> */}
              </CardHeader>
              <CardContent className="text-xl font-bold">{stat.desc}</CardContent>
            </Card>            
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/30" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to collaborate</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to keep your team productive and connected.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-8 rounded-lg border border-border bg-card hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by teams worldwide</h2>
            <p className="text-lg text-muted-foreground">
              See what our users have to say about CollabSphere
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="p-8 rounded-lg bg-card border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">{t.content}</p>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role} at {t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to transform your team's workflow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of teams already using CollabSphere to ship faster and collaborate better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={token ? "/workspaces" : "/auth/register"}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              >
                Get Started Free
              </Link>
              {/* <Link
                to="/pricing"
                className="px-8 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted transition"
              >
                View Pricing
              </Link> */}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
