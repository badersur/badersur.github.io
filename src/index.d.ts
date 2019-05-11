export interface MultiLangs {
  ar: string;
  en: string;
}

export interface MiscNode {
  headings: {
    overview: MultiLangs;
    projects: MultiLangs;
    blog: MultiLangs;
    greeting: MultiLangs;
    skills: MultiLangs;
    contact: MultiLangs;
    notFound: MultiLangs;
    otherLang: MultiLangs;
    download: MultiLangs;
    source: MultiLangs;
    website: MultiLangs;
  };
  messages: {
    indexDescription: MultiLangs;
    projectsDescription: MultiLangs;
    coursesDescription: {
      en: string;
    }
    greeting: MultiLangs;
    contact: MultiLangs;
    notFound: MultiLangs;
    switchSiteLang: MultiLangs;
  };
  links: {
    email: string;
    twitter: string;
    telegram: string;
    github: string;
  };
}

export interface SkillNode {
  text: MultiLangs;
  techList: string[];
}

export interface SkillProps {
  data: SkillNode;
  lang: string;
}

export interface CourseNode {
  name: string;
  link: string;
}

export interface CourseProps {
  data: CourseNode;
}

export interface CourseProvidersNode {
  provider: string;
  profile: string;
  courses: CourseNode[];
}

export interface CourseProviderProps {
  data: CourseProvidersNode;
}

export interface ProjectNode {
  name: MultiLangs;
  description: MultiLangs;
  link: string;
  linkType: string;
}

export interface ProjectProps {
  data: ProjectNode;
  lang: string;
}

export interface PageContext {
  lang: string;
  multiLangs?: boolean;
}

export interface AllCourseProvidersYaml {
  edges: Array<{ node: CourseProvidersNode }>
}

export interface AllMiscYaml {
  edges: Array<{ node: MiscNode }>
}

export interface AllProjectsYaml {
  edges: Array<{ node: ProjectNode }>
}

export interface AllSkillsYaml {
  edges: Array<{ node: SkillNode }>
}

export interface CoursesTemplateProps {
  data: {
    allMiscYaml: AllMiscYaml;
    allCourseProvidersYaml: AllCourseProvidersYaml;
  };
}

export interface ProjectsTemplateProps {
  data: {
    allMiscYaml: AllMiscYaml;
    allProjectsYaml: AllProjectsYaml;
  };
  pageContext: PageContext;
}

export interface IndexTemplateProps {
  data: {
    allMiscYaml: AllMiscYaml;
    allSkillsYaml: AllSkillsYaml;
  };
  pageContext: PageContext;
}

export interface NotFoundTemplateProps {
  data: {
    allMiscYaml: AllMiscYaml;
  };
  pageContext: PageContext;
}

export interface SiteMetadata {
  siteUrl: string;
  twitter: string;
  title: MultiLangs;
}
