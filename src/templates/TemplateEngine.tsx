import type { TemplateId } from '../types/theme';
import type { ReactElement } from 'react';
import { ATSClassicTemplate } from './ATSClassicTemplate';
import { CorporateTemplate } from './CorporateTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { DarkTemplate } from './DarkTemplate';
import { DevPremiumTemplate } from './DevPremiumTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ModernTemplate } from './ModernTemplate';
import { SidebarTemplate } from './SidebarTemplate';
import type { TemplateProps } from './templateHelpers';

const templateMap: Record<TemplateId, (props: TemplateProps) => ReactElement> = {
  'ats-clean': ATSClassicTemplate,
  'modern-dev': ModernTemplate,
  sidebar: SidebarTemplate,
  'dark-mode': DarkTemplate,
  corporate: CorporateTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  'dev-premium': DevPremiumTemplate,
};

export function TemplateEngine(props: TemplateProps) {
  const Template = templateMap[props.theme.templateId] ?? ATSClassicTemplate;
  return <Template {...props} />;
}
