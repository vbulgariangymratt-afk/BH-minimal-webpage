export interface ProblemStatementItem {
  id: string;
  tag: string;
  text: string;
  verticalAlign: 'top' | 'bottom';
}

export type ProblemExperience = ProblemStatementItem;

export const PROBLEMS_SECTION_TITLE = "Stuff I no longer struggle with since I built Backbone";

export const COPYCAT_NOTE = "I won't specify on this webpage which specific features fixed these problems of mine to avoid copycats (there are a lot)";

export const KINETIC_PROBLEMS: ProblemStatementItem[] = [
  {
    id: 'point-01',
    tag: '01',
    text: 'Feeling useless and broken after a 16h work day cuz i remember nothing i worked on',
    verticalAlign: 'top',
  },
  {
    id: 'point-02',
    tag: '02',
    text: 'Being too exhausted to work after spending all of my (limited) energy organizing my work system/app',
    verticalAlign: 'bottom',
  },
  {
    id: 'point-03',
    tag: '03',
    text: 'Abandoning anooooother app after a depressive episode cuz coming back to it made me feel like a failure',
    verticalAlign: 'top',
  },
  {
    id: 'point-04',
    tag: '04',
    text: 'Another broken streak making me feel incapable of being consistent & streak completion anxiety',
    verticalAlign: 'bottom',
  },
  {
    id: 'point-05',
    tag: '05',
    text: 'Feeling ashamed of abandoning my temporary obsessions',
    verticalAlign: 'top',
  },
];

export const PROBLEM_BACKGROUND_IMAGES: string[] = [
  '/images/problems/image-1-optimized.webp',
  '/images/problems/image-2-optimized.webp',
  '/images/problems/image-3-optimized.webp',
  '/images/problems/image-4-optimized.webp',
];
