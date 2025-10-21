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
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import React from "react";

// Fallback BorderBeam component if Magic UI version has issues
const BorderBeam = ({ 
  size = 200, 
  duration = 15, 
  delay = 0,
  colorFrom = "from-blue-500",
  colorTo = "to-purple-500"
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
      <motion.div
        className={cn(
          "absolute h-20 bg-gradient-to-r",
          colorFrom,
          colorTo,
          "blur-xl opacity-50"
        )}
        style={{
          width: `${size}px`,
          left: -size,
          top: -40,
        }}
        animate={{
          left: ["0%", "100%"],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Fallback Meteors component
const Meteors = ({ number = 20 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(number)].map((_, idx) => (
        <motion.span
          key={idx}
          className="absolute h-0.5 w-0.5 rotate-[215deg] bg-gradient-to-r from-blue-500 to-purple-500"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, -80],
            y: [0, 80],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          <div className="absolute inset-0 w-16 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />
        </motion.span>
      ))}
    </div>
  );
};

// Fallback DotPattern component
const DotPattern = ({ className }) => {
  return (
    <div className={cn("fixed inset-0", className)}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" className="fill-muted-foreground/20" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  );
};

// Fallback ShimmerButton component
const ShimmerButton = ({ children, className, ...props }) => {
  return (
    <Button
      className={cn(
        "relative overflow-hidden group",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Button>
  );
};

// Fallback SparklesText component
const SparklesText = ({ text, className, sparklesCount = 8 }) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      {[...Array(sparklesCount)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </motion.span>
      ))}
    </div>
  );
};

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
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Engineering Lead",
      company: "DevStudio",
      content:
        "Best collaboration tool we've used. Clean interface and powerful features that actually work.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Startup Founder",
      company: "InnovateLabs",
      content:
        "Helped us scale from 5 to 50 people without missing a beat. Highly recommended!",
      rating: 5,
      avatar: "ER",
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
    <div className="flex flex-col items-center w-full relative overflow-hidden">
      {/* Background Pattern */}
      <DotPattern
        className={cn(
          "fixed inset-0 -z-10",
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      />

      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center p-8 justify-center text-center space-y-8 max-w-6xl w-full min-h-[90vh] relative z-10"
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
            <Sparkles className="w-3 h-3 mr-2" /> Introducing CollabSphere{" "}
            <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <SparklesText 
            text="Collaborate Without Boundaries"
            className="text-5xl md:text-7xl font-bold leading-tight"
            sparklesCount={10}
          />
          <div className="text-5xl md:text-7xl font-bold mt-2">🌐</div>
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
          className="flex flex-col sm:flex-row gap-4"
        >
          {token ? (
            <Link to="/workspaces">
              <ShimmerButton size="lg" className="px-8 py-6 text-lg">
                Go to Workspaces
                <ArrowRight className="ml-2 w-5 h-5" />
              </ShimmerButton>
            </Link>
          ) : (
            <>
              <Link to="/auth/register">
                <ShimmerButton size="lg" className="px-8 py-6 text-lg">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </ShimmerButton>
              </Link>
              <Link to="/auth/login">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  Login
                </Button>
              </Link>
            </>
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
        className="w-full py-16 bg-muted/30 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
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
        className="w-full py-20 px-8 relative"
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
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 relative overflow-hidden group">
                  <BorderBeam size={250} duration={12} delay={index * 2} />
                  <CardHeader className="relative z-10">
                    <motion.div 
                      className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
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
        className="w-full py-20 px-8 bg-muted/30 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
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
                <Card className="h-full hover:shadow-md transition-all duration-300 text-center relative overflow-hidden">
                  <Meteors number={15} />
                  <CardHeader className="relative z-10">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {useCase.icon}
                    </motion.div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
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
                whileHover={{ y: -4 }}
              >
                <motion.div 
                  className="text-primary"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="w-full py-20 px-8 bg-muted/30 relative overflow-hidden"
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
                whileHover={{ y: -8 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <BorderBeam size={200} duration={10} delay={index * 3} />
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div className="flex-1">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
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
                  <CardContent className="relative z-10">
                    <div className="text-sm text-muted-foreground">
                      {testimonial.company}
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
        className="w-full py-24 px-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
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
                  <ShimmerButton size="lg" className="px-10 py-6 text-lg">
                    Start Free Trial
                    <Rocket className="ml-2 w-5 h-5" />
                  </ShimmerButton>
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