import Fuse from "fuse.js";

import { JaneDoe, PeterPan } from "./assets/profile_images";

export const mentors = [
  {
    id: 0,
    name: "Jane Doe",
    role: "MFA Student",
    organization: "SVA, New York City",
    school: "UC Irvine",
    courseOfStudy: "Fine Arts",
    fullBio:
      "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
    imageUrl: JaneDoe,
  },
  {
    id: 1,
    name: "Peter Pan",
    role: "Wizard",
    organization: "Asteroid Belt Infinity Enterprises",
    school: "Waverly Place",
    courseOfStudy: "Meteor Alchemy",
    fullBio:
      "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
    imageUrl: PeterPan,
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "MFA Student",
    organization: "SVA, New York City",
    school: "UC Irvine",
    courseOfStudy: "Fine Arts",
    fullBio:
      "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
    imageUrl: JaneDoe,
  },
  {
    id: 3,
    name: "Peter Pan",
    role: "Wizard",
    organization: "Asteroid Belt Infinity Enterprises",
    school: "Waverly Place",
    courseOfStudy: "Meteor Alchemy",
    fullBio:
      "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
    imageUrl: PeterPan,
  },
  {
    id: 4,
    name: "Jane Doe",
    role: "MFA Student",
    organization: "SVA, New York City",
    school: "UC Irvine",
    courseOfStudy: "Fine Arts",
    fullBio:
      "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
    imageUrl: JaneDoe,
  },
  {
    id: 5,
    name: "Peter Pan",
    role: "Wizard",
    organization: "Asteroid Belt Infinity Enterprises",
    school: "Waverly Place",
    courseOfStudy: "Meteor Alchemy",
    fullBio:
      "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
    imageUrl: PeterPan,
  },
  {
    id: 6,
    name: "Jane Doe",
    role: "MFA Student",
    organization: "SVA, New York City",
    school: "UC Irvine",
    courseOfStudy: "Fine Arts",
    fullBio:
      "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
    imageUrl: JaneDoe,
  },
  {
    id: 7,
    name: "Peter Pan",
    role: "Wizard",
    organization: "Asteroid Belt Infinity Enterprises",
    school: "Waverly Place",
    courseOfStudy: "Meteor Alchemy",
    fullBio:
      "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
    imageUrl: PeterPan,
  },
  {
    id: 8,
    name: "Jane Doe",
    role: "MFA Student",
    organization: "SVA, New York City",
    school: "UC Irvine",
    courseOfStudy: "Fine Arts",
    fullBio:
      "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
    imageUrl: JaneDoe,
  },
  {
    id: 9,
    name: "Peter Pan",
    role: "Wizard",
    organization: "Asteroid Belt Infinity Enterprises",
    school: "Waverly Place",
    courseOfStudy: "Meteor Alchemy",
    fullBio:
      "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
    imageUrl: PeterPan,
  },
  {
    id: 10,
    name: "Jane Doe",
    role: "MFA Student",
    organization: "SVA, New York City",
    school: "UC Irvine",
    courseOfStudy: "Fine Arts",
    fullBio:
      "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
    imageUrl: JaneDoe,
  },
  {
    id: 11,
    name: "Peter Pan",
    role: "Wizard",
    organization: "Asteroid Belt Infinity Enterprises",
    school: "Waverly Place",
    courseOfStudy: "Meteor Alchemy",
    fullBio:
      "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
    imageUrl: PeterPan,
  },
  {
    id: 12,
    name: "Jane Doe",
    role: "MFA Student",
    organization: "SVA, New York City",
    school: "UC Irvine",
    courseOfStudy: "Fine Arts",
    fullBio:
      "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
    imageUrl: JaneDoe,
  },
  {
    id: 13,
    name: "Peter Pan",
    role: "Wizard",
    organization: "Asteroid Belt Infinity Enterprises",
    school: "Waverly Place",
    courseOfStudy: "Meteor Alchemy",
    fullBio:
      "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
    imageUrl: PeterPan,
  },
  {
    id: 14,
    name: "Jane Doe",
    role: "MFA Student",
    organization: "SVA, New York City",
    school: "UC Irvine",
    courseOfStudy: "Fine Arts",
    fullBio:
      "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
    imageUrl: JaneDoe,
  },
  {
    id: 15,
    name: "Peter Pan",
    role: "Wizard",
    organization: "Asteroid Belt Infinity Enterprises",
    school: "Waverly Place",
    courseOfStudy: "Meteor Alchemy",
    fullBio:
      "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
    imageUrl: PeterPan,
  },
  {
    id: 16,
    name: "Jane Doe",
    role: "MFA Student",
    organization: "SVA, New York City",
    school: "UC Irvine",
    courseOfStudy: "Fine Arts",
    fullBio:
      "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
    imageUrl: JaneDoe,
  },
  {
    id: 17,
    name: "Peter Pan",
    role: "Wizard",
    organization: "Asteroid Belt Infinity Enterprises",
    school: "Waverly Place",
    courseOfStudy: "Meteor Alchemy",
    fullBio:
      "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
    imageUrl: PeterPan,
  },
  {
    id: 18,
    name: "Jane Doe",
    role: "MFA Student",
    organization: "SVA, New York City",
    school: "UC Irvine",
    courseOfStudy: "Fine Arts",
    fullBio:
      "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
    imageUrl: JaneDoe,
  },
  {
    id: 19,
    name: "Peter Pan",
    role: "Wizard",
    organization: "Asteroid Belt Infinity Enterprises",
    school: "Waverly Place",
    courseOfStudy: "Meteor Alchemy",
    fullBio:
      "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
    imageUrl: PeterPan,
  },
].sort((a, b) => a.name.localeCompare(b.name));

const fuseOptions = {
  isCaseSensitive: false,
  findAllMatches: false,
  includeMatches: true,
  shouldSort: true,
  threshold: 0.2,
  keys: [
    {
      name: "name",
      weight: 0.6,
    },
    {
      name: "role",
      weight: 0.2,
    },
    {
      name: "organization",
      weight: 0.2,
    },
  ],
};
export const fuse = new Fuse(mentors, fuseOptions);
