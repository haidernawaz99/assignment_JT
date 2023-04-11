export type Job = {
  company: string;
  position: string;
  location: string;
  jobDescription: string;
  howToApply: string;
  public: boolean;
  email: string;
  type: "Full Time" | "Part Time" | "Contract" | "Internship" | "Freelance";
  category: string;
  createdAt: Date;
  logo: string;
  editToken: string;
  expiresAt: Date;
};
