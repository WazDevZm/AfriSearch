// Enhanced search engine with African context
import Business from '../models/Business.js';
import News from '../models/News.js';
import Author from '../models/Author.js';
import translationService from './translationService.js';

const searchEngine = {
  async search(query, filters = {}) {
    try {
      const { language = 'en', country, category, type = 'all' } = filters;
      
      // Detect query language
      const detectedLang = await translationService.detectLanguage(query);
      
      // Translate query if needed
      let searchQuery = query;
      if (detectedLang !== language && language !== 'en') {
        const translation = await translationService.translate(query, language, detectedLang);
        searchQuery = translation.translatedText;
      }

      const results = [];

      // Search businesses if type is 'all' or 'businesses'
      if (type === 'all' || type === 'businesses') {
        const businessResults = await this.searchBusinesses(searchQuery, filters);
        results.push(...businessResults);
      }

      // Search news if type is 'all' or 'news'
      if (type === 'all' || type === 'news') {
        const newsResults = await this.searchNews(searchQuery, filters);
        results.push(...newsResults);
      }

      // Search authors if type is 'all' or 'authors'
      if (type === 'all' || type === 'authors') {
        const authorResults = await this.searchAuthors(searchQuery, filters);
        results.push(...authorResults);
      }

      // Add African landmarks and cultural content
      const culturalResults = await this.searchCulturalContent(searchQuery);
      results.push(...culturalResults);

      return {
        results: results.slice(0, 20), // Limit results
        total: results.length,
        language: language,
        detectedLanguage: detectedLang,
        query: query,
        translatedQuery: searchQuery !== query ? searchQuery : null
      };
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  },

  async searchBusinesses(query, filters) {
    try {
      const searchCriteria = {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      };

      if (filters.country) {
        searchCriteria['address.country'] = filters.country;
      }

      if (filters.category) {
        searchCriteria.category = filters.category;
      }

      const businesses = await Business.find(searchCriteria)
        .limit(10)
        .sort({ rating: -1, verified: -1 });

      return businesses.map(business => ({
        type: 'business',
        title: business.name,
        snippet: business.description,
        description: `${business.address.city}, ${business.address.country} • ${business.category}`,
        category: business.category,
        location: business.address,
        contact: business.contact,
        rating: business.rating,
        verified: business.verified,
        languages: business.languages
      }));
    } catch (error) {
      console.error('Business search error:', error);
      return [];
    }
  },

  async searchNews(query, filters) {
    try {
      const searchCriteria = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      };

      if (filters.country) {
        searchCriteria.country = filters.country;
      }

      if (filters.category) {
        searchCriteria.category = filters.category;
      }

      const news = await News.find(searchCriteria)
        .limit(10)
        .sort({ publishedAt: -1, views: -1 });

      return news.map(article => ({
        type: 'news',
        title: article.title,
        snippet: article.summary || article.content.substring(0, 200) + '...',
        description: `Published ${new Date(article.publishedAt).toLocaleDateString()} • ${article.source.name}`,
        category: article.category,
        country: article.country,
        author: article.author,
        source: article.source,
        publishedAt: article.publishedAt,
        views: article.views
      }));
    } catch (error) {
      console.error('News search error:', error);
      return [];
    }
  },

  async searchAuthors(query, filters) {
    try {
      const searchCriteria = {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { bio: { $regex: query, $options: 'i' } },
          { expertise: { $in: [new RegExp(query, 'i')] } }
        ]
      };

      const authors = await Author.find(searchCriteria)
        .limit(10)
        .sort({ rating: -1, followers: -1 });

      return authors.map(author => ({
        type: 'author',
        title: author.name,
        snippet: author.bio,
        description: `${author.nationality} • ${author.expertise.join(', ')}`,
        expertise: author.expertise,
        nationality: author.nationality,
        publications: author.publications.length,
        followers: author.followers,
        rating: author.rating,
        socialMedia: author.socialMedia
      }));
    } catch (error) {
      console.error('Author search error:', error);
      return [];
    }
  },

  async searchCulturalContent(query) {
    // Comprehensive African landmarks and cultural content
    const culturalData = [
      {
        keywords: ['victoria falls', 'falls', 'waterfall', 'zimbabwe', 'zambia', 'mosi-oa-tunya'],
        title: 'Victoria Falls',
        snippet: 'Victoria Falls is one of the largest and most famous waterfalls in the world.',
        description: `Victoria Falls, located on the border of Zambia and Zimbabwe, is considered one of the Seven Natural Wonders of the World. Known locally as "Mosi-oa-Tunya" (The Smoke That Thunders), the falls are 1,708 meters wide and 108 meters high. The surrounding area is a UNESCO World Heritage Site and a major tourist attraction, offering breathtaking views, adventure sports, and rich biodiversity.`,
        type: 'landmark',
        country: 'Zimbabwe/Zambia',
        category: 'tourism'
      },
      {
        keywords: ['kilimanjaro', 'mount kilimanjaro', 'mountain', 'tanzania', 'kibo', 'mawenzi'],
        title: 'Mount Kilimanjaro',
        snippet: 'Mount Kilimanjaro is Africa\'s highest peak and a popular climbing destination.',
        description: `Mount Kilimanjaro, located in Tanzania, stands at 5,895 meters above sea level. It is a free-standing volcanic mountain with three cones: Kibo, Mawenzi, and Shira. Kilimanjaro is renowned for its diverse ecosystems, from rainforest to alpine desert, and attracts thousands of climbers each year.`,
        type: 'landmark',
        country: 'Tanzania',
        category: 'tourism'
      },
      {
        keywords: ['sahara', 'sahara desert', 'desert', 'north africa', 'erg', 'dunes'],
        title: 'The Sahara Desert',
        snippet: 'The Sahara is the largest hot desert in the world, spanning North Africa.',
        description: `Covering approximately 9.2 million square kilometers, the Sahara Desert stretches across several countries including Algeria, Chad, Egypt, Libya, Mali, Mauritania, Morocco, Niger, Western Sahara, Sudan, and Tunisia. It is known for its harsh climate, sand dunes, and unique flora and fauna adapted to arid conditions.`,
        type: 'landmark',
        country: 'North Africa',
        category: 'geography'
      },
      {
        keywords: ['nile', 'river nile', 'nile river', 'egypt', 'sudan', 'cairo'],
        title: 'The Nile River',
        snippet: 'The Nile is the longest river in Africa and the world.',
        description: `The Nile River flows over 6,650 kilometers (4,130 miles) through northeastern Africa, draining into the Mediterranean Sea. It is a vital water source for Egypt and Sudan, and is historically significant as the cradle of ancient Egyptian civilization.`,
        type: 'landmark',
        country: 'Egypt/Sudan',
        category: 'geography'
      },
      {
        keywords: ['pyramids', 'giza', 'egypt pyramids', 'ancient egypt', 'pharaohs', 'sphinx'],
        title: 'The Pyramids of Giza',
        snippet: 'The Pyramids of Giza are among the most iconic monuments in the world.',
        description: `Located near Cairo, Egypt, the Pyramids of Giza consist of three main pyramids built as royal tombs for the pharaohs. The Great Pyramid is the oldest of the Seven Wonders of the Ancient World and the only one still largely intact.`,
        type: 'landmark',
        country: 'Egypt',
        category: 'history'
      },
      {
        keywords: ['serengeti', 'safari', 'wildlife', 'tanzania', 'migration', 'big five'],
        title: 'Serengeti National Park',
        snippet: 'The Serengeti is one of Africa\'s most famous wildlife reserves and a UNESCO World Heritage Site.',
        description: `Serengeti National Park in Tanzania is renowned for its annual wildebeest migration, where over 1.5 million animals travel across the plains. The park is home to the Big Five (lion, leopard, elephant, buffalo, rhino) and offers some of the best wildlife viewing opportunities in Africa.`,
        type: 'landmark',
        country: 'Tanzania',
        category: 'tourism'
      },
      {
        keywords: ['table mountain', 'cape town', 'south africa', 'cable car', 'hiking'],
        title: 'Table Mountain',
        snippet: 'Table Mountain is a flat-topped mountain overlooking Cape Town, South Africa.',
        description: `Table Mountain is a prominent landmark in Cape Town, South Africa, and one of the New7Wonders of Nature. The mountain offers spectacular views of the city and coastline, accessible by cable car or hiking trails. It's home to diverse flora and fauna, including many endemic species.`,
        type: 'landmark',
        country: 'South Africa',
        category: 'tourism'
      },
      {
        keywords: ['maasai mara', 'kenya', 'safari', 'migration', 'wildlife', 'big five'],
        title: 'Maasai Mara National Reserve',
        snippet: 'The Maasai Mara is Kenya\'s most famous wildlife reserve and part of the Great Migration route.',
        description: `The Maasai Mara National Reserve in Kenya is world-renowned for its exceptional wildlife viewing and the annual wildebeest migration. The reserve is home to the Big Five and offers authentic cultural experiences with the Maasai people.`,
        type: 'landmark',
        country: 'Kenya',
        category: 'tourism'
      },
      {
        keywords: ['okavango delta', 'botswana', 'safari', 'wetland', 'wildlife', 'mokoro'],
        title: 'Okavango Delta',
        snippet: 'The Okavango Delta is one of Africa\'s most unique and pristine wilderness areas.',
        description: `The Okavango Delta in Botswana is the world's largest inland delta and a UNESCO World Heritage Site. This unique ecosystem supports diverse wildlife and offers exceptional safari experiences, including traditional mokoro (dugout canoe) trips through the waterways.`,
        type: 'landmark',
        country: 'Botswana',
        category: 'tourism'
      },
      {
        keywords: ['gorillas', 'mountain gorillas', 'rwanda', 'uganda', 'dian fossey', 'volcanoes'],
        title: 'Mountain Gorillas of Rwanda',
        snippet: 'Rwanda is home to critically endangered mountain gorillas in Volcanoes National Park.',
        description: `Volcanoes National Park in Rwanda is one of the few places in the world where you can see mountain gorillas in their natural habitat. Made famous by Dian Fossey's research, the park offers once-in-a-lifetime gorilla trekking experiences.`,
        type: 'landmark',
        country: 'Rwanda',
        category: 'tourism'
      },
      {
        keywords: ['zanzibar', 'spice island', 'stone town', 'tanzania', 'beaches', 'culture'],
        title: 'Zanzibar',
        snippet: 'Zanzibar is a semi-autonomous region of Tanzania known for its rich history and beautiful beaches.',
        description: `Zanzibar, also known as the Spice Island, is famous for its historic Stone Town (a UNESCO World Heritage Site), pristine beaches, and rich cultural heritage. The island offers a unique blend of African, Arab, and European influences.`,
        type: 'landmark',
        country: 'Tanzania',
        category: 'tourism'
      },
      {
        keywords: ['djenné', 'mali', 'mud mosque', 'unesco', 'architecture', 'sahel'],
        title: 'Great Mosque of Djenné',
        snippet: 'The Great Mosque of Djenné is the largest mud-brick building in the world.',
        description: `The Great Mosque of Djenné in Mali is the largest mud-brick building in the world and a UNESCO World Heritage Site. This architectural masterpiece represents the pinnacle of Sudano-Sahelian architecture and is a symbol of Islamic culture in West Africa.`,
        type: 'landmark',
        country: 'Mali',
        category: 'culture'
      }
    ];

    const q = query.toLowerCase();
    const matches = culturalData.filter(item => 
      item.keywords.some(keyword => q.includes(keyword.toLowerCase()))
    );

    return matches.map(item => ({
      ...item,
      type: 'cultural'
    }));
  },

  initIndex() {
    console.log('Enhanced African search engine initialized');
  }
};

export default searchEngine;
