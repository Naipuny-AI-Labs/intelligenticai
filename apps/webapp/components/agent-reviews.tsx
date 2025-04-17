import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Agent } from "@/lib/types"

interface AgentReviewsProps {
  agent: Agent
}

export function AgentReviews({ agent }: AgentReviewsProps) {
  // This would typically come from an API or database
  const reviews = [
    {
      id: 1,
      author: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2 weeks ago",
      content:
        "This agent has completely transformed how I handle my daily tasks. The natural language processing is incredibly accurate, and it integrates seamlessly with all my existing tools.",
    },
    {
      id: 2,
      author: "Jamie Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "1 month ago",
      content:
        "Very impressed with the capabilities. It took a little time to set up properly for my specific needs, but once configured, it's been a game-changer for productivity.",
    },
    {
      id: 3,
      author: "Sam Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2 months ago",
      content:
        "The best AI assistant I've used so far. Responsive, accurate, and actually helpful unlike some other solutions I've tried.",
    },
  ]

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="pb-6 border-b last:border-b-0 last:pb-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.author} />
                <AvatarFallback>
                  {review.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.author}</div>
                <div className="text-xs text-muted-foreground">{review.date}</div>
              </div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-sm">{review.content}</p>
        </div>
      ))}
    </div>
  )
}
