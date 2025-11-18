---
title: "Think"
date: 2025-05-20
excerpt: "an opensource user-friendly high-customizable pay-per-token LLM wrapper"
---

# Think

### Description 

A wrapper for access to different LLMs with pay-per-token pricing and different customization options. 

### Objective
Allows the user to be not tied to a single LLM provider, get suboptimal results from the existing subscription based aggregators and personalize their experience for the cost v/s quality tradeoff that they want to make for each query. Paradoxically, it has decent default parameters that work well for most normal queries. 

### Ideal Usage
User can have their LLM subscriptions with one of the providers and then use this to get answers when more compute is needed (or a minimum threshold of compute is needed). 

### Features
- *Pay-per-token pricing* - Transparent cost breakdown per token with detailed input, cached input, and output pricing to help users make informed cost decisions
- *Different customization options* - Flexible parameters for intelligence vs speed tradeoffs, context length adjustments, and specialized model configurations
- *Different LLMs* - Access to latest models including GPT-5, Claude Sonnet 4, Claude Opus 4.1, Grok variants, and other cutting-edge language models
- *Different providers* - Support for multiple providers (OpenAI, Anthropic, xAI, etc.) to avoid vendor lock-in and optimize for specific use cases
- *Privacy Options* - User-controlled data handling with options for local processing and secure API interactions
- *Data Portability* - Export conversation history, model outputs, and usage analytics in standard formats
- *System Prompts* - Customizable system-level instructions and persona definitions for consistent interaction patterns
- *RAG Based Retrieval of Context* - Intelligent context retrieval from documents, knowledge bases, and previous conversations
- *Model Comparison Dashboard* - Side-by-side performance metrics, capability ratings, and cost analysis for informed model selection
- *Usage Analytics* - Real-time tracking of token consumption, cost optimization insights, and performance monitoring
- *Smart Model Routing* - Automatic model selection based on query complexity, cost preferences, and performance requirements
- *Search & Filter Interface* - Easy model discovery with filtering by capabilities, cost, speed, and provider preferences