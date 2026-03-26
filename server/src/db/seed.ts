import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

async function seed() {
    console.log("🌱 Seeding demo data...\n");

    // ── PROJECTS ────────────────────────────────────────────────────
    const projects = await db.insert(schema.projectsTable).values([
        {
            title: "Portfolio Website",
            description: "A full-stack personal portfolio built with React, TypeScript, Express and Neon PostgreSQL. Features a CMS-style admin panel for managing all content.",
            techStack: ["React", "TypeScript", "Express", "PostgreSQL", "Drizzle ORM", "Cloudinary"],
            liveUrl: "https://yourdomain.com",
            githubUrl: "https://github.com/Kassy-ux/portfolio",
            featured: true,
            order: 1,
        },
        {
            title: "E-Commerce Platform",
            description: "A scalable online store with product management, cart, checkout, and Stripe payment integration. Built with Next.js and a headless CMS.",
            techStack: ["Next.js", "Stripe", "Tailwind CSS", "Prisma", "PostgreSQL"],
            liveUrl: "https://shop.yourdomain.com",
            githubUrl: "https://github.com/Kassy-ux/ecommerce",
            featured: true,
            order: 2,
        },
    ]).returning();
    console.log(`✅ Projects seeded: ${projects.length}`);

    // ── SKILLS ──────────────────────────────────────────────────────
    const skills = await db.insert(schema.skillsTable).values([
        { name: "TypeScript", category: "Frontend", order: 1 },
        { name: "React", category: "Frontend", order: 2 },
        { name: "Node.js", category: "Backend", order: 5 },
        { name: "PostgreSQL", category: "Backend", order: 7 },
    ]).returning();
    console.log(`✅ Skills seeded: ${skills.length}`);

    // ── CERTIFICATIONS ──────────────────────────────────────────────
    const certifications = await db.insert(schema.certificationsTable).values([
        {
            issuer: "Google",
            certificateName: "Professional Cloud Architect",
            description: "Demonstrated proficiency in designing, developing, and managing robust, secure, scalable, highly available, and dynamic solutions on Google Cloud Platform.",
            issueDate: "Jan 2024",
            expiryDate: "Jan 2026",
            certificateUrl: "https://www.coursera.org/account/accomplishments/professional-cert/...",
            order: 1,
        },
        {
            issuer: "Meta",
            certificateName: "Front-End Developer Professional Certificate",
            description: "Comprehensive training in React, JavaScript, CSS, and UX design principles for building modern web applications.",
            issueDate: "June 2023",
            expiryDate: null,
            certificateUrl: "https://www.coursera.org/account/accomplishments/professional-cert/...",
            order: 2,
        },
        {
            issuer: "Teach2Give",
            certificateName: "Full Stack Development Certificate",
            description: "Intensive 3-month programme focused on software engineering best practices, agile methodologies, and full-stack development.",
            issueDate: "July 2024",
            expiryDate: null,
            certificateUrl: null,
            order: 3,
        },
    ]).returning();
    console.log(`✅ Certifications seeded: ${certifications.length}`);

    // ── TESTIMONIALS ────────────────────────────────────────────────
    const testimonials = await db.insert(schema.testimonialsTable).values([
        {
            name: "Alice Mwangi",
            role: "CEO, Startup Ltd",
            message: "Stancy delivered our platform on time and exceeded every expectation. The code quality and communication were exceptional.",
            rating: 5,
            order: 1,
        },
        {
            name: "Brian Otieno",
            role: "Product Manager, Digital Agency",
            message: "Working with Stancy was a pleasure. She quickly understood our requirements and proposed smart solutions we hadn't considered.",
            rating: 5,
            order: 2,
        },
    ]).returning();
    console.log(`✅ Testimonials seeded: ${testimonials.length}`);

    // ── EDUCATION ───────────────────────────────────────────────────
    const education = await db.insert(schema.educationTable).values([
        {
            institution: "University of Nairobi",
            degree: "BSc. Computer Science",
            description: "Focused on software engineering, algorithms and data structures, and distributed systems.",
            startDate: "2018-09",
            endDate: "2022-06",
            order: 1,
        },
    ]).returning();
    console.log(`✅ Education seeded: ${education.length}`);

    console.log("\n🎉 All demo data seeded successfully!");
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
});
