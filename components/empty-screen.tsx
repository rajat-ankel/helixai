'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, RefreshCw, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  }
]

export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  const [trendingTopics, setTrendingTopics] = useState<Array<{heading: string, message: string}>>(defaultExampleMessages)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
  const [displayedTopics, setDisplayedTopics] = useState<Array<{heading: string, message: string}>>(defaultExampleMessages)

  const fetchTrendingTopics = async () => {
    setIsLoading(true)
    try {
      // Fetch trending topics from our API route
      const response = await fetch('/api/trending')
      
      if (response.ok) {
        const data = await response.json()
        if (data.topics && Array.isArray(data.topics) && data.topics.length > 0) {
          // Get more topics than we display at once
          setTrendingTopics(data.topics.slice(0, 12))
        } else {
          setTrendingTopics(defaultExampleMessages)
        }
      } else {
        console.error('Failed to fetch trending topics')
        setTrendingTopics(defaultExampleMessages)
      }
    } catch (error) {
      console.error('Error fetching trending topics:', error)
      setTrendingTopics(defaultExampleMessages)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch trending topics on component mount
  useEffect(() => {
    fetchTrendingTopics()
    
    // Refresh trending topics every 30 minutes
    const intervalId = setInterval(() => {
      fetchTrendingTopics()
    }, 30 * 60 * 1000)
    
    return () => clearInterval(intervalId)
  }, [])

  // Rotate displayed topics every 10 seconds
  useEffect(() => {
    if (trendingTopics.length <= 4) {
      setDisplayedTopics(trendingTopics)
      return
    }
    
    // Initial set of displayed topics
    updateDisplayedTopics()
    
    // Set up interval to rotate topics
    const rotationInterval = setInterval(() => {
      setCurrentTopicIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % (trendingTopics.length - 3)
        return newIndex
      })
    }, 10000)
    
    return () => clearInterval(rotationInterval)
  }, [trendingTopics])
  
  // Update displayed topics when currentTopicIndex changes
  useEffect(() => {
    updateDisplayedTopics()
  }, [currentTopicIndex])
  
  const updateDisplayedTopics = () => {
    if (trendingTopics.length <= 4) {
      setDisplayedTopics(trendingTopics)
      return
    }
    
    // Get 4 topics starting from currentTopicIndex
    const topics = []
    for (let i = 0; i < 4; i++) {
      const index = (currentTopicIndex + i) % trendingTopics.length
      topics.push(trendingTopics[index])
    }
    setDisplayedTopics(topics)
  }

  // Manual refresh handler
  const handleRefresh = () => {
    fetchTrendingTopics()
  }

  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-primary">
            <TrendingUp size={16} className="mr-1" />
            <span>Trending Topics</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={14} className={`${isLoading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Refresh topics</span>
          </Button>
        </div>
        <div className="mt-2 flex flex-col items-start space-y-2 mb-4">
          {isLoading ? (
            // Show loading state
            Array(4).fill(0).map((_, index) => (
              <div 
                key={index} 
                className="h-6 w-full max-w-[250px] bg-muted animate-pulse rounded"
              />
            ))
          ) : (
            // Show trending topics with animation
            displayedTopics.map((message, index) => (
              <Button
                key={`${currentTopicIndex}-${index}`}
                variant="link"
                className="h-auto p-0 text-base transition-all duration-500 ease-in-out"
                name={message.message}
                onClick={async () => {
                  submitMessage(message.message)
                }}
              >
                <ArrowRight size={16} className="mr-2 text-muted-foreground" />
                {message.heading}
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
