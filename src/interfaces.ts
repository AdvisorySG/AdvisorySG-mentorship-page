export interface Photo {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: {
      url: string;
      width: number;
      height: number;
    };
    large: {
      url: string;
      width: number;
      height: number;
    };
    full: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface RawData {
  id: string;
  Email: string;
  "First Name": string;
  "Last Name": string;
  Organisation: string;
  "Job Title": string;
  Biography: string;
  Name: string;
  "Course of Study": string;
  School: string;
  Filename: string[];
  "Industry Mapping": string[];
  "Number of Mentees": number;
  Photo: Photo[];
  "Industry 1": string[];
  "Industry 2"?: string[];
  "Industry 3"?: string[];
}

export interface Mentor {
  courseOfStudy: string;
  fullBio: string;
  fullImageUrl: string;
  industries: (string | undefined)[];
  name: string;
  organisation: string;
  role: string;
  school: string;
  thumbnailImageUrl: string;
}
