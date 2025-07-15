import { ReactNode } from 'react';

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface InteractiveFeaturesProps {
  features: Feature[];
}