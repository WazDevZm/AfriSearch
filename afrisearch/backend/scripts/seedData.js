import mongoose from 'mongoose';
import Business from '../models/Business.js';
import News from '../models/News.js';
import Author from '../models/Author.js';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/afrisearch';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

// Dummy Business Data
const businessData = [
  {
    name: "Nkrumah's Kitchen",
    description: "Authentic Ghanaian cuisine with traditional recipes passed down through generations. Specializing in jollof rice, banku, and fresh seafood.",
    category: "restaurant",
    address: {
      street: "123 Independence Avenue",
      city: "Accra",
      state: "Greater Accra",
      country: "Ghana",
      coordinates: { lat: 5.6037, lng: -0.1870 }
    },
    contact: {
      phone: "+233 24 123 4567",
      email: "info@nkrumahskitchen.gh",
      website: "https://nkrumahskitchen.gh"
    },
    operatingHours: {
      monday: "8:00 AM - 10:00 PM",
      tuesday: "8:00 AM - 10:00 PM",
      wednesday: "8:00 AM - 10:00 PM",
      thursday: "8:00 AM - 10:00 PM",
      friday: "8:00 AM - 11:00 PM",
      saturday: "9:00 AM - 11:00 PM",
      sunday: "10:00 AM - 9:00 PM"
    },
    languages: ["en", "tw"],
    verified: true,
    rating: 4.8,
    reviews: [
      {
        user: "Kwame Asante",
        rating: 5,
        comment: "Best jollof rice in Accra! Authentic taste and great service.",
        date: new Date('2024-01-15')
      },
      {
        user: "Ama Serwaa",
        rating: 4,
        comment: "Delicious food, but service can be slow during peak hours.",
        date: new Date('2024-01-10')
      }
    ],
    tags: ["ghanaian food", "jollof rice", "traditional", "authentic", "seafood"],
    images: ["https://example.com/nkrumah1.jpg", "https://example.com/nkrumah2.jpg"]
  },
  {
    name: "Lagos Tech Hub",
    description: "Leading technology incubator and co-working space in Lagos. Supporting African startups with mentorship, funding, and networking opportunities.",
    category: "service",
    address: {
      street: "456 Victoria Island",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      coordinates: { lat: 6.4281, lng: 3.4219 }
    },
    contact: {
      phone: "+234 1 234 5678",
      email: "hello@lagostechhub.com",
      website: "https://lagostechhub.com"
    },
    operatingHours: {
      monday: "8:00 AM - 8:00 PM",
      tuesday: "8:00 AM - 8:00 PM",
      wednesday: "8:00 AM - 8:00 PM",
      thursday: "8:00 AM - 8:00 PM",
      friday: "8:00 AM - 8:00 PM",
      saturday: "10:00 AM - 6:00 PM",
      sunday: "Closed"
    },
    languages: ["en", "yo", "ig"],
    verified: true,
    rating: 4.9,
    reviews: [
      {
        user: "Tunde Adebayo",
        rating: 5,
        comment: "Excellent facilities and great community of entrepreneurs.",
        date: new Date('2024-01-20')
      }
    ],
    tags: ["technology", "startup", "coworking", "incubator", "mentorship"],
    images: ["https://example.com/techhub1.jpg"]
  },
  {
    name: "Cape Town Safari Lodge",
    description: "Luxury safari lodge offering authentic African wildlife experiences. Located near Kruger National Park with professional guides and comfortable accommodations.",
    category: "hotel",
    address: {
      street: "Safari Road, Mpumalanga",
      city: "Hazyview",
      state: "Mpumalanga",
      country: "South Africa",
      coordinates: { lat: -24.3667, lng: 31.1167 }
    },
    contact: {
      phone: "+27 13 737 4000",
      email: "bookings@safarilodge.co.za",
      website: "https://safarilodge.co.za"
    },
    operatingHours: {
      monday: "24/7",
      tuesday: "24/7",
      wednesday: "24/7",
      thursday: "24/7",
      friday: "24/7",
      saturday: "24/7",
      sunday: "24/7"
    },
    languages: ["en", "af", "zu"],
    verified: true,
    rating: 4.7,
    reviews: [
      {
        user: "Sarah Johnson",
        rating: 5,
        comment: "Amazing safari experience! Saw the Big Five and the guides were incredibly knowledgeable.",
        date: new Date('2024-01-18')
      }
    ],
    tags: ["safari", "wildlife", "luxury", "kruger", "big five"],
    images: ["https://example.com/safari1.jpg", "https://example.com/safari2.jpg"]
  },
  {
    name: "Nairobi Fashion House",
    description: "Contemporary African fashion brand showcasing modern designs with traditional African influences. Specializing in bespoke clothing and accessories.",
    category: "shop",
    address: {
      street: "789 Westlands Road",
      city: "Nairobi",
      state: "Nairobi",
      country: "Kenya",
      coordinates: { lat: -1.2921, lng: 36.8219 }
    },
    contact: {
      phone: "+254 20 123 4567",
      email: "info@nairobfashion.co.ke",
      website: "https://nairobfashion.co.ke"
    },
    operatingHours: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 8:00 PM",
      saturday: "10:00 AM - 6:00 PM",
      sunday: "Closed"
    },
    languages: ["en", "sw"],
    verified: true,
    rating: 4.6,
    reviews: [
      {
        user: "Grace Wanjiku",
        rating: 5,
        comment: "Beautiful designs that celebrate our culture. Highly recommended!",
        date: new Date('2024-01-12')
      }
    ],
    tags: ["fashion", "african design", "bespoke", "contemporary", "traditional"],
    images: ["https://example.com/fashion1.jpg"]
  },
  {
    name: "Cairo Medical Center",
    description: "Modern medical facility providing comprehensive healthcare services. Specializing in cardiology, neurology, and emergency medicine with state-of-the-art equipment.",
    category: "health",
    address: {
      street: "321 Tahrir Square",
      city: "Cairo",
      state: "Cairo",
      country: "Egypt",
      coordinates: { lat: 30.0444, lng: 31.2357 }
    },
    contact: {
      phone: "+20 2 1234 5678",
      email: "info@cairomedical.eg",
      website: "https://cairomedical.eg"
    },
    operatingHours: {
      monday: "24/7",
      tuesday: "24/7",
      wednesday: "24/7",
      thursday: "24/7",
      friday: "24/7",
      saturday: "24/7",
      sunday: "24/7"
    },
    languages: ["ar", "en"],
    verified: true,
    rating: 4.9,
    reviews: [
      {
        user: "Ahmed Hassan",
        rating: 5,
        comment: "Excellent medical care with modern facilities and professional staff.",
        date: new Date('2024-01-08')
      }
    ],
    tags: ["medical", "healthcare", "cardiology", "emergency", "modern"],
    images: ["https://example.com/medical1.jpg"]
  }
];

// Dummy News Data
const newsData = [
  {
    title: "Kenya Launches Africa's First Digital Currency Pilot Program",
    content: "Kenya has become the first African country to launch a comprehensive digital currency pilot program, marking a significant milestone in the continent's financial technology evolution. The Central Bank of Kenya announced the initiative, which will test the feasibility of a central bank digital currency (CBDC) in a real-world environment. The pilot program involves 10,000 participants across Nairobi, Mombasa, and Kisumu, representing various demographics and economic backgrounds. Participants will be able to use the digital shilling for everyday transactions including payments for goods and services, money transfers, and government services. The program is expected to run for six months and will provide valuable insights into the adoption, security, and economic impact of digital currencies in the African context. This initiative positions Kenya at the forefront of financial innovation in Africa and could serve as a model for other African nations considering similar programs.",
    summary: "Kenya launches Africa's first comprehensive digital currency pilot program with 10,000 participants across three major cities.",
    author: {
      name: "Wanjiku Mwangi",
      email: "wanjiku@africanews.com",
      organization: "Africa News Network"
    },
    source: {
      name: "Africa News Network",
      url: "https://africanews.com",
      logo: "https://example.com/ann-logo.png"
    },
    category: "technology",
    country: "Kenya",
    language: "en",
    tags: ["digital currency", "fintech", "blockchain", "innovation", "kenya"],
    images: ["https://example.com/digital-currency.jpg"],
    publishedAt: new Date('2024-01-20T10:30:00Z'),
    verified: true,
    views: 15420,
    shares: 892,
    sentiment: "positive"
  },
  {
    title: "South Africa's Renewable Energy Revolution Reaches New Milestone",
    content: "South Africa has achieved a historic milestone in its renewable energy transition, with renewable sources now accounting for 35% of the country's total electricity generation. This achievement comes as the country continues to invest heavily in solar and wind energy projects, creating thousands of jobs and reducing carbon emissions significantly. The Renewable Energy Independent Power Producer Procurement (REIPPP) program has been instrumental in this success, facilitating private sector investment in clean energy infrastructure. Major projects include the 100MW Kathu Solar Park in the Northern Cape and the 140MW Jeffreys Bay Wind Farm in the Eastern Cape. The government's commitment to reaching 50% renewable energy by 2030 appears to be on track, with several large-scale projects currently under development. This transition is not only benefiting the environment but also creating economic opportunities in rural areas and reducing the country's dependence on coal imports.",
    summary: "South Africa reaches 35% renewable energy generation, creating jobs and reducing emissions through major solar and wind projects.",
    author: {
      name: "Thabo Mthembu",
      email: "thabo@greenafrica.co.za",
      organization: "Green Africa Today"
    },
    source: {
      name: "Green Africa Today",
      url: "https://greenafrica.co.za",
      logo: "https://example.com/green-africa-logo.png"
    },
    category: "environment",
    country: "South Africa",
    language: "en",
    tags: ["renewable energy", "solar", "wind", "sustainability", "green jobs"],
    images: ["https://example.com/solar-farm.jpg", "https://example.com/wind-turbines.jpg"],
    publishedAt: new Date('2024-01-19T14:15:00Z'),
    verified: true,
    views: 12850,
    shares: 756,
    sentiment: "positive"
  },
  {
    title: "Nigerian Tech Startup Secures $50M Series B Funding",
    content: "Lagos-based fintech startup Paystack has secured $50 million in Series B funding, marking one of the largest funding rounds for an African fintech company this year. The funding round was led by Stripe, with participation from existing investors including Visa and Tencent. Paystack, which provides payment infrastructure for businesses across Africa, plans to use the funding to expand its services to more African countries and develop new financial products. The company has already processed over $10 billion in transactions and serves more than 100,000 businesses across Nigeria, Ghana, and South Africa. This funding round brings Paystack's total funding to over $100 million and values the company at over $1 billion, making it one of Africa's most valuable fintech unicorns. The investment reflects growing international confidence in Africa's fintech sector and the continent's potential for digital financial innovation.",
    summary: "Lagos fintech Paystack raises $50M Series B funding, becoming one of Africa's most valuable fintech companies.",
    author: {
      name: "Aisha Ibrahim",
      email: "aisha@techafrica.ng",
      organization: "Tech Africa"
    },
    source: {
      name: "Tech Africa",
      url: "https://techafrica.ng",
      logo: "https://example.com/tech-africa-logo.png"
    },
    category: "business",
    country: "Nigeria",
    language: "en",
    tags: ["fintech", "funding", "startup", "payments", "investment"],
    images: ["https://example.com/paystack-office.jpg"],
    publishedAt: new Date('2024-01-18T09:45:00Z'),
    verified: true,
    views: 22100,
    shares: 1245,
    sentiment: "positive"
  },
  {
    title: "Morocco Hosts First Pan-African Cultural Festival",
    content: "Morocco is hosting the inaugural Pan-African Cultural Festival, bringing together artists, musicians, writers, and cultural practitioners from across the continent. The festival, held in Marrakech, features over 200 performances, exhibitions, and workshops celebrating Africa's rich cultural diversity. Highlights include traditional music performances from West Africa, contemporary art exhibitions from South Africa, and literary discussions featuring prominent African authors. The festival aims to promote cultural exchange and understanding among African nations while showcasing the continent's creative talent to the world. Over 50,000 visitors are expected to attend the week-long event, which includes film screenings, fashion shows, and culinary experiences representing different African regions. The festival is supported by the African Union and various cultural organizations, reflecting a growing recognition of culture as a driver of economic development and social cohesion across the continent.",
    summary: "Morocco hosts first Pan-African Cultural Festival in Marrakech, featuring 200+ performances and celebrating African cultural diversity.",
    author: {
      name: "Fatima Alami",
      email: "fatima@culturalafrica.ma",
      organization: "Cultural Africa"
    },
    source: {
      name: "Cultural Africa",
      url: "https://culturalafrica.ma",
      logo: "https://example.com/cultural-africa-logo.png"
    },
    category: "culture",
    country: "Morocco",
    language: "en",
    tags: ["culture", "festival", "arts", "diversity", "pan-african"],
    images: ["https://example.com/festival1.jpg", "https://example.com/festival2.jpg"],
    publishedAt: new Date('2024-01-17T16:20:00Z'),
    verified: true,
    views: 8750,
    shares: 432,
    sentiment: "positive"
  },
  {
    title: "Ethiopia's Green Legacy Initiative Plants 20 Billion Trees",
    content: "Ethiopia has successfully planted 20 billion trees as part of its ambitious Green Legacy Initiative, surpassing its original target and making it one of the world's largest reforestation programs. The initiative, launched in 2019 by Prime Minister Abiy Ahmed, aims to combat climate change and environmental degradation while creating employment opportunities for millions of Ethiopians. The program has involved over 20 million people across the country, including students, government employees, and community members. The trees planted include indigenous species that are well-suited to Ethiopia's diverse climate zones, from the highlands to the lowlands. The initiative has also contributed to soil conservation, water management, and biodiversity preservation. International organizations have praised Ethiopia's commitment to environmental restoration, with the program serving as a model for other African countries facing similar environmental challenges.",
    summary: "Ethiopia's Green Legacy Initiative successfully plants 20 billion trees, involving 20 million people in the world's largest reforestation program.",
    author: {
      name: "Dawit Gebremichael",
      email: "dawit@environmentalethiopia.et",
      organization: "Environmental Ethiopia"
    },
    source: {
      name: "Environmental Ethiopia",
      url: "https://environmentalethiopia.et",
      logo: "https://example.com/env-ethiopia-logo.png"
    },
    category: "environment",
    country: "Ethiopia",
    language: "en",
    tags: ["reforestation", "climate change", "environment", "green legacy", "sustainability"],
    images: ["https://example.com/tree-planting1.jpg", "https://example.com/tree-planting2.jpg"],
    publishedAt: new Date('2024-01-16T11:30:00Z'),
    verified: true,
    views: 19600,
    shares: 1120,
    sentiment: "positive"
  }
];

// Dummy Author Data
const authorData = [
  {
    name: "Chimamanda Ngozi Adichie",
    bio: "Nigerian novelist, short story writer, and feminist. Known for her powerful narratives that explore themes of identity, gender, and postcolonialism. Winner of the Orange Prize for Fiction and the National Book Critics Circle Award.",
    nationality: "Nigerian",
    expertise: ["literature", "feminism", "postcolonialism", "storytelling", "social justice"],
    socialMedia: {
      twitter: "@ChimamandaReal",
      linkedin: "chimamanda-adichie",
      website: "https://chimamanda.com"
    },
    publications: [
      {
        title: "Half of a Yellow Sun",
        type: "book",
        url: "https://example.com/half-yellow-sun",
        publishedAt: new Date('2006-01-01')
      },
      {
        title: "Americanah",
        type: "book",
        url: "https://example.com/americanah",
        publishedAt: new Date('2013-01-01')
      },
      {
        title: "We Should All Be Feminists",
        type: "book",
        url: "https://example.com/we-should-all-be-feminists",
        publishedAt: new Date('2014-01-01')
      }
    ],
    languages: ["en", "ig"],
    verified: true,
    followers: 2500000,
    rating: 4.9
  },
  {
    name: "Wole Soyinka",
    bio: "Nigerian playwright, poet, and essayist. First African to be awarded the Nobel Prize in Literature (1986). Known for his political activism and literary works that address social and political issues in Nigeria and Africa.",
    nationality: "Nigerian",
    expertise: ["drama", "poetry", "political activism", "literature", "social commentary"],
    socialMedia: {
      twitter: "@WoleSoyinka",
      linkedin: "wole-soyinka",
      website: "https://wolesoyinka.com"
    },
    publications: [
      {
        title: "Death and the King's Horseman",
        type: "book",
        url: "https://example.com/death-king-horseman",
        publishedAt: new Date('1975-01-01')
      },
      {
        title: "The Man Died: Prison Notes",
        type: "book",
        url: "https://example.com/man-died",
        publishedAt: new Date('1972-01-01')
      }
    ],
    languages: ["en", "yo"],
    verified: true,
    followers: 1800000,
    rating: 4.8
  },
  {
    name: "Ngũgĩ wa Thiong'o",
    bio: "Kenyan writer and academic. Prominent figure in African literature who writes primarily in Gikuyu and English. Known for his novels, plays, and essays that explore themes of colonialism, language, and cultural identity.",
    nationality: "Kenyan",
    expertise: ["literature", "postcolonialism", "language studies", "cultural identity", "academia"],
    socialMedia: {
      twitter: "@NgugiWaThiongo",
      linkedin: "ngugi-wa-thiongo",
      website: "https://ngugiwa.com"
    },
    publications: [
      {
        title: "Weep Not, Child",
        type: "book",
        url: "https://example.com/weep-not-child",
        publishedAt: new Date('1964-01-01')
      },
      {
        title: "Decolonising the Mind",
        type: "book",
        url: "https://example.com/decolonising-mind",
        publishedAt: new Date('1986-01-01')
      }
    ],
    languages: ["en", "sw", "gikuyu"],
    verified: true,
    followers: 1200000,
    rating: 4.7
  },
  {
    name: "Aminatta Forna",
    bio: "Sierra Leonean-Scottish writer and journalist. Known for her novels that explore themes of war, memory, and identity in post-conflict societies. Winner of the Commonwealth Writers' Prize and the Windham-Campbell Literature Prize.",
    nationality: "Sierra Leonean",
    expertise: ["literature", "journalism", "war studies", "memory studies", "identity"],
    socialMedia: {
      twitter: "@AminattaForna",
      linkedin: "aminatta-forna",
      website: "https://aminattaforna.com"
    },
    publications: [
      {
        title: "The Memory of Love",
        type: "book",
        url: "https://example.com/memory-of-love",
        publishedAt: new Date('2010-01-01')
      },
      {
        title: "Happiness",
        type: "book",
        url: "https://example.com/happiness",
        publishedAt: new Date('2018-01-01')
      }
    ],
    languages: ["en"],
    verified: true,
    followers: 850000,
    rating: 4.6
  },
  {
    name: "Tsitsi Dangarembga",
    bio: "Zimbabwean novelist, playwright, and filmmaker. First black woman to publish a novel in Zimbabwe. Known for her trilogy of novels that explore the experiences of women in postcolonial Zimbabwe.",
    nationality: "Zimbabwean",
    expertise: ["literature", "film", "women's studies", "postcolonialism", "storytelling"],
    socialMedia: {
      twitter: "@TsitsiDangarembga",
      linkedin: "tsitsi-dangarembga",
      website: "https://tsitsidangarembga.com"
    },
    publications: [
      {
        title: "Nervous Conditions",
        type: "book",
        url: "https://example.com/nervous-conditions",
        publishedAt: new Date('1988-01-01')
      },
      {
        title: "This Mournable Body",
        type: "book",
        url: "https://example.com/this-mournable-body",
        publishedAt: new Date('2018-01-01')
      }
    ],
    languages: ["en", "shona"],
    verified: true,
    followers: 650000,
    rating: 4.5
  }
];

// Function to seed data
async function seedData() {
  try {
    console.log('Starting data seeding...');
    
    // Clear existing data
    await Business.deleteMany({});
    await News.deleteMany({});
    await Author.deleteMany({});
    console.log('Cleared existing data');
    
    // Insert new data
    const businesses = await Business.insertMany(businessData);
    console.log(`Inserted ${businesses.length} businesses`);
    
    const news = await News.insertMany(newsData);
    console.log(`Inserted ${news.length} news articles`);
    
    const authors = await Author.insertMany(authorData);
    console.log(`Inserted ${authors.length} authors`);
    
    console.log('Data seeding completed successfully!');
    console.log('\nSummary:');
    console.log(`- Businesses: ${businesses.length}`);
    console.log(`- News Articles: ${news.length}`);
    console.log(`- Authors: ${authors.length}`);
    
    // Display some sample data
    console.log('\nSample Business:', businesses[0].name);
    console.log('Sample News:', news[0].title);
    console.log('Sample Author:', authors[0].name);
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeder
seedData(); 