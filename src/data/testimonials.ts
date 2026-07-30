export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Neil Segel",
    location: "Heights, Houston",
    rating: 5,
    text: "BoldREMO just finished remodeling our kitchen and guest bathroom - they did an AWESOME job!! Stan is very friendly and incredibly helpful with suggestions. Their price was VERY affordable, and they completed the project right on time. Zero complaints! We now have the dream kitchen we wanted in ONE WEEK! I highly recommend Stan and BoldREMO for any remodeling project - Stan has an incredible attention to detail and craftsmanship!",
    date: "2024-12-15",
  },
  {
    name: "Bob Daimler",
    location: "Houston, TX",
    rating: 5,
    text: "Stan does more than just professional work. He takes such pride in what he does and leaves you with an outstanding product! He has remodeled my master shower and kitchen and now he has just torn out a bathtub and installed a new walk-in shower and installed a hidden trash bin in the kitchen. He comes with my highest recommendation from someone who has worked in construction his whole life.",
    date: "2024-11-20",
  },
  {
    name: "Crystal Magana",
    location: "Kingwood, TX",
    rating: 5,
    text: "BoldREMO remodeled my bathroom and did a phenomenal job, they brought my vision to life!",
    date: "2024-10-08",
  },
  {
    name: "Leah Whitten",
    location: "Heights, Houston",
    rating: 5,
    text: "I became acquainted with BoldREMO when they did a large remodel project for my next-door neighbor's house. It was the very best work that I have witnessed. So, I had them do a project in my kitchen area that was seamless from beginning to end. In baseball terms - They hit a home run! Highly recommend! Professional - Quality - Outstanding Work!",
    date: "2024-09-15",
  },
];
