const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../.env") });

const User = require("../models/User");
const Product = require("../models/Product");
const Blog = require("../models/Blog");
const Gallery = require("../models/Gallery");
const CaseStudy = require("../models/CaseStudy");
const Partner = require("../models/Partner");
const Testimonial = require("../models/Testimonial");
const Course = require("../models/Course");
const Resource = require("../models/Resource");

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB for seeding...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    // Clear existing data (optional, let's clear to avoid duplication)
    console.log("Cleaning database collections...");
    await User.deleteMany({});
    await Product.deleteMany({});
    await Blog.deleteMany({});
    await Gallery.deleteMany({});
    await CaseStudy.deleteMany({});
    await Partner.deleteMany({});
    await Testimonial.deleteMany({});
    await Course.deleteMany({});
    await Resource.deleteMany({});

    console.log("Database cleaned. Seeding starting...");

    // 1. Seed Admin User
    const adminUser = await User.create({
      name: "RoboLearn Admin",
      email: "admin@robolearn.in",
      password: "ChangeMe123!",
      role: "admin",
      isActive: true,
    });
    console.log("✅ Admin User seeded (admin@robolearn.in / ChangeMe123!)");

    // 2. Seed Products
    const products = [
      {
        name: "Kids Robotics Kit",
        slug: "kids-robotics-kit-" + Date.now(),
        category: "robotics-kit",
        level: "beginner",
        price: 2499,
        originalPrice: 3499,
        description: "Introductory physical computing building blocks, snap-fit chassis assembly, no soldering. Designed to teach basic mechanical construction, loops, and condition-based operations.",
        shortDescription: "Visual build block-based beginner hardware robotics kit.",
        images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"],
        features: ["Safe snap-fit parts", "Detailed graphical step-by-step instruction app", "10+ interactive builds"],
        inStock: true,
        isFeatured: true,
      },
      {
        name: "Arduino Learning Kit",
        slug: "arduino-learning-kit-" + Date.now(),
        category: "robotics-kit",
        level: "intermediate",
        price: 3999,
        originalPrice: 4999,
        description: "Arduino core microcontroller board, multi-sensor shield array, breadboard connections. Perfect for diving deep into digital/analog IO interfaces and programming logic.",
        shortDescription: "Breadboard-friendly microcontroller programming kit.",
        images: ["https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=600&q=80"],
        features: ["Genuine ATmega328P board", "No-soldering required prototype wires", "Over 15 distinct electrical components"],
        inStock: true,
        isFeatured: true,
      },
      {
        name: "AI Starter Kit",
        slug: "ai-starter-kit-" + Date.now(),
        category: "ai-kit",
        level: "advanced",
        price: 5499,
        originalPrice: 6999,
        description: "Computer vision and machine learning starter kits with ESP32 high-res camera shield. Program neural networks to perform visual target classification.",
        shortDescription: "Learn machine learning models directly on microcontroller hardware.",
        images: ["https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=600&q=80"],
        features: ["Esp32-cam high resolution module", "Pre-trained object detection code bases", "USB interface programmer"],
        inStock: true,
        isFeatured: true,
      },
      {
        name: "IoT Experiment Kit",
        slug: "iot-experiment-kit-" + Date.now(),
        category: "iot-kit",
        level: "advanced",
        price: 4899,
        originalPrice: 5999,
        description: "Cloud communications node module with temperature, light, and soil humidity telemetry. Build automation models that send alerts to your web app dashboard.",
        shortDescription: "Smart wireless telemetry and internet control module.",
        images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"],
        features: ["WiFi connected board", "Multiple sensor telemetry modules", "MQTT integrations enabled"],
        inStock: true,
        isFeatured: false,
      },
      {
        name: "Ultrasonic Distance Sensor HC-SR04",
        slug: "ultrasonic-distance-sensor-hc-sr04-" + Date.now(),
        category: "experimental-tools",
        level: "beginner",
        price: 180,
        description: "High accuracy ultrasonic distance measuring sensor compatible with Arduino and Raspberry Pi. Offers stable measurement from 2cm to 400cm.",
        shortDescription: "High-precision distance measurement sensor.",
        images: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"],
        inStock: true,
        isFeatured: false,
      },
      {
        name: "Digital Multimeter & Temperature Probe",
        slug: "digital-multimeter-temperature-probe-" + Date.now(),
        category: "experimental-tools",
        level: "intermediate",
        price: 1450,
        description: "Essential lab measurement tool for diagnostic testing of voltages, currents, and resistance parameters.",
        shortDescription: "Professional-grade lab diagnostic meter.",
        images: ["https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"],
        inStock: true,
        isFeatured: false,
      }
    ];

    await Product.create(products);
    console.log(`✅ Seeded ${products.length} Products`);

    // 3. Seed Blogs
    const blogs = [
      {
        title: "The Future of STEM Education in Indian Schools",
        slug: "future-of-stem-education-in-indian-schools",
        excerpt: "Why hands-on robotics is replacing rote learning in the classroom under NEP 2020.",
        content: "<p>NEP 2020 has placed a huge emphasis on practical coding, logical thinking and experiential learning. By integrating hands-on robotics kits, schools can empower students to problem solve and think analytically rather than just memorize textbook diagrams.</p>",
        category: "education",
        coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        author: adminUser._id,
        tags: ["STEM", "NEP2020", "Robotics"],
        isPublished: true,
        publishedAt: new Date(),
        readTime: 4,
      },
      {
        title: "Starting with Microcontrollers: Arduino vs Raspberry Pi",
        slug: "starting-with-microcontrollers-arduino-vs-raspberry-pi",
        excerpt: "A beginner-friendly guide to choosing the right controller board for school science projects.",
        content: "<p>Which board is right for you? Arduino is a microcontroller ideal for simple sensors and electrical control loops, whereas Raspberry Pi is a single-board computer meant for high-performance computing, cameras, and databases.</p>",
        category: "robotics",
        coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
        author: adminUser._id,
        tags: ["Arduino", "RaspberryPi", "DIY"],
        isPublished: true,
        publishedAt: new Date(),
        readTime: 6,
      }
    ];

    await Blog.create(blogs);
    console.log(`✅ Seeded ${blogs.length} Blog posts`);

    // 4. Seed Gallery Items
    const galleryItems = [
      {
        title: "Smart Robotics Lab setup at Sunrise School",
        description: "Fully configured workstation with soldering tools, heavy equipment, and Arduino testing boards.",
        imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80",
        category: "labs",
        schoolName: "Sunrise Public School",
        location: "Mumbai",
        date: new Date(),
        isActive: true,
      },
      {
        title: "WRO India Regionals Competition Preparation",
        description: "Students building and calibrating autonomous vinyl board robot runs during summer prep camps.",
        imageUrl: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=600&q=80",
        category: "competitions",
        schoolName: "Delhi Public School",
        location: "Delhi NCR",
        date: new Date(),
        isActive: true,
      },
      {
        title: "Teacher STEM Training Certification Workshop",
        description: "School teachers learning block-coding structures and electronic circuitry schemas during certification camp.",
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
        category: "workshops",
        schoolName: "Apex Global Academy",
        location: "Pune",
        date: new Date(),
        isActive: true,
      }
    ];

    await Gallery.create(galleryItems);
    console.log(`✅ Seeded ${galleryItems.length} Gallery items`);

    // 5. Seed Case Studies
    const caseStudies = [
      {
        schoolName: "A.V.M. International School",
        location: "Bhilwara, Rajasthan",
        coverImage: "https://images.unsplash.com/photo-1588072401702-f150f49e637f?auto=format&fit=crop&w=600&q=80",
        problem: "Lack of digital infrastructure and structured coding syllabus meant student learning was outdated.",
        solution: "Established a state-of-the-art RoboLearn Robotics Lab equipped with Arduino kits and age-wise visual code guides.",
        implementation: "Conducted 12 teacher certification camps and ran weekly student practice sessions across grades 5 to 9.",
        result: "Student participation in state hackathons surged, leading to 2 national awards. Over 80% students achieved code certification.",
        metric: "3x STEM Enrollment",
        isPublished: true,
      }
    ];

    await CaseStudy.create(caseStudies);
    console.log(`✅ Seeded ${caseStudies.length} Case Studies`);

    // 6. Seed Partner Schools
    const partners = [
      { schoolName: "Sunrise Public School", city: "Mumbai", logoUrl: "", studentsImpacted: 1200, isActive: true },
      { schoolName: "Delhi Public School", city: "Delhi NCR", logoUrl: "", studentsImpacted: 2400, isActive: true },
      { schoolName: "Apex Global Academy", city: "Pune", logoUrl: "", studentsImpacted: 800, isActive: true }
    ];

    await Partner.create(partners);
    console.log(`✅ Seeded ${partners.length} Partner Schools`);

    // 7. Seed Testimonials
    const testimonials = [
      {
        name: "Dr. Sunita Sharma",
        role: "Principal, Sunrise Public School",
        text: "The RoboLearn team delivered absolute professionalism. Our kids look forward to the robotics workshops every single week!",
        rating: 5,
        photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
        isApproved: true,
        isFeatured: true,
      },
      {
        name: "Rohan Khanna",
        role: "STEM Coordinator, Apex Global Academy",
        text: "Setting up a safe tinkering lab was a daunting task. RoboLearn handled everything from cabling, workstations, to teacher certification seamlessly.",
        rating: 5,
        photoUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&q=80",
        isApproved: true,
        isFeatured: true,
      }
    ];

    await Testimonial.create(testimonials);
    console.log(`✅ Seeded ${testimonials.length} Testimonials`);

    // 8. Seed Courses
    const courses = [
      {
        title: "Beginner Embedded Systems Certification",
        audience: "student",
        level: "Grade 5 - 8",
        description: "Hands-on introduction to logical gates, transistor relays, circuit breadboards and assembly controls.",
        duration: "8 weeks (16 sessions)",
        syllabus: ["Electronics basics", "Breadboard layout setups", "Relays & Switches", "Intro to coding blocks"],
        isActive: true,
      },
      {
        title: "IoT Node Automation and Sensors",
        audience: "student",
        level: "Grade 9 - 12",
        description: "Build custom automation rigs, calibrate soil sensors, establish WiFi node triggers and feed metrics to web charts.",
        duration: "12 weeks (24 sessions)",
        syllabus: ["Microcontrollers deep dive", "Analog sensors calibration", "Wireless communication networks", "MQTT messaging"],
        isActive: true,
      },
      {
        title: "Teacher STEM Tinkering Methodologies",
        audience: "teacher",
        level: "Certified Instructors",
        description: "Intensive pedagogy guidelines to manage school tinkering labs, supervise hardware safety, and run student assessments.",
        duration: "3 days intensive",
        syllabus: ["ATL setup protocols", "Hardware safety checks", "Student evaluation indexes"],
        isActive: true,
      }
    ];

    await Course.create(courses);
    console.log(`✅ Seeded ${courses.length} Courses`);

    // 9. Seed Resources
    const resources = [
      {
        title: "RoboLearn School Tinkering Lab Brochure",
        description: "Detailed overview of lab packages, workstation dimensions, heavy electrical setups, and curriculum mappings.",
        category: "Brochures",
        fileUrl: "https://robolearn-1.onrender.com/uploads/brochure.pdf",
        fileSize: "2.8 MB",
        downloadCount: 42,
      },
      {
        title: "Tinkering Lab Safety Guidelines Binder",
        description: "Detailed school poster copy outlining safety drills, soldering iron handling, electrical switches, and first aid.",
        category: "Setup Guides",
        fileUrl: "https://robolearn-1.onrender.com/uploads/safety_guide.pdf",
        fileSize: "1.2 MB",
        downloadCount: 18,
      }
    ];

    await Resource.create(resources);
    console.log(`✅ Seeded ${resources.length} Resources`);

    console.log("🎉 Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
