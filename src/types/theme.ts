import type { SectionId } from './resume';

export type TemplateId =
  | 'ats-clean'
  | 'modern-dev'
  | 'sidebar'
  | 'dark-mode'
  | 'corporate'
  | 'minimal'
  | 'creative'
  | 'dev-premium';

export type ResumeFont = 'Inter' | 'Arial' | 'Georgia' | 'Verdana' | 'Times New Roman';
export type HeadingStyle = 'uppercase' | 'classic' | 'boxed' | 'underline';
export type SectionStyle = 'lines' | 'cards' | 'plain' | 'accent';
export type SpacingScale = 'compact' | 'balanced' | 'spacious';
export type BorderStyle = 'none' | 'subtle' | 'strong' | 'rounded';

export interface ResumeTheme {
  templateId: TemplateId;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: ResumeFont;
  fontSize: number;
  spacing: SpacingScale;
  headingStyle: HeadingStyle;
  sectionStyle: SectionStyle;
  borderStyle: BorderStyle;
  showIcons: boolean;
  compactMode: boolean;
  sectionOrder: SectionId[];
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
  accent: string;
}
