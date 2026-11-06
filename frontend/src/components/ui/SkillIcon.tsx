import React from 'react';
import {
  SiAngular,
  SiReact,
  SiRedux,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiSass,
  SiTailwindcss,
  SiBootstrap,
  SiIonic,
  SiGreensock,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPython,
  SiPhp,
  SiGraphql,
  SiHasura,
  SiJsonwebtokens,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGitlab,
  SiGit,
  SiGithub,
  SiRender,
  SiNetlify,
  SiPostman,
  SiAndroidstudio,
  SiStripe,
  SiFirebase,
  SiGoogle,
} from 'react-icons/si';

import {
  TbApi,
  TbShieldCheck,
  TbDatabase,
  TbBrandGit,
  TbServer,
  TbBug,
  TbBrandVscode,
  TbCpu,
  TbTerminal2,
  TbBrandOpenai,
  TbSparkles,
} from 'react-icons/tb';

import { Code } from 'lucide-react';

interface SkillIconProps {
  name: string;
  className?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  SiAngular,
  SiReact,
  SiRedux,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3: SiCss,
  SiCss,
  SiSass,
  SiTailwindcss,
  SiBootstrap,
  SiIonic,
  SiGreensock,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPython,
  SiPhp,
  SiGraphql,
  SiHasura,
  SiJsonwebtokens,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGitlab,
  SiGit,
  SiGithub,
  SiRender,
  SiNetlify,
  SiPostman,
  SiAndroidstudio,
  SiStripe,
  SiFirebase,
  SiGoogle,
  TbApi,
  TbShieldCheck,
  TbDatabase,
  TbBrandGit,
  TbServer,
  TbBug,
  TbBrandVscode,
  TbCpu,
  TbTerminal2,
  TbBrandOpenai,
  TbSparkles,
};

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const IconComponent = ICON_MAP[name];
  if (!IconComponent) {
    return <Code className={className} />;
  }
  return <IconComponent className={className} />;
};
