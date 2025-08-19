const SPARQL_ENDPOINT = process.env.SPARQL_ENDPOINT || 'https://graphdb-on-railway-production-e50e.up.railway.app/repositories/booklist';

export interface SparqlResult {
  head: {
    vars: string[];
  };
  results: {
    bindings: Array<{
      [key: string]: {
        type: string;
        value: string;
      };
    }>;
  };
}

export async function runSparqlQuery(query: string): Promise<SparqlResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

    const response = await fetch(SPARQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query',
        'Accept': 'application/sparql-results+json',
      },
      body: query,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`SPARQL query failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('SPARQL query timeout');
      throw new Error('SPARQL query timeout');
    }
    console.error('SPARQL query error:', error);
    throw error;
  }
}

// 감정 기반 책 검색
export async function searchBooksByEmotion(emotions: string[]): Promise<any[]> {
  const emotionFilters = emotions.map(emotion => `book:${emotion}`).join(', ');
  
  const query = `
    PREFIX book: <http://book-ontology.com#>
    
    SELECT DISTINCT ?book ?title ?author ?summary WHERE {
      ?book a book:Book ;
            book:title ?title ;
            book:authorName ?author ;
            book:hasEmotionalTheme ?theme .
      ?theme book:hasAnalysis ?analysis .
      ?analysis a book:EmotionAnalysis ;
                (book:base_emotion|book:components) ?emotion .
      FILTER (?emotion IN (${emotionFilters}))
      OPTIONAL { ?book book:summary ?summary }
    }
    LIMIT 10
  `;

  const result = await runSparqlQuery(query);
  return result.results.bindings.map(binding => ({
    title: binding.title?.value || '',
    author: binding.author?.value || '',
    summary: binding.summary?.value || '',
  }));
}

// 장르 기반 책 검색
export async function searchBooksByGenre(genres: string[]): Promise<any[]> {
  const genreFilters = genres.map(genre => `book:${genre}`).join(', ');
  
  const query = `
    PREFIX book: <http://book-ontology.com#>
    
    SELECT DISTINCT ?book ?title ?author ?summary WHERE {
      ?book a book:Book ;
            book:title ?title ;
            book:authorName ?author ;
            book:hasGenreTag ?genre .
      FILTER (?genre IN (${genreFilters}))
      OPTIONAL { ?book book:summary ?summary }
    }
    LIMIT 10
  `;

  const result = await runSparqlQuery(query);
  return result.results.bindings.map(binding => ({
    title: binding.title?.value || '',
    author: binding.author?.value || '',
    summary: binding.summary?.value || '',
  }));
}

// 주제/시나리오 기반 책 검색
export async function searchBooksByScenario(scenarios: string[]): Promise<any[]> {
  const scenarioFilters = scenarios.map(scenario => `book:${scenario}`).join(', ');
  
  const query = `
    PREFIX book: <http://book-ontology.com#>
    
    SELECT DISTINCT ?book ?title ?author ?summary WHERE {
      ?book a book:Book ;
            book:title ?title ;
            book:authorName ?author ;
            book:recommendedForScenario ?scenario .
      FILTER (?scenario IN (${scenarioFilters}))
      OPTIONAL { ?book book:summary ?summary }
    }
    LIMIT 10
  `;

  const result = await runSparqlQuery(query);
  return result.results.bindings.map(binding => ({
    title: binding.title?.value || '',
    author: binding.author?.value || '',
    summary: binding.summary?.value || '',
  }));
}

// 복합 검색 (감정 + 장르)
export async function searchBooksComplex(emotions: string[], genres: string[]): Promise<any[]> {
  const emotionFilters = emotions.length > 0 ? emotions.map(emotion => `book:${emotion}`).join(', ') : '';
  const genreFilters = genres.length > 0 ? genres.map(genre => `book:${genre}`).join(', ') : '';
  
  let query = `
    PREFIX book: <http://book-ontology.com#>
    
    SELECT DISTINCT ?book ?title ?author ?summary WHERE {
      ?book a book:Book ;
            book:title ?title ;
            book:authorName ?author .
  `;

  if (emotions.length > 0) {
    query += `
      ?book book:hasEmotionalTheme ?theme .
      ?theme book:hasAnalysis ?analysis .
      ?analysis a book:EmotionAnalysis ;
                (book:base_emotion|book:components) ?emotion .
      FILTER (?emotion IN (${emotionFilters}))
    `;
  }

  if (genres.length > 0) {
    query += `
      ?book book:hasGenreTag ?genre .
      FILTER (?genre IN (${genreFilters}))
    `;
  }

  query += `
      OPTIONAL { ?book book:summary ?summary }
    }
    LIMIT 10
  `;

  const result = await runSparqlQuery(query);
  return result.results.bindings.map(binding => ({
    title: binding.title?.value || '',
    author: binding.author?.value || '',
    summary: binding.summary?.value || '',
  }));
}
