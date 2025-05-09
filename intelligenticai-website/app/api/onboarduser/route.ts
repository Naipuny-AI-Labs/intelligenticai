import { NextResponse } from "next/server"

// The specific API endpoint provided
const API_ENDPOINT = "https://intelligenticai-server.onrender.com/api/v1/onboarduser"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Add timestamps if they're not already present
    const submissionData = {
      ...data,
      createdDate: data.createdDate || new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      // Set initial status if not provided
      status: data.status || "pending",
      // Ensure requestType and agentids are included
      requestType: data.requestType || "try", // Default to "try" if not specified
      agentids: data.agentids || [], // Default to empty array if not specified
    }

    // Post directly to the provided endpoint
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("API error:", response.status, errorData)

      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit onboarding request",
          error: errorData,
        },
        { status: response.status },
      )
    }

    const responseData = await response.json()

    return NextResponse.json({
      success: true,
      message: "Onboarding request submitted successfully",
      data: responseData,
    })
  } catch (error) {
    console.error("Error submitting onboarding request:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit onboarding request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
