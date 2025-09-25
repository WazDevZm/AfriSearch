// Enhanced translation service for African languages
import axios from 'axios';

const translationService = {
  // Supported African languages
  supportedLanguages: {
    'sw': 'Swahili',
    'am': 'Amharic',
    'ha': 'Hausa',
    'yo': 'Yoruba',
    'ig': 'Igbo',
    'zu': 'Zulu',
    'xh': 'Xhosa',
    'af': 'Afrikaans',
    'ar': 'Arabic',
    'fr': 'French',
    'pt': 'Portuguese',
    'en': 'English'
  },

  async translate(text, targetLang, sourceLang = 'auto') {
    try {
      // For demo purposes, we'll use a mock translation service
      // In production, integrate with Google Translate API or similar
      const mockTranslations = {
        'sw': {
          'hello': 'Hujambo',
          'search': 'Tafuta',
          'business': 'Biashara',
          'news': 'Habari'
        },
        'ha': {
          'hello': 'Sannu',
          'search': 'Nemo',
          'business': 'Kasuwanni',
          'news': 'Labarai'
        },
        'yo': {
          'hello': 'Bawo',
          'search': 'Wa',
          'business': 'Owo',
          'news': 'Iroyin'
        }
      };

      if (mockTranslations[targetLang] && mockTranslations[targetLang][text.toLowerCase()]) {
        return {
          translatedText: mockTranslations[targetLang][text.toLowerCase()],
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
          confidence: 0.95
        };
      }

      // Fallback to original text
      return {
        translatedText: text,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        confidence: 0.5
      };
    } catch (error) {
      console.error('Translation error:', error);
      return {
        translatedText: text,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        confidence: 0.1
      };
    }
  },

  async detectLanguage(text) {
    // Simple language detection based on common words
    const languagePatterns = {
      'sw': ['hujambo', 'asante', 'karibu', 'pole', 'sawa'],
      'ha': ['sannu', 'na gode', 'barka', 'kai', 'to'],
      'yo': ['bawo', 'e se', 'o da', 'e ku', 'mo'],
      'ar': ['مرحبا', 'شكرا', 'السلام', 'كيف', 'أهلا'],
      'fr': ['bonjour', 'merci', 'salut', 'comment', 'bienvenue'],
      'pt': ['olá', 'obrigado', 'tchau', 'como', 'bem-vindo']
    };

    const textLower = text.toLowerCase();
    for (const [lang, patterns] of Object.entries(languagePatterns)) {
      if (patterns.some(pattern => textLower.includes(pattern))) {
        return lang;
      }
    }

    return 'en'; // Default to English
  },

  getSupportedLanguages() {
    return this.supportedLanguages;
  }
};

export default translationService;
