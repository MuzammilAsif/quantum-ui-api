import 'dotenv/config';
import { db } from './index';
import { libraries, categories, components, implementations } from './schema';

async function seed() {
  console.log('Seeding database...');

  // ── Clean existing data ──────────────────────────────────────────────────
  await db.delete(implementations);
  await db.delete(components);
  await db.delete(categories);
  await db.delete(libraries);

  // ── Libraries ────────────────────────────────────────────────────────────
  await db.insert(libraries).values([
    {
      id: 'quantum',
      name: 'Quantum UI',
      description: 'Our own hand-crafted components built for modern applications',
      icon: 'Zap',
      website: 'https://quantumui.dev',
      color: '#8b5cf6',
      textColor: '#ffffff',
      isActive: true,
      isOfficial: true,
      componentCount: 0,
    },
    {
      id: 'shadcn',
      name: 'shadcn/ui',
      description: 'Beautifully designed components built with Radix UI and Tailwind CSS',
      icon: 'Layers',
      website: 'https://ui.shadcn.com',
      color: '#000000',
      textColor: '#ffffff',
      isActive: true,
      isOfficial: false,
      componentCount: 0,
    },
    {
      id: 'magicui',
      name: 'Magic UI',
      description: 'Beautiful animated React components for modern web applications',
      icon: 'Sparkles',
      website: 'https://magicui.design',
      color: '#6366f1',
      textColor: '#ffffff',
      isActive: true,
      isOfficial: false,
      componentCount: 0,
    },
    {
      id: 'aceternity',
      name: 'Aceternity UI',
      description: 'Trendy components that will make your website look like a 10x developer built it',
      icon: 'Star',
      website: 'https://ui.aceternity.com',
      color: '#000000',
      textColor: '#ffffff',
      isActive: true,
      isOfficial: false,
      componentCount: 0,
    },
    {
      id: 'mantine',
      name: 'Mantine',
      description: 'A fully featured React components library with 100+ components',
      icon: 'LayoutDashboard',
      website: 'https://mantine.dev',
      color: '#339af0',
      textColor: '#ffffff',
      isActive: true,
      isOfficial: false,
      componentCount: 0,
    },
  ]);

  // ── Categories ────────────────────────────────────────────────────────────
  await db.insert(categories).values([
    // Quantum UI
    { id: 'quantum-buttons',    libraryId: 'quantum',    name: 'Buttons',      slug: 'buttons',    icon: 'MousePointerClick', order: 1, componentCount: 0 },
    { id: 'quantum-cards',      libraryId: 'quantum',    name: 'Cards',        slug: 'cards',      icon: 'LayoutDashboard',   order: 2, componentCount: 0 },
    { id: 'quantum-inputs',     libraryId: 'quantum',    name: 'Inputs',       slug: 'inputs',     icon: 'TextCursorInput',   order: 3, componentCount: 0 },
    { id: 'quantum-navigation', libraryId: 'quantum',    name: 'Navigation',   slug: 'navigation', icon: 'Navigation',        order: 4, componentCount: 0 },
    { id: 'quantum-modals',     libraryId: 'quantum',    name: 'Modals',       slug: 'modals',     icon: 'AppWindow',         order: 5, componentCount: 0 },
    { id: 'quantum-alerts',     libraryId: 'quantum',    name: 'Alerts',       slug: 'alerts',     icon: 'BellRing',          order: 6, componentCount: 0 },
    // shadcn/ui
    { id: 'shadcn-buttons',     libraryId: 'shadcn',     name: 'Buttons',      slug: 'buttons',    icon: 'MousePointerClick', order: 1, componentCount: 0 },
    { id: 'shadcn-cards',       libraryId: 'shadcn',     name: 'Cards',        slug: 'cards',      icon: 'LayoutDashboard',   order: 2, componentCount: 0 },
    { id: 'shadcn-inputs',      libraryId: 'shadcn',     name: 'Inputs',       slug: 'inputs',     icon: 'TextCursorInput',   order: 3, componentCount: 0 },
    { id: 'shadcn-alerts',      libraryId: 'shadcn',     name: 'Alerts',       slug: 'alerts',     icon: 'BellRing',          order: 4, componentCount: 0 },
    // Magic UI
    { id: 'magicui-buttons',    libraryId: 'magicui',    name: 'Buttons',      slug: 'buttons',    icon: 'MousePointerClick', order: 1, componentCount: 0 },
    { id: 'magicui-text',       libraryId: 'magicui',    name: 'Text Effects', slug: 'text',       icon: 'Type',              order: 2, componentCount: 0 },
    { id: 'magicui-backgrounds',libraryId: 'magicui',    name: 'Backgrounds',  slug: 'backgrounds',icon: 'Layers',            order: 3, componentCount: 0 },
    // Aceternity UI
    { id: 'aceternity-cards',   libraryId: 'aceternity', name: 'Cards',        slug: 'cards',      icon: 'LayoutDashboard',   order: 1, componentCount: 0 },
    { id: 'aceternity-effects', libraryId: 'aceternity', name: 'Effects',      slug: 'effects',    icon: 'Sparkles',          order: 2, componentCount: 0 },
    { id: 'aceternity-backgrounds',libraryId: 'aceternity',name:'Backgrounds', slug: 'backgrounds',icon: 'Layers',            order: 3, componentCount: 0 },
    // Mantine
    { id: 'mantine-buttons',    libraryId: 'mantine',    name: 'Buttons',      slug: 'buttons',    icon: 'MousePointerClick', order: 1, componentCount: 0 },
    { id: 'mantine-cards',      libraryId: 'mantine',    name: 'Cards',        slug: 'cards',      icon: 'LayoutDashboard',   order: 2, componentCount: 0 },
    { id: 'mantine-inputs',     libraryId: 'mantine',    name: 'Inputs',       slug: 'inputs',     icon: 'TextCursorInput',   order: 3, componentCount: 0 },
  ]);

  // ── Components + Implementations ─────────────────────────────────────────

  // ── QUANTUM UI ────────────────────────────────────────────────────────────

  const qBtn1 = await db.insert(components).values({
    libraryId: 'quantum', categoryId: 'quantum-buttons',
    name: 'Primary Button', slug: 'primary-button',
    description: 'A clean primary action button with smooth hover effect',
    difficulty: 'Beginner', styleTag: 'Modern', isNew: false,
    tags: ['button', 'primary', 'cta', 'action'],
    author: 'Quantum UI', version: '1.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: qBtn1[0].id,
    framework: 'react', language: 'tsx',
    code: `<button className="px-4 py-2 rounded-md bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 active:scale-95 transition-all duration-150">
  Button
</button>`,
    previewHtml: `<button class="px-4 py-2 rounded-md bg-violet-500 text-white text-sm font-medium" style="cursor:pointer;">Button</button>`,
    dependencies: [],
    notes: 'Uses Tailwind CSS utility classes.',
  });

  await db.insert(implementations).values({
    componentId: qBtn1[0].id,
    framework: 'html', language: 'html',
    code: `<button class="px-4 py-2 rounded-md bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition-all">
  Button
</button>`,
    previewHtml: `<button class="px-4 py-2 rounded-md bg-violet-500 text-white text-sm font-medium" style="cursor:pointer;">Button</button>`,
    dependencies: ['tailwindcss'],
    notes: 'Requires Tailwind CSS.',
  });

  const qBtn2 = await db.insert(components).values({
    libraryId: 'quantum', categoryId: 'quantum-buttons',
    name: 'Gradient Button', slug: 'gradient-button',
    description: 'A vibrant gradient button with purple to blue transition',
    difficulty: 'Beginner', styleTag: 'Gradient', isNew: true,
    tags: ['button', 'gradient', 'colorful', 'cta'],
    author: 'Quantum UI', version: '1.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: qBtn2[0].id,
    framework: 'react', language: 'tsx',
    code: `<button className="px-4 py-2 rounded-md bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all duration-150">
  Get Started
</button>`,
    previewHtml: `<button style="padding:8px 16px;border-radius:6px;background:linear-gradient(to right,#8b5cf6,#3b82f6);color:white;font-size:14px;font-weight:500;cursor:pointer;border:none;">Get Started</button>`,
    dependencies: [],
  });

  const qCard1 = await db.insert(components).values({
    libraryId: 'quantum', categoryId: 'quantum-cards',
    name: 'Basic Card', slug: 'basic-card',
    description: 'A clean content card with title and description',
    difficulty: 'Beginner', styleTag: 'Minimal',
    tags: ['card', 'container', 'basic', 'surface'],
    author: 'Quantum UI', version: '1.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: qCard1[0].id,
    framework: 'react', language: 'tsx',
    code: `<div className="p-4 rounded-lg border border-gray-700 bg-gray-800/50">
  <h3 className="text-sm font-semibold text-gray-200">Card Title</h3>
  <p className="text-xs text-gray-500 mt-1">
    Card description text goes here.
  </p>
</div>`,
    previewHtml: `<div style="padding:16px;border-radius:8px;border:1px solid #374151;background:rgba(31,41,55,0.5);width:200px;"><h3 style="color:#e5e7eb;font-size:14px;font-weight:600;margin:0 0 4px;">Card Title</h3><p style="color:#6b7280;font-size:12px;margin:0;">Card description text goes here.</p></div>`,
    dependencies: [],
  });

  const qInput1 = await db.insert(components).values({
    libraryId: 'quantum', categoryId: 'quantum-inputs',
    name: 'Basic Input', slug: 'basic-input',
    description: 'A clean text input with focus styles',
    difficulty: 'Beginner', styleTag: 'Minimal',
    tags: ['input', 'text', 'form', 'field'],
    author: 'Quantum UI', version: '1.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: qInput1[0].id,
    framework: 'react', language: 'tsx',
    code: `<input
  type="text"
  placeholder="Enter text..."
  className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-gray-300 text-sm outline-none focus:border-violet-500 transition-colors"
/>`,
    previewHtml: `<input type="text" placeholder="Enter text..." style="width:200px;padding:8px 12px;border-radius:6px;border:1px solid #4b5563;background:#1f2937;color:#d1d5db;font-size:14px;outline:none;" />`,
    dependencies: [],
  });

  // ── SHADCN/UI ─────────────────────────────────────────────────────────────

  const sBtn1 = await db.insert(components).values({
    libraryId: 'shadcn', categoryId: 'shadcn-buttons',
    name: 'Button', slug: 'button',
    description: 'The core shadcn/ui button with multiple variant support',
    difficulty: 'Beginner', styleTag: 'Modern',
    tags: ['button', 'shadcn', 'radix', 'variant'],
    author: 'shadcn', version: '2.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: sBtn1[0].id,
    framework: 'react', language: 'tsx',
    code: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}`,
    previewHtml: `<div style="display:flex;gap:8px;flex-wrap:wrap;"><button style="padding:8px 16px;border-radius:6px;background:#18181b;color:#fafafa;font-size:14px;font-weight:500;border:none;cursor:pointer;">Default</button><button style="padding:8px 16px;border-radius:6px;background:#f4f4f5;color:#18181b;font-size:14px;font-weight:500;border:none;cursor:pointer;">Secondary</button><button style="padding:8px 16px;border-radius:6px;background:#ef4444;color:#fafafa;font-size:14px;font-weight:500;border:none;cursor:pointer;">Destructive</button></div>`,
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
    notes: 'Requires shadcn/ui setup: npx shadcn-ui@latest add button',
  });

  const sCard1 = await db.insert(components).values({
    libraryId: 'shadcn', categoryId: 'shadcn-cards',
    name: 'Card', slug: 'card',
    description: 'A flexible card component with header, content, and footer sections',
    difficulty: 'Beginner', styleTag: 'Minimal',
    tags: ['card', 'shadcn', 'container', 'layout'],
    author: 'shadcn', version: '2.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: sCard1[0].id,
    framework: 'react', language: 'tsx',
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your project will be created instantly.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Deploy</Button>
      </CardFooter>
    </Card>
  )
}`,
    previewHtml: `<div style="width:280px;border-radius:8px;border:1px solid #e4e4e7;background:#fff;padding:24px;"><div style="margin-bottom:16px;"><h3 style="font-size:16px;font-weight:600;color:#18181b;margin:0 0 4px;">Create project</h3><p style="font-size:14px;color:#71717a;margin:0;">Deploy your new project in one-click.</p></div><p style="font-size:13px;color:#71717a;margin:0 0 16px;">Your project will be created instantly.</p><button style="width:100%;padding:8px;border-radius:6px;background:#18181b;color:#fff;font-size:14px;border:none;cursor:pointer;">Deploy</button></div>`,
    dependencies: [],
    notes: 'Requires shadcn/ui setup: npx shadcn-ui@latest add card',
  });

  // ── MAGIC UI ──────────────────────────────────────────────────────────────

  const mBtn1 = await db.insert(components).values({
    libraryId: 'magicui', categoryId: 'magicui-buttons',
    name: 'Shimmer Button', slug: 'shimmer-button',
    description: 'A button with a beautiful shimmer animation effect',
    difficulty: 'Intermediate', styleTag: 'Modern', isNew: true,
    tags: ['button', 'shimmer', 'animation', 'magic', 'effect'],
    author: 'Magic UI', version: '1.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: mBtn1[0].id,
    framework: 'react', language: 'tsx',
    code: `import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

interface ShimmerButtonProps {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "rgba(0, 0, 0, 1)",
  className,
  children,
  ...props
}) => {
  return (
    <button
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)]",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "-z-30 blur-[2px]",
          "absolute inset-0 overflow-visible [container-type:size]",
        )}
      >
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </div>
      </div>
      {children}
      <div
        className={cn(
          "insert-0 absolute size-full",
          "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
          "transform-gpu transition-all duration-300 ease-in-out",
          "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
          "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
        )}
      />
    </button>
  );
};`,
    previewHtml: `<button style="padding:12px 24px;border-radius:100px;background:#000;color:#fff;font-size:14px;font-weight:500;border:1px solid rgba(255,255,255,0.2);cursor:pointer;position:relative;overflow:hidden;">✨ Shimmer Button</button>`,
    dependencies: ['clsx', 'tailwind-merge'],
    notes: 'Requires the shimmer animation to be added to your tailwind.config.js. See Magic UI docs.',
  });

  const mText1 = await db.insert(components).values({
    libraryId: 'magicui', categoryId: 'magicui-text',
    name: 'Animated Gradient Text', slug: 'animated-gradient-text',
    description: 'Text with a smooth animated gradient color effect',
    difficulty: 'Beginner', styleTag: 'Gradient', isNew: true,
    tags: ['text', 'gradient', 'animation', 'heading', 'magic'],
    author: 'Magic UI', version: '1.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: mText1[0].id,
    framework: 'react', language: 'tsx',
    code: `import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        )}
      />
      {children}
    </div>
  );
}`,
    previewHtml: `<div style="display:inline-flex;padding:6px 16px;border-radius:16px;background:rgba(255,255,255,0.4);border:1px solid rgba(255,170,64,0.5);font-size:14px;font-weight:500;background:linear-gradient(to right,rgba(255,170,64,0.3),rgba(156,64,255,0.3),rgba(255,170,64,0.3));">✨ Animated Gradient Text</div>`,
    dependencies: ['clsx', 'tailwind-merge'],
  });

  // ── ACETERNITY UI ─────────────────────────────────────────────────────────

  const aCard1 = await db.insert(components).values({
    libraryId: 'aceternity', categoryId: 'aceternity-cards',
    name: '3D Card Effect', slug: '3d-card-effect',
    description: 'A card with a smooth 3D tilt effect on mouse movement',
    difficulty: 'Advanced', styleTag: 'Modern', isNew: true,
    tags: ['card', '3d', 'tilt', 'interactive', 'mouse', 'aceternity'],
    author: 'Aceternity UI', version: '1.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: aCard1[0].id,
    framework: 'react', language: 'tsx',
    code: `"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <div className="h-60 w-full bg-gradient-to-br from-violet-500 to-blue-600 rounded-xl" />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="#"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}`,
    previewHtml: `<div style="width:280px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:#000;padding:24px;color:#fff;"><h3 style="font-size:18px;font-weight:700;margin:0 0 8px;">Make things float</h3><p style="font-size:13px;color:#a1a1aa;margin:0 0 16px;">Hover to unleash CSS perspective</p><div style="height:120px;border-radius:8px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);"></div></div>`,
    dependencies: ['framer-motion'],
    notes: 'Requires Aceternity UI setup. Visit ui.aceternity.com/components/3d-card-effect',
  });

  const aEffect1 = await db.insert(components).values({
    libraryId: 'aceternity', categoryId: 'aceternity-effects',
    name: 'Spotlight', slug: 'spotlight',
    description: 'A spotlight cursor effect that follows mouse movement on a dark background',
    difficulty: 'Intermediate', styleTag: 'Dark', isNew: true,
    tags: ['spotlight', 'cursor', 'effect', 'dark', 'background', 'aceternity'],
    author: 'Aceternity UI', version: '1.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: aEffect1[0].id,
    framework: 'react', language: 'tsx',
    code: `"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight";

export function SpotlightPreview() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Spotlight is the new <br /> way to shine.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Spotlight effect to make your hero section stand out.
        </p>
      </div>
    </div>
  );
}`,
    previewHtml: `<div style="width:100%;height:160px;border-radius:8px;background:radial-gradient(ellipse at 30% 40%,rgba(255,255,255,0.15) 0%,transparent 60%),#000;display:flex;align-items:center;justify-content:center;"><div style="text-align:center;"><h2 style="font-size:24px;font-weight:700;color:#fff;margin:0 0 8px;background:linear-gradient(to bottom,#f5f5f5,#a1a1aa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Spotlight Effect</h2><p style="color:#a1a1aa;font-size:13px;margin:0;">Move your cursor to see the effect</p></div></div>`,
    dependencies: ['framer-motion'],
    notes: 'Requires Aceternity UI setup. Visit ui.aceternity.com/components/spotlight',
  });

  // ── MANTINE UI ────────────────────────────────────────────────────────────

  const mnBtn1 = await db.insert(components).values({
    libraryId: 'mantine', categoryId: 'mantine-buttons',
    name: 'Button Group', slug: 'button-group',
    description: 'A group of Mantine buttons with different variants',
    difficulty: 'Beginner', styleTag: 'Modern',
    tags: ['button', 'group', 'mantine', 'variant'],
    author: 'Mantine', version: '7.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: mnBtn1[0].id,
    framework: 'react', language: 'tsx',
    code: `import { Button, Group } from '@mantine/core';

export function ButtonsGroup() {
  return (
    <Group>
      <Button variant="filled">Filled</Button>
      <Button variant="light">Light</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="transparent">Transparent</Button>
    </Group>
  );
}`,
    previewHtml: `<div style="display:flex;gap:8px;flex-wrap:wrap;"><button style="padding:8px 16px;border-radius:6px;background:#339af0;color:#fff;font-size:14px;font-weight:500;border:none;cursor:pointer;">Filled</button><button style="padding:8px 16px;border-radius:6px;background:#e7f5ff;color:#339af0;font-size:14px;font-weight:500;border:none;cursor:pointer;">Light</button><button style="padding:8px 16px;border-radius:6px;background:transparent;color:#339af0;font-size:14px;font-weight:500;border:1px solid #339af0;cursor:pointer;">Outline</button></div>`,
    dependencies: ['@mantine/core', '@mantine/hooks'],
    notes: 'Requires Mantine provider setup. Visit mantine.dev/getting-started/',
  });

  const mnCard1 = await db.insert(components).values({
    libraryId: 'mantine', categoryId: 'mantine-cards',
    name: 'Stats Card', slug: 'stats-card',
    description: 'A Mantine card displaying a statistic with icon and trend indicator',
    difficulty: 'Intermediate', styleTag: 'Modern',
    tags: ['card', 'stats', 'mantine', 'metric', 'dashboard'],
    author: 'Mantine', version: '7.0.0',
  }).returning();

  await db.insert(implementations).values({
    componentId: mnCard1[0].id,
    framework: 'react', language: 'tsx',
    code: `import { Card, Text, Group, Badge, rem } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';

export function StatsCard() {
  return (
    <Card withBorder p="md" radius="md" w={280}>
      <Group justify="space-between">
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          Monthly Revenue
        </Text>
        <Badge color="teal" variant="light">
          +18%
        </Badge>
      </Group>
      <Group align="flex-end" gap="xs" mt={20}>
        <Text fz="3rem" fw={700} lh={1}>
          $12,450
        </Text>
        <IconArrowUpRight
          size={28}
          stroke={1.5}
          color="var(--mantine-color-teal-6)"
          style={{ marginBottom: rem(4) }}
        />
      </Group>
      <Text fz="xs" c="dimmed" mt={7}>
        Compared to previous month
      </Text>
    </Card>
  );
}`,
    previewHtml: `<div style="width:250px;border-radius:8px;border:1px solid #dee2e6;background:#fff;padding:20px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;"><span style="font-size:11px;text-transform:uppercase;font-weight:700;color:#868e96;">Monthly Revenue</span><span style="padding:2px 8px;border-radius:4px;background:#c3fae8;color:#099268;font-size:12px;font-weight:600;">+18%</span></div><div style="font-size:36px;font-weight:700;color:#212529;margin-bottom:4px;">$12,450</div><div style="font-size:12px;color:#868e96;">Compared to previous month</div></div>`,
    dependencies: ['@mantine/core', '@mantine/hooks', '@tabler/icons-react'],
    notes: 'Requires Mantine and Tabler Icons. Visit mantine.dev',
  });

  console.log('Seed complete. Data inserted successfully.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});