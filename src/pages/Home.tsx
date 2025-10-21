import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Folder,
  Rocket,
  Users,
  MessageSquare,
  Lock,
  Zap,
  Globe,
  CheckCircle2,
  Star,
  TrendingUp,
  Shield,
  Clock,
  BarChart3,
  FileText,
  Video,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const token = false; // Replace with: localStorage.getItem("token");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Real-Time Messaging",
      description:
        "Instant chat functionality powered by Socket.IO for seamless team communication without delays.",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Secure & Private",
      description:
        "End-to-end encryption ensures your conversations and data remain confidential and protected.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Built with React 19 and optimized performance for instant load times and smooth interactions.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Cross-Platform",
      description:
        "Access your workspaces from any device - desktop, tablet, or mobile with responsive design.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Management",
      description:
        "Invite members, assign roles, and manage permissions with granular access controls.",
    },
    {
      icon: <Folder className="w-8 h-8" />,
      title: "Organized Workspaces",
      description:
        "Create unlimited workspaces for different projects, teams, or departments with ease.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "100K+", label: "Messages Sent" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content:
        "CollabSphere transformed how our team communicates. The real-time features are incredible!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Engineering Lead",
      company: "DevStudio",
      content:
        "Best collaboration tool we've used. Clean interface and powerful features that actually work.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Startup Founder",
      company: "InnovateLabs",
      content:
        "Helped us scale from 5 to 50 people without missing a beat. Highly recommended!",
      rating: 5,
    },
  ];

  const useCases = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Startups",
      description: "Move fast and stay aligned with your growing team",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Enterprises",
      description: "Scale communication across departments and locations",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Remote Teams",
      description: "Bridge the distance with seamless collaboration tools",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Agencies",
      description: "Manage multiple clients in organized workspaces",
    },
  ];

  const additionalFeatures = [
    { icon: <Bell className="w-5 h-5" />, text: "Smart Notifications" },
    { icon: <FileText className="w-5 h-5" />, text: "File Sharing" },
    { icon: <Video className="w-5 h-5" />, text: "Video Integration" },
    { icon: <BarChart3 className="w-5 h-5" />, text: "Analytics Dashboard" },
    { icon: <Clock className="w-5 h-5" />, text: "Activity Timeline" },
    { icon: <Shield className="w-5 h-5" />, text: "Data Backup" },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center p-8 justify-center text-center space-y-8 max-w-6xl w-full min-h-[90vh]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span className="mr-2">✨</span> Introducing CollabSphere{" "}
            <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <AuroraText className="text-5xl md:text-7xl font-bold leading-tight">
            Collaborate Without
            <br />
            Boundaries 🌐
          </AuroraText>
        </motion.div>

        <motion.p
          className="text-muted-foreground max-w-2xl text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          The ultimate workspace platform for modern teams. Connect, chat, and
          collaborate in real-time with elegant tools built for productivity.
          Experience the future of team communication today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {token ? (
            <Link to="/workspaces">
              <Button size="lg" className="px-8 py-6 text-lg">
                Go to Workspaces
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/register">
                <Button size="lg" className="px-8 py-6 text-lg">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            14-day free trial
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Cancel anytime
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="w-full py-16 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="w-full py-20 px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Modern Teams
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to collaborate effectively, all in one
              beautiful platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Use Cases Section */}
      <motion.div
        className="w-full py-20 px-8 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Every Team
            </h2>
            <p className="text-muted-foreground text-lg">
              From startups to enterprises, CollabSphere scales with you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-md transition-all duration-300 text-center">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                      {useCase.icon}
                    </div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {useCase.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Additional Features Grid */}
      <motion.div
        className="w-full py-20 px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              And So Much More
            </h2>
            <p className="text-muted-foreground text-lg">
              Packed with features to supercharge your team's productivity
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <div className="text-primary">{feature.icon}</div>
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="w-full py-20 px-8 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by Teams Worldwide
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our users have to say about CollabSphere
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">
                      "{testimonial.content}"
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="w-full py-24 px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Team Collaboration?
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using CollabSphere to work smarter,
              faster, and more connected than ever before.
            </p>
            {!token && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/register">
                  <Button size="lg" className="px-10 py-6 text-lg">
                    Start Free Trial
                    <Rocket className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-10 py-6 text-lg">
                  Schedule Demo
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;