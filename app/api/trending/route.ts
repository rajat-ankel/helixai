import { NextResponse } from 'next/server'

// Default example messages as fallback
const defaultExampleMessages = [
  {
    heading: 'What is DeepSeek R1?',
    message: 'What is DeepSeek R1?'
  },
  {
    heading: 'Why is Nvidia growing rapidly?',
    message: 'Why is Nvidia growing rapidly?'
  },
  {
    heading: 'Tesla vs Rivian',
    message: 'Tesla vs Rivian'
  },
  {
    heading: 'Summary: https://arxiv.org/pdf/2501.05707',
    message: 'Summary: https://arxiv.org/pdf/2501.05707'
  },
  {
    heading: 'Latest AI advancements in 2024',
    message: 'What are the latest AI advancements in 2024?'
  },
  {
    heading: 'Explain quantum computing',
    message: 'Explain quantum computing in simple terms'
  },
  {
    heading: 'Best programming languages to learn',
    message: 'What are the best programming languages to learn in 2024?'
  },
  {
    heading: 'Web development trends',
    message: 'What are the current trends in web development?'
  },
  {
    heading: 'Cybersecurity best practices',
    message: 'What are the best cybersecurity practices for small businesses?'
  },
  {
    heading: 'Machine learning vs deep learning',
    message: 'What is the difference between machine learning and deep learning?'
  },
  {
    heading: 'Future of autonomous vehicles',
    message: 'What is the future of autonomous vehicles?'
  },
  {
    heading: 'Blockchain applications',
    message: 'What are practical applications of blockchain beyond cryptocurrency?'
  }
]

export async function GET() {
  try {
    // Try to fetch trending topics from Google Trends API
    const response = await fetch(
      'https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=-480&geo=US&ns=15',
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (response.ok) {
      try {
        // Google Trends API returns a JSON with a prefix that needs to be removed
        const text = await response.text()
        const json = JSON.parse(text.substring(text.indexOf('{')))

        // Extract trending topics from the response
        const topics = json.default.trendingSearchesDays[0].trendingSearches
          .slice(0, 12) // Get more topics for rotation
          .map((trend: any) => ({
            heading: trend.title.query,
            message: trend.title.query
          }))

        return NextResponse.json({ topics })
      } catch (parseError) {
        console.error('Error parsing Google Trends response:', parseError)
        // Continue to fallback options
      }
    }
    
    // Fallback to Tavily API if Google Trends fails
    const apiKey = process.env.TAVILY_API_KEY
    if (apiKey) {
      try {
        const tavilyResponse = await fetch('https://api.tavily.com/trending', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
          },
          next: { revalidate: 3600 } // Cache for 1 hour
        })

        if (tavilyResponse.ok) {
          const tavilyData = await tavilyResponse.json()
          if (tavilyData.topics && tavilyData.topics.length > 0) {
            const topics = tavilyData.topics.slice(0, 12).map((topic: string) => ({
              heading: topic,
              message: topic
            }))

            return NextResponse.json({ topics })
          }
        }
      } catch (tavilyError) {
        console.error('Error fetching from Tavily API:', tavilyError)
        // Continue to default fallback
      }
    }

    // If all else fails, return default topics
    return NextResponse.json({ topics: defaultExampleMessages })
  } catch (error) {
    console.error('Error fetching trending topics:', error)
    return NextResponse.json(
      { topics: defaultExampleMessages, error: 'Failed to fetch trending topics' },
      { status: 500 }
    )
  }
}
