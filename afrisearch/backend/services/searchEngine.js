// Mock search engine service for MVP/demo

const searchEngine = {
  async search(query, filters) {
    // Lowercase query for easier matching
    const q = (query || '').toLowerCase();
    // Diverse dummy results for different searches
    const data = [
      {
        keywords: ['victoria falls', 'falls', 'waterfall'],
        title: 'Victoria Falls',
        snippet: 'Victoria Falls is one of the largest and most famous waterfalls in the world.',
        description: `Victoria Falls, located on the border of Zambia and Zimbabwe, is considered one of the Seven Natural Wonders of the World. Known locally as "Mosi-oa-Tunya" (The Smoke That Thunders), the falls are 1,708 meters wide and 108 meters high. The surrounding area is a UNESCO World Heritage Site and a major tourist attraction, offering breathtaking views, adventure sports, and rich biodiversity.`
      },
      {
        keywords: ['kilimanjaro', 'mount kilimanjaro', 'mountain'],
        title: 'Mount Kilimanjaro',
        snippet: 'Mount Kilimanjaro is Africa’s highest peak and a popular climbing destination.',
        description: `Mount Kilimanjaro, located in Tanzania, stands at 5,895 meters above sea level. It is a free-standing volcanic mountain with three cones: Kibo, Mawenzi, and Shira. Kilimanjaro is renowned for its diverse ecosystems, from rainforest to alpine desert, and attracts thousands of climbers each year.`
      },
      {
        keywords: ['sahara', 'sahara desert', 'desert'],
        title: 'The Sahara Desert',
        snippet: 'The Sahara is the largest hot desert in the world, spanning North Africa.',
        description: `Covering approximately 9.2 million square kilometers, the Sahara Desert stretches across several countries including Algeria, Chad, Egypt, Libya, Mali, Mauritania, Morocco, Niger, Western Sahara, Sudan, and Tunisia. It is known for its harsh climate, sand dunes, and unique flora and fauna adapted to arid conditions.`
      },
      {
        keywords: ['nile', 'river nile', 'nile river'],
        title: 'The Nile River',
        snippet: 'The Nile is the longest river in Africa and the world.',
        description: `The Nile River flows over 6,650 kilometers (4,130 miles) through northeastern Africa, draining into the Mediterranean Sea. It is a vital water source for Egypt and Sudan, and is historically significant as the cradle of ancient Egyptian civilization.`
      },
      {
        keywords: ['pyramids', 'giza', 'egypt pyramids'],
        title: 'The Pyramids of Giza',
        snippet: 'The Pyramids of Giza are among the most iconic monuments in the world.',
        description: `Located near Cairo, Egypt, the Pyramids of Giza consist of three main pyramids built as royal tombs for the pharaohs. The Great Pyramid is the oldest of the Seven Wonders of the Ancient World and the only one still largely intact.`
      },
      {
        keywords: ['safari', 'wildlife', 'kruger', 'serengeti'],
        title: 'African Safari',
        snippet: 'African safaris offer a unique opportunity to see wildlife in their natural habitat.',
        description: `Popular safari destinations include Kruger National Park (South Africa), Serengeti (Tanzania), and Maasai Mara (Kenya). Visitors can see the Big Five (lion, leopard, elephant, buffalo, rhino) and experience diverse landscapes and cultures.`
      },
      {
        keywords: ['lagos', 'nigeria', 'city'],
        title: 'Lagos, Nigeria',
        snippet: 'Lagos is the largest city in Nigeria and one of the fastest-growing cities in the world.',
        description: `Located on the coast of Nigeria, Lagos is a major financial center in Africa, known for its vibrant culture, music, and nightlife. It is home to millions of people and serves as a hub for business and innovation.`
      }
    ];
    // Find exact match for the query
    const exactMatch = data.find(item => 
      item.keywords.some(keyword => q.toLowerCase() === keyword.toLowerCase())
    );

    // Return the exact match or a "no results" message
    return {
      results: exactMatch ? [exactMatch] : [
        {
          title: `No exact match found`,
          snippet: `Try searching for: Victoria Falls, Kilimanjaro, Sahara, Nile, Pyramids, Safari, Lagos...`,
          description: `Afrisearch is your gateway to African wonders. Try searching for a famous landmark, city, or natural feature!`
        }
      ]
    };
  },
  initIndex() {
    // No-op for mock
    console.log('Mock search engine initialized');
  }
};

export default searchEngine;
