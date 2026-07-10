import type { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string;
  date: string;
  updated?: string;
  readingMinutes: number;
  cover: string;
  coverAlt: string;
  excerpt: string;
  tags: string[];
  related: string[];
  content: ReactNode;
};
