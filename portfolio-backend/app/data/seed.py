"""Seed data — the source of truth for Phase 1.

When Supabase persistence lands (Phase 2), the service layer will read from a
repository interface instead of these dictionaries, but the shape of the
records will be preserved.
"""
from datetime import date


PROFILE = {
    "name": "Yasser Hosny Abu Elmakarem",
    "brand": "Yasser Hosny, MBA",
    "title": "Software Development Senior Team Lead at Arrow Electronics / SiliconExpert",
    "location": "Egypt",
    "positioning": [
        "Founder Engineer",
        "Software Development Senior Team Lead",
        "Product-minded software leader",
        "Enterprise software architect",
        "AI-enabled product builder",
    ],
    "hero_headline": "I turn complex business problems into scalable software products.",
    "hero_subtitle": (
        "I'm Yasser Hosny, MBA — a Software Development Senior Team Lead with 20 "
        "years of experience leading engineering teams, designing enterprise systems, "
        "and building scalable applications across .NET, Java, Python, Angular, React, "
        "AI, and cloud technologies."
    ),
    "supporting_line": (
        "I combine software architecture, team leadership, AI-enabled product "
        "thinking, and business education to help move ideas from concept to MVP "
        "to production-ready platforms."
    ),
    "summary": (
        "Results-driven Senior Software Team Leader with 20 years of experience "
        "in software development, team leadership, and enterprise solutions "
        "architecture. Leads cross-functional engineering teams, optimizes "
        "software processes, and delivers scalable applications across .NET, "
        "Java, Python, Angular, React, AI tools, cloud computing, microservices, "
        "REST APIs, and event-driven architecture."
    ),
    "founder_summary": (
        "Yasser aims to create, develop, and establish successful software "
        "products that serve multiple business fields — moving from business "
        "problem to MVP, from MVP to scalable software, and from technical "
        "execution to product leadership."
    ),
    "snapshot": [
        {"label": "Experience", "value": "20 Years Software Experience"},
        {"label": "Role", "value": "Senior Team Lead"},
        {"label": "Business", "value": "MBA — Business Administration"},
        {"label": "Focus", "value": "AI & Enterprise Software"},
        {"label": "Delivery", "value": "Multi-region Client Delivery"},
        {"label": "Mindset", "value": "Product-Minded Engineering"},
        {"label": "Open Source", "value": "9 Public GitHub Repos"},
    ],
    "process_flow": [
        "Business Problem",
        "MVP",
        "Architecture",
        "Product",
        "Scale",
    ],
    "experience": [
        {
            "company": "Arrow Electronics / SiliconExpert",
            "role": "Senior Software Development Team Lead",
            "period": "January 2020 – Present",
            "highlights": [
                "Lead multidisciplinary teams of backend, frontend, QA, and AI developers.",
                "Architect and design scalable systems using microservices and event-driven architecture.",
                "Plan sprints, size stories, break down tasks, and align technical roadmaps with business needs.",
                "Mentor engineers and promote clean architecture, DevOps, CI/CD, and engineering best practices.",
                "Lead adoption of AI-powered solutions to optimize data processing and automation workflows.",
                "Integrate large-scale systems across Germany, the US, and Europe.",
                "Troubleshoot and enhance large-scale Transim projects.",
                "Manage and enhance the MOVE platform.",
                "Extend customer websites such as Maxim Integrated and Vishay.",
                "Work with MVC, Web Forms, Core APIs, Python, jQuery, Knockout, Angular 2+, SQL Server, MongoDB, and Elasticsearch.",
            ],
            "tags": [
                "Leadership",
                "Microservices",
                "Event-Driven",
                "AI",
                ".NET",
                "Angular",
                "Python",
            ],
        },
        {
            "company": "Z2DATA",
            "role": "Technical Team Lead / Team Leader Software Developer",
            "period": "May 2017 – January 2020",
            "highlights": [
                "Led development of a high-performance web-based NLP and big data processing platform.",
                "Designed and implemented machine learning models for text classification and information extraction.",
                "Built real-time news crawling and analysis using Elasticsearch, SOLR, and Google Maps API.",
                "Developed dashboards and reporting tools for market intelligence and financial insights.",
            ],
            "tags": ["NLP", "Machine Learning", "Elasticsearch", "SOLR", "Dashboards"],
        },
        {
            "company": "GCSSD",
            "role": "Senior .NET Developer",
            "period": "March 2016 – May 2017",
            "highlights": [
                "Led CRM solutions for US and Canadian clients.",
                "Built customer sales dashboards, dynamic reporting, and Google Maps-based tracking.",
                "Improved multi-tenant architecture security and scalability.",
            ],
            "tags": [".NET", "CRM", "Multi-Tenant", "Dashboards"],
        },
        {
            "company": "MicrodataEgypt, Farminal Technologies, Rewaya Eg-Com, Freelance, PcPower",
            "role": "Software Developer / DBA / ERP Engineer",
            "period": "2008 – 2016",
            "highlights": [
                "Designed and developed ERP systems for hospitals, farms, and trading companies.",
                "Built stock control, HR, finance, and sales modules.",
                "Worked as developer, DBA, and troubleshooter.",
                "Used .NET, Visual Studio, Crystal Reports, and SQL Server.",
            ],
            "tags": ["ERP", ".NET", "SQL Server", "Crystal Reports"],
        },
    ],
    "education": [
        {
            "institution": "Faculty of Computers and Information, Menoufia University",
            "degree": "Bachelor of Computer Science",
            "period": "2006",
        },
        {
            "institution": "Arab Academy for Science, Technology and Maritime Transport",
            "degree": "MBA, Business Administration and Management",
            "period": "2023 – 2025",
        },
    ],
    "startup_value": [
        "Build MVPs from scratch",
        "Design scalable backend architecture",
        "Lead engineering teams",
        "Translate business problems into software systems",
        "Build data-driven and AI-enabled products",
        "Improve delivery processes",
        "Mentor developers",
        "Connect business goals with technical execution",
        "Move from idea to production",
    ],
    "contact": {
        "linkedin": "https://www.linkedin.com/in/yasser-hosny-mba-02832020",
        "email": "yasser2006_6@yahoo.com",
        "email_secondary": "yasserhonsy@gmail.com",
        "github": "https://github.com/YasserHosny",
    },
}


PRODUCT_LAB = [
    {
        "slug": "ai-market-intelligence",
        "title": "AI-Powered Market Intelligence Platform",
        "description": (
            "A product inspired by NLP, big data, news crawling, dashboards, and "
            "market intelligence experience."
        ),
        "problem": (
            "Teams need faster ways to collect, classify, and understand market "
            "signals from large volumes of data."
        ),
        "target_users": "Market intelligence analysts, corporate strategy teams, VC scouts.",
        "mvp_scope": [
            "News crawling",
            "Classification",
            "Search",
            "Dashboards",
            "Alerts",
            "AI summaries",
        ],
        "status": "Concept / MVP scope defined",
        "tags": ["NLP", "Machine Learning", "Elasticsearch", "SOLR", "Dashboards", "AI"],
    },
    {
        "slug": "reusable-payment-gateway-core",
        "title": "Reusable Payment Gateway Core",
        "description": (
            "A provider-abstracted payment service for web, mobile, and desktop applications."
        ),
        "problem": (
            "Applications often duplicate payment logic and become tightly coupled to one payment provider."
        ),
        "target_users": "SaaS builders, marketplace teams, mobile-first product teams.",
        "mvp_scope": [
            "Provider abstraction",
            "Stripe integration",
            "Transaction logging",
            "Web/mobile API support",
        ],
        "status": "Concept",
        "tags": ["Payments", "Stripe", "API Design", "Python", "Angular", "Flutter"],
    },
    {
        "slug": "business-automation-platform",
        "title": "Business Automation Platform",
        "description": (
            "A configurable workflow and business process automation platform for SMEs and enterprise teams."
        ),
        "problem": (
            "Many teams still manage approvals, requests, and operational workflows manually."
        ),
        "target_users": "Ops leaders in SMEs, mid-market HR/finance teams.",
        "mvp_scope": [
            "Workflow builder",
            "Request tracking",
            "Role-based approvals",
            "Dashboards",
            "Notifications",
        ],
        "status": "Concept",
        "tags": ["Workflow", "Automation", "Enterprise Software", "SaaS"],
    },
    {
        "slug": "ai-product-documentation",
        "title": "AI-Assisted Product Documentation Platform",
        "description": (
            "A tool for generating, organizing, and maintaining product documentation using generative AI."
        ),
        "problem": (
            "Product and engineering teams struggle to keep documentation clear, updated, and connected to delivery."
        ),
        "target_users": "Product managers, tech leads, developer relations teams.",
        "mvp_scope": [
            "AI documentation generation",
            "Product notes",
            "Release notes",
            "Roadmap summaries",
        ],
        "status": "Concept",
        "tags": ["Generative AI", "Documentation", "Product Management", "Knowledge Base"],
    },
    {
        "slug": "price-monitoring-platform",
        "title": "Price Monitoring and Product Tracking Platform",
        "description": (
            "A platform for monitoring product prices, tracking changes, and notifying users when prices reach target levels."
        ),
        "problem": "Users need a simple way to track products and avoid missing price drops.",
        "target_users": "Consumers, resellers, procurement analysts.",
        "mvp_scope": [
            "Product tracking",
            "Price crawling",
            "Alerts",
            "History",
            "Comparison",
        ],
        "status": "Concept",
        "tags": ["Python", "Angular", "Crawling", "Notifications", "Product Tracking"],
    },
    {
        "slug": "founder-operating-system",
        "title": "Founder Operating System",
        "description": (
            "A personal platform for managing professional updates, case studies, experiments, certifications, and startup ideas."
        ),
        "problem": (
            "Technical founders need a structured way to show progress, credibility, and product thinking."
        ),
        "target_users": "Founder engineers, indie hackers, senior consultants.",
        "mvp_scope": [
            "Updates dashboard",
            "Case studies",
            "Product lab",
            "Professional timeline",
            "Content management",
        ],
        "status": "MVP — this portfolio",
        "tags": ["Portfolio", "Founder Tools", "Personal CRM", "Product Lab"],
    },
]


CASE_STUDIES = [
    {
        "slug": "enterprise-leadership-arrow-siliconexpert",
        "title": "Enterprise Engineering Leadership at Arrow Electronics / SiliconExpert",
        "problem": (
            "Large-scale enterprise software requires reliable architecture, delivery "
            "coordination, cross-functional leadership, and scalable technical practices."
        ),
        "role": (
            "Senior Software Development Team Lead responsible for leading backend, "
            "frontend, QA, and AI developers, planning delivery, mentoring engineers, "
            "and aligning technical execution with business needs."
        ),
        "solution": (
            "Led agile delivery, promoted clean architecture, improved DevOps and CI/CD "
            "practices, supported scalable system design using microservices and "
            "event-driven architecture, and helped integrate large systems across US "
            "and European contexts."
        ),
        "business_impact": (
            "Improved delivery reliability, strengthened team execution, supported "
            "scalable enterprise solutions, and aligned engineering output with business goals."
        ),
        "tags": ["Leadership", "Enterprise Software", "Microservices", "Event-Driven Architecture", "DevOps", "AI"],
    },
    {
        "slug": "transim-move-platform",
        "title": "Transim and MOVE Platform Enhancement",
        "problem": (
            "Large-scale engineering platforms required troubleshooting, modernization, "
            "customer website enhancements, simulations, dashboards, and reliable integration."
        ),
        "role": (
            "Technical lead responsible for troubleshooting inherited systems, enhancing "
            "customer platforms, supporting electronic circuit design workflows, and managing integrations."
        ),
        "solution": (
            "Enhanced Transim customer websites such as Maxim Integrated and Vishay, "
            "implemented CRUD operations and dashboards, supported circuit simulation "
            "integration, improved efficiency validation, and contributed to the MOVE project."
        ),
        "business_impact": (
            "Improved platform stability, extended customer-facing capabilities, and "
            "supported business-critical engineering workflows."
        ),
        "tags": [".NET", "MVC", "Web Forms", "Core APIs", "Python", "Angular", "jQuery", "Knockout", "SQL Server", "MongoDB", "Elasticsearch"],
    },
    {
        "slug": "nlp-big-data-z2data",
        "title": "NLP and Big Data Intelligence Platform at Z2DATA",
        "problem": (
            "Business teams needed high-performance data processing, news crawling, NLP, "
            "classification, and market intelligence dashboards."
        ),
        "role": (
            "Technical Team Lead responsible for leading development, designing machine "
            "learning models, and delivering dashboard and reporting capabilities."
        ),
        "solution": (
            "Built a web-based NLP and big data platform, implemented text classification "
            "and information extraction models, created real-time news crawling and "
            "analysis, and used Elasticsearch, SOLR, and Google Maps API."
        ),
        "business_impact": (
            "Enabled better market intelligence, financial insight analysis, and "
            "data-driven decision support."
        ),
        "tags": ["NLP", "Machine Learning", "Elasticsearch", "SOLR", "Google Maps API", "Big Data", "Dashboards"],
    },
    {
        "slug": "crm-multitenant-applications",
        "title": "CRM and Multi-Tenant Business Applications",
        "problem": (
            "US and Canadian clients needed CRM solutions with dashboards, reporting, "
            "geographic tracking, and scalable multi-tenant architecture."
        ),
        "role": (
            "Senior .NET Developer responsible for leading development, integrating "
            "dashboards, and improving architecture."
        ),
        "solution": (
            "Built CRM capabilities, sales dashboards, dynamic reporting, and Google "
            "Maps-based tracking while improving multi-tenant security and scalability."
        ),
        "business_impact": (
            "Improved customer visibility, reporting efficiency, and application scalability."
        ),
        "tags": [".NET", "CRM", "Multi-Tenant Architecture", "Dashboards", "Google Maps", "Reporting"],
    },
    {
        "slug": "erp-multiple-business-domains",
        "title": "ERP Systems for Multiple Business Domains",
        "problem": (
            "Hospitals, farms, and trading companies needed tailored ERP systems for "
            "operations, stock, HR, finance, and sales."
        ),
        "role": (
            "ERP System Architect and Developer responsible for designing and "
            "implementing multi-tier business applications."
        ),
        "solution": (
            "Built ERP modules for stock control, HR, finance, sales, document "
            "processing, PDF extraction, and business workflows."
        ),
        "business_impact": (
            "Digitized core operations for multiple business domains and improved "
            "process management."
        ),
        "tags": ["ERP", ".NET", "SQL Server", "Crystal Reports", "Multi-Tier Architecture", "Business Applications"],
    },
]


UPDATES = [
    {
        "id": "u-000",
        "title": "Pushed FormCraft — configurable form builder",
        "type": "Release",
        "date": date(2026, 6, 22),
        "description": "Continued work on FormCraft, a Python form builder for dynamic schemas and business workflows.",
        "tags": ["Python", "Forms", "Workflow"],
        "link": "https://github.com/YasserHosny/FormCraft",
    },
    {
        "id": "u-000b",
        "title": "Pushed paygateway — reusable payment gateway",
        "type": "Release",
        "date": date(2026, 6, 19),
        "description": "Provider-abstracted payment service in Python — reusable across web, mobile, and desktop apps.",
        "tags": ["Python", "Payments", "API Design"],
        "link": "https://github.com/YasserHosny/paygateway",
    },
    {
        "id": "u-001",
        "title": "Added Founder Engineer portfolio direction",
        "type": "Release",
        "date": date(2026, 6, 1),
        "description": "Repositioned the personal portfolio as a Founder Engineer platform focused on scalable products, leadership, and AI-enabled solutions.",
        "tags": ["Portfolio", "Positioning"],
        "link": None,
    },
    {
        "id": "u-001b",
        "title": "Pushed voice_chat_api — conversational voice service",
        "type": "Release",
        "date": date(2025, 8, 21),
        "description": "Real-time voice chat backed by LLM-driven responses, in Python.",
        "tags": ["Python", "Voice", "LLM"],
        "link": "https://github.com/YasserHosny/voice_chat_api",
    },
    {
        "id": "u-002",
        "title": "Added AI-assisted Product Documentation learning milestone",
        "type": "Learning",
        "date": date(2026, 5, 20),
        "description": "Explored workflows for generating and maintaining product documentation with generative AI.",
        "tags": ["Generative AI", "Product Management", "Documentation"],
        "link": None,
    },
    {
        "id": "u-003",
        "title": "Added OpenAI API: Agents certification",
        "type": "Certification",
        "date": date(2026, 5, 5),
        "description": "Completed hands-on work with the OpenAI Agents API — tool use, orchestration, guardrails.",
        "tags": ["OpenAI", "Agents", "AI"],
        "link": None,
    },
    {
        "id": "u-004",
        "title": "Added Model Context Protocol: Hands-On with Agentic AI",
        "type": "Certification",
        "date": date(2026, 4, 22),
        "description": "Practical work with MCP servers, tool schemas, and agent-to-tool contracts.",
        "tags": ["MCP", "Agentic AI"],
        "link": None,
    },
    {
        "id": "u-005",
        "title": "Added product roadmap using Generative AI learning",
        "type": "Learning",
        "date": date(2026, 4, 5),
        "description": "Applied generative AI to structure product roadmaps, user stories, and release notes.",
        "tags": ["Product Roadmap", "Generative AI"],
        "link": None,
    },
    {
        "id": "u-006",
        "title": "Added Clean Architecture certification",
        "type": "Certification",
        "date": date(2026, 3, 12),
        "description": "Reinforced boundary-first design and dependency inversion at the application level.",
        "tags": ["Clean Architecture", "Design"],
        "link": None,
    },
    {
        "id": "u-007",
        "title": "Added DevSecOps learning milestone",
        "type": "Learning",
        "date": date(2026, 2, 27),
        "description": "Deep dive into DevSecOps — securing pipelines, secrets, and supply chain.",
        "tags": ["DevSecOps", "Security"],
        "link": None,
    },
]


CAPABILITY_GROUPS = [
    {
        "group": "Backend Engineering",
        "description": "Server-side platforms, APIs, and enterprise integrations.",
        "items": [".NET Core", "ASP.NET MVC", "Web API", "Java", "Python", "REST APIs"],
    },
    {
        "group": "Frontend Engineering",
        "description": "Rich single-page applications and modern web UIs.",
        "items": ["Angular", "React", "TypeScript", "JavaScript", "jQuery", "Knockout", "SCSS"],
    },
    {
        "group": "Data, Search & AI",
        "description": "Data platforms, search infrastructure, and AI-powered systems.",
        "items": [
            "SQL Server",
            "PostgreSQL",
            "MongoDB",
            "Elasticsearch",
            "SOLR",
            "Machine Learning",
            "NLP",
            "Generative AI",
            "LLMs",
        ],
    },
    {
        "group": "Architecture & Integration",
        "description": "Scalable, decoupled systems that survive real-world scale.",
        "items": [
            "Microservices",
            "Event-Driven Architecture",
            "N-tier Architecture",
            "System Integration",
            "Scalable Platforms",
        ],
    },
    {
        "group": "Cloud & DevOps",
        "description": "Repeatable delivery, containerized platforms, cloud infrastructure.",
        "items": ["Docker", "CI/CD", "Jenkins", "GitHub Actions", "AWS", "Octopus Deploy"],
    },
    {
        "group": "Leadership & Delivery",
        "description": "Team leadership and modern engineering delivery practices.",
        "items": [
            "Team Leadership",
            "Agile / Scrum",
            "Sprint Planning",
            "Mentoring",
            "Stakeholder Communication",
            "Technical Roadmaps",
        ],
    },
    {
        "group": "Product & Business",
        "description": "MBA-grounded product and business thinking around software.",
        "items": [
            "MBA",
            "Product Roadmaps",
            "User Personas",
            "Business Goals",
            "MVP Thinking",
            "AI-assisted Product Documentation",
        ],
    },
    {
        "group": "Security & Compliance",
        "description": "Secure software delivery and personal data protection.",
        "items": [
            "Application Security",
            "DevSecOps",
            "Anti-phishing",
            "Personal Data Protection",
            "GDPR",
        ],
    },
]


LEARNING_THEMES = [
    "Agentic AI and AI agents",
    "OpenAI API and AI product development",
    "Generative AI for product work",
    "Agile engineering leadership",
    "Technical communication",
    "DevSecOps and secure software",
    "Product roadmap and user research",
    "Clean architecture",
    "Elasticsearch",
    "Prompt engineering",
    "Angular, Python, SQL, Machine Learning",
    "Amazon Bedrock",
]


PROJECTS = [
    {
        "slug": "formcraft",
        "name": "FormCraft",
        "description": "Configurable form builder — dynamic schemas, validation, and rendering for business workflows.",
        "language": "Python",
        "tags": ["Python", "Forms", "Workflow", "Automation"],
        "repo_url": "https://github.com/YasserHosny/FormCraft",
        "homepage_url": None,
        "last_push": date(2026, 6, 22),
        "highlight": True,
        "linked_product_lab_slug": "business-automation-platform",
    },
    {
        "slug": "paygateway",
        "name": "paygateway",
        "description": "Payment gateway, general usage — provider-abstracted payment service for reuse across web, mobile, and desktop apps.",
        "language": "Python",
        "tags": ["Python", "Payments", "API Design", "Fintech"],
        "repo_url": "https://github.com/YasserHosny/paygateway",
        "homepage_url": None,
        "last_push": date(2026, 6, 19),
        "highlight": True,
        "linked_product_lab_slug": "reusable-payment-gateway-core",
    },
    {
        "slug": "voice-chat-api",
        "name": "voice_chat_api",
        "description": "Conversational voice API — real-time voice chat backed by LLM-driven responses.",
        "language": "Python",
        "tags": ["Python", "Voice", "LLM", "API"],
        "repo_url": "https://github.com/YasserHosny/voice_chat_api",
        "homepage_url": None,
        "last_push": date(2025, 8, 21),
        "highlight": True,
        "linked_product_lab_slug": None,
    },
    {
        "slug": "newsfeed-system",
        "name": "NewsFeedSystem",
        "description": "Newsfeed engine — content ingestion, ranking, and delivery patterns for social/product feeds.",
        "language": "Python",
        "tags": ["Python", "Feeds", "Ranking", "System Design"],
        "repo_url": "https://github.com/YasserHosny/NewsFeedSystem",
        "homepage_url": None,
        "last_push": date(2025, 5, 17),
        "highlight": False,
        "linked_product_lab_slug": None,
    },
    {
        "slug": "chatgpt-crawl",
        "name": "ChatGPTCrawl",
        "description": "Crawler + ChatGPT integration for structured extraction from web sources.",
        "language": "Python",
        "tags": ["Python", "Crawling", "ChatGPT", "AI"],
        "repo_url": "https://github.com/YasserHosny/ChatGPTCrawl",
        "homepage_url": None,
        "last_push": date(2024, 10, 7),
        "highlight": False,
        "linked_product_lab_slug": None,
    },
    {
        "slug": "voice-recognition-api",
        "name": "voice-recognition-api",
        "description": "Recognize voice and use ChatGPT to handle voice orders.",
        "language": "Python",
        "tags": ["Python", "Speech", "ChatGPT", "API"],
        "repo_url": "https://github.com/YasserHosny/voice-recognition-api",
        "homepage_url": None,
        "last_push": date(2024, 7, 18),
        "highlight": False,
        "linked_product_lab_slug": None,
    },
    {
        "slug": "llama-question-answering",
        "name": "Llama-Question-answering",
        "description": "Question answering using Llama models — retrieval + generation pipeline.",
        "language": "Python",
        "tags": ["Python", "LLM", "Llama", "QA"],
        "repo_url": "https://github.com/YasserHosny/Llama-Question-answering",
        "homepage_url": None,
        "last_push": date(2023, 10, 12),
        "highlight": False,
        "linked_product_lab_slug": None,
    },
    {
        "slug": "question-answering",
        "name": "Question-answering",
        "description": "General-purpose question-answering system experiments.",
        "language": "Python",
        "tags": ["Python", "NLP", "QA"],
        "repo_url": "https://github.com/YasserHosny/Question-answering",
        "homepage_url": None,
        "last_push": date(2023, 8, 25),
        "highlight": False,
        "linked_product_lab_slug": None,
    },
    {
        "slug": "automapper",
        "name": "AutoMapper",
        "description": "A convention-based object-object mapper in .NET.",
        "language": "C#",
        "tags": ["C#", ".NET", "Mapping", "Library"],
        "repo_url": "https://github.com/YasserHosny/AutoMapper",
        "homepage_url": None,
        "last_push": date(2017, 6, 1),
        "highlight": False,
        "linked_product_lab_slug": None,
    },
]


CERTIFICATIONS = [
    {"name": "Model Context Protocol: Hands-On with Agentic AI", "theme": "Agentic AI"},
    {"name": "OpenAI API: Agents", "theme": "AI product development"},
    {"name": "Get Ready for Generative AI", "theme": "Generative AI"},
    {"name": "Managing and Leading Developers: Agile Software Development", "theme": "Leadership"},
    {"name": "Effective Technical Communication", "theme": "Communication"},
    {"name": "Create AI-assisted Product Documentation", "theme": "Product Docs + AI"},
    {"name": "DevOps Foundations: DevSecOps", "theme": "DevSecOps"},
    {"name": "Clean Architecture", "theme": "Architecture"},
    {"name": "Developing Secure Software", "theme": "Security"},
    {"name": "ChatGPT Prompt Engineering for Developers", "theme": "Prompt Engineering"},
    {"name": "Introduction to Amazon Bedrock", "theme": "AWS AI"},
]
