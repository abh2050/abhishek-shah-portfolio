import { useEffect } from 'react';
import Typed from 'typed.js';
import ScrollReveal from 'scrollreveal';

const Portfolio = () => {
  useEffect(() => {
    // Initialize Typed.js
    const typedOptions = {
      strings: [
        'Senior Data Scientist',
        'AI/ML Engineer', 
        'Cloud Solutions Architect',
        'Generative AI & MLOps Expert'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    };

    const typed = new Typed('.multiple-text', typedOptions);

    // Initialize ScrollReveal
    const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true
    });

    sr.reveal('.home', { origin: 'left' });
    sr.reveal('.about', { origin: 'right' });
    sr.reveal('.education-content', { origin: 'left' });
    sr.reveal('.portfolio-box', { interval: 200 });
    sr.reveal('.publication-box', { interval: 100 });
    sr.reveal('.podcast-card', { interval: 100 });

    // Mobile menu functionality
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    
    const toggleMenu = () => {
      navbar?.classList.toggle('open');
      document.body.style.overflow = navbar?.classList.contains('open') ? 'hidden' : 'auto';
    };

    menuIcon?.addEventListener('click', toggleMenu);

    // Active navigation highlighting
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let current = '';
      sections.forEach(section => {
        const htmlElement = section as HTMLElement;
        const sectionTop = htmlElement.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      typed.destroy();
      menuIcon?.removeEventListener('click', toggleMenu);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold">
            Port<span className="text-gradient">folio.</span>
          </a>
          
          <div className="navbar hidden md:flex items-center space-x-8">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About Me</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#education" className="nav-link">Education</a>
            <a href="#tech-stack" className="nav-link">Tech Stack</a>
            <a href="#portfolio" className="nav-link">Projects</a>
            <a href="#publications" className="nav-link">Publications</a>
            <a href="#podcasts" className="nav-link">Podcasts</a>
          </div>

          <div className="bx bx-menu text-2xl md:hidden cursor-pointer" id="menu-icon"></div>
        </nav>

        {/* Mobile Menu */}
        <div className="navbar md:hidden fixed top-16 left-0 w-full bg-background/95 backdrop-blur-md border-b border-border transform -translate-y-full transition-transform duration-300">
          <div className="flex flex-col space-y-4 p-6">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About Me</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#education" className="nav-link">Education</a>
            <a href="#tech-stack" className="nav-link">Tech Stack</a>
            <a href="#portfolio" className="nav-link">Projects</a>
            <a href="#publications" className="nav-link">Publications</a>
            <a href="#podcasts" className="nav-link">Podcasts</a>
          </div>
        </div>
      </header>

      {/* Home Section */}
      <section id="home" className="home min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1>
                Hi, <br />
                I'm <span className="text-gradient">Abhishek Shah</span>
              </h1>
              
              <h3>
                I'm a <span className="multiple-text text-gradient-accent"></span>
              </h3>
              
              <p className="text-lg">
                Senior Data Scientist | AI/ML Engineer | Cloud Solutions Architect | Leading Enterprise AI Solutions | Expert in Generative AI & MLOps
              </p>
              
              <a 
                href="https://github.com/abh2050?tab=repositories" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
              >
                My Portfolio
              </a>

              <div className="flex space-x-4 mt-8">
                <a href="https://www.linkedin.com/in/abhishek175/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-linkedin'></i>
                </a>
                <a href="https://github.com/abh2050" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
                <a href="https://medium.com/@jwbtmf" target="_blank" rel="noopener noreferrer" className="social-icon" title="Blog">
                  <i className='bx bxl-medium'></i>
                </a>
                <a href="https://open.spotify.com/show/7woIhJxNmvsmnu0SxTRepM" target="_blank" rel="noopener noreferrer" className="social-icon" title="Spotify">
                  <i className='bx bxl-spotify'></i>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="animate-pulse-glow rounded-2xl overflow-hidden">
                <img 
                  src="/assets/my-img-3.jpeg" 
                  alt="Abhishek Shah" 
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://badges.marquiswhoswho.com/Badge/honoredlistee/b1b9bbdfad5b415098c22fc23e70979274e12f8d54dc4efda9514365b92184d5" 
                alt="Marquis Who's Who Badge" 
                className="logo-img w-full h-auto rounded-2xl"
              />
              <span className="circle-spin absolute top-4 right-4 w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
            </div>

            <div className="space-y-6">
              <h2>About Me</h2>
              <h3 className="text-gradient">Senior Data Scientist</h3>
              <p>
                I am a technology leader with 13+ years of experience in enterprise AI solutions, 
                specializing in developing production-grade ML systems, LLM applications, and cloud-native AI solutions. 
                I have a proven track record of leading cross-functional teams to deliver impactful business solutions 
                through advanced analytics and machine learning. Outside of work, I enjoy hiking and spending time in 
                the outdoors, finding inspiration in nature's complexity and beauty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Experience</h2>
          
          <div className="space-y-12">
            {/* BMW Experience */}
            <div className="card-primary">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-gradient">Data Scientist - BMW</h3>
                <span className="text-accent font-semibold">2024 - Present</span>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li>• Led development and training of enterprise LLM platform serving 100,000+ users</li>
                <li>• Spearheaded the development of responsible AI use cases, ensuring alignment with business objectives to elevate business value and improve customer outcomes.</li>
                <li>• Collaborated with executive leadership and cross-functional teams to deploy transformative AI solutions across BMW's global manufacturing network.</li>
              </ul>
            </div>

            {/* Intel Experience */}
            <div className="card-primary">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-gradient">Data Scientist - Intel</h3>
                <span className="text-accent font-semibold">2019 - 2024</span>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li>• Built a RAG pipeline with OpenAI & vector DB, automating SOW analysis for 45 engineers and saving 10 hours/week per engineer, cutting $100K/month in costs.</li>
                <li>• Developed an ML model for FOUP defect detection using Random Forest & PCA, optimized with OpenVINO, reducing scrap wafers and saving $250K yearly.</li>
                <li>• Implemented AI-driven quality control at Audi, analyzing 900 welding robots, enabling real-time inspection of 5M+ welds, and cutting labor costs by 50%.</li>
                <li>• Built Power BI dashboard with ADF to track 4,000+ pipelines, enabling early failure detection and saving the analytics team 1 hour/day in troubleshooting.</li>
              </ul>
            </div>

            {/* Westlake Chemical Experience */}
            <div className="card-primary">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-gradient">Data Analytics Process Engineer - Westlake Chemical</h3>
                <span className="text-accent font-semibold">2017 - 2019</span>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li>• Utilized data analytics and statistical process control to design safeguards for brine recovery, reducing raw material usage by 20%.</li>
                <li>• Conducted feasibility analysis for a $4MM chlorine liquefaction system, selecting an environmentally friendly alternative that increased throughput by 15%.</li>
                <li>• Applied predictive modeling to redesign acid discharge pump systems, achieving a 25% reduction in acid consumption and improved efficiency.</li>
                <li>• Developed a safe work procedure for HCl burner sampling, saving $20,000 annually in lab consultation costs.</li>
                <li>• Led hazard analysis and operability studies using big data to assess process changes for safety and environmental impact.</li>
                <li>• Managed three plant shutdown projects, optimizing schedules with data analytics to reduce timelines by 5%.</li>
              </ul>
            </div>

            {/* Tate & Lyle Experience */}
            <div className="card-primary">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-gradient">Staff Data Analytics Process Engineer & Project Manager - Tate & Lyle</h3>
                <span className="text-accent font-semibold">2012 - 2017</span>
              </div>
              <ul className="space-y-2 text-text-secondary">
                <li>• Managed $5MM+ capital projects, using data analytics for research, construction planning, and cost estimation.</li>
                <li>• Developed key performance indicators (KPIs) to monitor plant efficiency, optimizing production planning and downtime reduction.</li>
                <li>• Created a real-time dashboard using PI ProcessBook for enhanced process visibility and troubleshooting.</li>
                <li>• Led process hazard analysis and risk mitigation strategies to ensure safe equipment installation and operation.</li>
                <li>• Supervised up to 20 contractors during plant outages, optimizing resource allocation and minimizing costs through data analytics.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Education</h2>
          
          <div className="education-content space-y-8">
            <div className="card-gradient">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-gradient">M.S. Artificial Intelligence & Machine Learning</h3>
                  <p className="text-text-secondary">University of Michigan</p>
                  <p className="text-sm text-text-muted">Concentration: NLP | Relevant Courses: Advanced Deep Learning, ML Engineering, Cloud AI Systems</p>
                </div>
                <span className="text-accent font-semibold">2022 - 2025</span>
              </div>
            </div>

            <div className="card-gradient">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-gradient">M.S in Engineering and Technology Management</h3>
                  <p className="text-text-secondary">Washington State University</p>
                  <p className="text-sm text-text-muted">Focus: Data-Driven Decision Making, Technology Strategy</p>
                </div>
                <span className="text-accent font-semibold">2018 - 2020</span>
              </div>
            </div>

            <div className="card-gradient">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-gradient">Bachelor of Science in Chemical Engineering</h3>
                  <p className="text-text-secondary">University of Minnesota</p>
                </div>
                <span className="text-accent font-semibold">2007 - 2012</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Tech Stack</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-primary text-center">
              <h3 className="text-gradient mb-4">AI/ML</h3>
              <p className="text-text-secondary">TensorFlow, PyTorch, HuggingFace, LangChain, OpenAI GPT, Claude</p>
            </div>

            <div className="card-primary text-center">
              <h3 className="text-gradient mb-4">Cloud & DevOps</h3>
              <p className="text-text-secondary">AWS SageMaker, Azure ML, Kubernetes, Docker, Airflow, Terraform</p>
            </div>

            <div className="card-primary text-center">
              <h3 className="text-gradient mb-4">Data Engineering</h3>
              <p className="text-text-secondary">Spark, Snowflake, Databricks, SQL, NoSQL, DataRobot, MLflow</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Latest Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/ollama_deepseek%20copy.jpg" alt="Local RAG with DeepSeek and Ollama" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">Local RAG with DeepSeek and Ollama</h3>
              <p className="text-text-secondary text-sm mb-4">A Streamlit app for SEC filings (10-K, 10-Q, 8-K) using Ollama, DeepSeek, OpenAI embeddings, Pinecone, and local RAG for AI-driven search, analysis, and trend comparison.</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/financial_doc_analyser_local_ollama_Deepseek.git" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/Gemini_Generated_Image_mk2gn4mk2gn4mk2g.png" alt="LangGraph Multi-Agent AI Travel Planner" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">LangGraph Multi-Agent AI Travel Planner</h3>
              <p className="text-text-secondary text-sm mb-4">A state-of-the-art multi-agent travel planning system built with LangGraph, Google Gemini Flash-2.0, and DuckDuckGo Search.</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/langgraph_multi_agent_ai_travel_agent" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/1728761356296.png" alt="Customer Service Using Multiagent Swarm Agent" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">Customer Service Using Multiagent Swarm Agent</h3>
              <p className="text-text-secondary text-sm mb-4">This project implements a multi-agent system (Agent Swarm) that processes user requests through specialized agents working together.</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/customerservice_swarm_agent.git" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/pic.jpg" alt="Agentic Rag Financial Analysis AI Assistant" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">Agentic Rag Financial Analysis AI Assistant</h3>
              <p className="text-text-secondary text-sm mb-4">This project implements AI agents using the Agno Agentic framework to fetch web search results and financial data and do Analysis using Agno Agent</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/agentic_rag_agno.git" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
                <a href="https://agenticragagno.streamlit.app/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bx-link-external'></i>
                </a>
              </div>
            </div>

            {/* Project 5 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/cBpvgpnFPFcg4sTN-generated_image.jpg" alt="Customer Support Intelligence with NLP and Gemini AI" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">Customer Support Intelligence with NLP and Gemini AI</h3>
              <p className="text-text-secondary text-sm mb-4">An interactive Streamlit app leveraging NLP embeddings and Gemini AI to analyze, classify, and provide insights on customer support issues</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/Customer_support_intelligence.git" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
                <a href="https://customersupportintelligence.streamlit.app/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bx-link-external'></i>
                </a>
              </div>
            </div>

            {/* Project 6 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/thumbnail.png" alt="RAG With Neo4J Knowledge Graph With OpenAI" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">RAG With Neo4J Knowledge Graph With OpenAI</h3>
              <p className="text-text-secondary text-sm mb-4">This project implements a high-performance NLP pipeline for scientific document analysis, integrating a Neo4j knowledge graph for structured storage and retrieval. The Retrieval-Augmented Generation (RAG) system enables semantic search and contextual querying of scientific literature.</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/Rag_with_knowledge_graph_neo4j.git" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
                <a href="https://abh2050.github.io/Rag_with_knowledge_graph_neo4j/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bx-link-external'></i>
                </a>
              </div>
            </div>

            {/* Project 7 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/legal-document-search-icon-vector.jpg" alt="Legal Document Search Using NLP" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">Legal Document Search Using NLP</h3>
              <p className="text-text-secondary text-sm mb-4">A Streamlit-based legal document search system using PySpark, BM25, and TF-IDF for efficient full-text retrieval. It preprocesses legal texts, builds an inverted index, and ranks results dynamically, enabling fast, AI-powered search and analysis.</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/searchengine.git" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
                <a href="https://searchenginespark.streamlit.app/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bx-link-external'></i>
                </a>
              </div>
            </div>

            {/* Project 8 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/6juepuojy5731.jpg" alt="Lyft Dynamic Pricing" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">Lyft Dynamic Pricing</h3>
              <p className="text-text-secondary text-sm mb-4">A Streamlit-based Lyft Trip Cost Predictor using Linear Regression, scikit-learn, pandas, and joblib to estimate ride prices based on distance, time, and peak hours. 🚕 Optimized for dynamic pricing analysis and real-time cost estimation.</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/lyft_dynamic_pricing.git" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
                <a href="https://lyftdynamic.streamlit.app/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bx-link-external'></i>
                </a>
              </div>
            </div>

            {/* Project 9 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/GettyImages-82880353-064135cb483940ff9230420d095b6d31.jpg" alt="Financial Doc Analyser" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">Financial Doc Analyser</h3>
              <p className="text-text-secondary text-sm mb-4">AI-powered SEC filing analysis using OpenAI embeddings, Pinecone, and Streamlit for fast, structured search. Retrieve, process, and analyze 10-K, 10-Q, and 8-K filings with instant, context-aware insights.</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/financial_doc_analyser" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
                <a href="https://financialdocanalyser.streamlit.app/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bx-link-external'></i>
                </a>
              </div>
            </div>

            {/* Project 10 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/blog.jpg" alt="Credit Risk Modeling" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">Credit Risk Modeling</h3>
              <p className="text-text-secondary text-sm mb-4">A Streamlit-based loan default prediction app using XGBoost, Logistic Regression, Pandas, and NumPy. It analyzes loan characteristics and predicts default risk in real time based on user inputs.</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/creditriskcomodeling.git" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
                <a href="https://creditriskmodeling.streamlit.app/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bx-link-external'></i>
                </a>
              </div>
            </div>

            {/* Project 11 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/image-forensics.jpg" alt="Fake Image/Video Detector Using Deep Learning and Gemini" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">Fake Image/Video Detector Using Deep Learning and Gemini</h3>
              <p className="text-text-secondary text-sm mb-4">The AI Fake Image & Video Detector is a powerful Streamlit-based application designed to identify whether images or videos are AI-generated or authentic. Utilizing advanced techniques, this tool helps detect synthetic media created by popular AI models such as DALL-E, Midjourney, Stable Diffusion, and others.</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/fake_image_detector_using_deepLearning_Gemini_AI.git" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
                <a href="https://fakeimagedetectorgemini.streamlit.app/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bx-link-external'></i>
                </a>
                <a href="https://v0-gemini-fake-image-detector.vercel.app/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bx-world'></i>
                </a>
              </div>
            </div>

            {/* Project 12 */}
            <div className="portfolio-box card-primary">
              <div className="overflow-hidden rounded-lg mb-4">
                <img src="/assets/10413.jpg" alt="Stock Market Analysis" className="w-full h-48 object-cover" />
              </div>
              <h3 className="text-gradient mb-2">Stock Market Market Analsyis</h3>
              <p className="text-text-secondary text-sm mb-4">A stock market prediction system using RNN, LSTM, GRU, DNN, KNN, and Random Forest to forecast next-day closing prices. Built with Yahoo Finance, Pandas, Scikit-learn, and Matplotlib, it compares deep learning and machine learning models for accuracy.</p>
              <div className="flex space-x-2">
                <a href="https://github.com/abh2050/stockanalysis.git" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-github'></i>
                </a>
                <a href="https://youtu.be/jZLJ2Gk_xCU?si=jKXRyr9oeMsMd_sy" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className='bx bxl-youtube'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Publications</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Publication 1 */}
            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">June 11, 2023 • Technical Article</div>
                  <h3 className="text-gradient text-lg mb-2">Battle of Pathfinding Algorithms: A*, Branch & Bound, and Dijkstra's Showdown in the 4 Knights…</h3>
                  <p className="text-text-secondary text-sm mb-3">Embark on an intriguing journey through the implementation of three search algorithms—A*, Branch and Bound (BnB), and Dijkstra—in the context of the 4 Knights problem.</p>
                  <a href="https://medium.com/@jwbtmf/battle-of-pathfinding-algorithms-a-branch-bound-and-dijkstras-showdown-in-the-4-knights-8d0006f75c34" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            {/* Publication 2 */}
            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">February 20, 2023 • Case Study</div>
                  <h3 className="text-gradient text-lg mb-2">Recommender System for Matching HealthCare Professionals with Jobs Using Cosine Similarity</h3>
                  <p className="text-text-secondary text-sm mb-3">Explore how a healthcare staffing company can offer a platform that allows healthcare facilities to easily find pre-qualified professionals using a recommender system based on cosine similarity.</p>
                  <a href="https://medium.com/@jwbtmf/recommender-system-for-matching-healthcare-professionals-with-jobs-using-cosine-similarity-26b2b8a2512f" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            {/* Publication 3 */}
            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">February 19, 2023 • Technical Article</div>
                  <h3 className="text-gradient text-lg mb-2">Implementation Of Generalized Linear Regression Model Using Moore-Penrose Inverse</h3>
                  <p className="text-text-secondary text-sm mb-3">This article presents an implementation of linear regression using a closed-form solution for a given dataset D.</p>
                  <a href="https://medium.com/@jwbtmf/implementation-of-generalized-linear-regression-model-using-moore-penrose-inverse-6541a69fac00" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            {/* Publication 4 */}
            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">February 10, 2023 • Philosophical Exploration</div>
                  <h3 className="text-gradient text-lg mb-2">The Human Touch: Navigating the Intersection of Technology and Humanity</h3>
                  <p className="text-text-secondary text-sm mb-3">Delve into the philosophical exploration of the relationship between humanity and technology, emphasizing its growing importance in modern times.</p>
                  <a href="https://medium.com/@jwbtmf/the-human-touch-navigating-the-intersection-of-technology-and-humanity-65b76c192fc0" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            {/* Publication 5 */}
            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">January 15, 2023 • Technical Comparison</div>
                  <h3 className="text-gradient text-lg mb-2">Comparison of AutoEncoders vs. Variational Autoencoders</h3>
                  <p className="text-text-secondary text-sm mb-3">Discuss the differences between AutoEncoders and Variational Autoencoders, highlighting their applications in representing data in lower-dimensional spaces.</p>
                  <a href="https://medium.com/@jwbtmf/comparison-of-autoencoders-vs-variational-autoencoders-7993442bb377" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            {/* Publication 6 */}
            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">January 2, 2023 • Technical Overview</div>
                  <h3 className="text-gradient text-lg mb-2">YARN (Yet Another Resource Negotiator) Architecture</h3>
                  <p className="text-text-secondary text-sm mb-3">An overview of YARN, a resource management platform in Hadoop, detailing how it manages computing resources within a cluster.</p>
                  <a href="https://medium.com/@jwbtmf/yarn-yet-another-resource-manager-architecture-21d117364b26" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            {/* Additional publications */}
            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">January 1, 2023 • Theoretical Exploration</div>
                  <h3 className="text-gradient text-lg mb-2">Computational Learning Theory In Machine Learning</h3>
                  <p className="text-text-secondary text-sm mb-3">An exploration of the theoretical foundations of machine learning algorithms, focusing on well-established concepts in computational learning theory.</p>
                  <a href="https://medium.com/@jwbtmf/computational-learning-theory-in-machine-learning-105deb44843c" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">December 14, 2022 • Research Application</div>
                  <h3 className="text-gradient text-lg mb-2">Advancing Fusion Energy Research With Machine Learning</h3>
                  <p className="text-text-secondary text-sm mb-3">Discuss how machine learning is becoming an essential tool in fusion research, aiding scientists in making new discoveries and improving experimental outcomes.</p>
                  <a href="https://medium.com/@jwbtmf/advancing-fusion-energy-research-with-machine-learning-48bb21d75c65" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">December 11, 2022 • Technical Insight</div>
                  <h3 className="text-gradient text-lg mb-2">Reshaping the Dataset For Neural Networks</h3>
                  <p className="text-text-secondary text-sm mb-3">Insights into how neural networks expect input data in specific shapes, and methods to reshape data to match these expectations for effective model training.</p>
                  <a href="https://medium.com/@jwbtmf/reshaping-the-dataset-for-neural-network-15ee7bcea25e" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">December 9, 2022 • Algorithm Comparison</div>
                  <h3 className="text-gradient text-lg mb-2">DFS vs BFS Algorithms for Graph Traversal</h3>
                  <p className="text-text-secondary text-sm mb-3">A comparative analysis of Depth-First Search (DFS) and Breadth-First Search (BFS) algorithms, outlining their differences and use cases in graph traversal.</p>
                  <a href="https://medium.com/@jwbtmf/dfs-vs-bfs-algorithms-for-graph-database-5948f0fd2057" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">December 9, 2022 • Technical Overview</div>
                  <h3 className="text-gradient text-lg mb-2">Learning Optimizers in Deep Learning</h3>
                  <p className="text-text-secondary text-sm mb-3">An overview of various optimizers used in deep learning, discussing their strengths, weaknesses, and applications in training neural networks.</p>
                  <a href="https://medium.com/@jwbtmf/learning-optimizers-in-deep-learning-39060dfd01c1" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">July 19, 2022 • Technical Insight</div>
                  <h3 className="text-gradient text-lg mb-2">Feature Engineering using Random Forest Classifier in Machine Learning</h3>
                  <p className="text-text-secondary text-sm mb-3">A classifier called Random Forest consists of a number of classifiers with a tree-like structure, identically distributed independent…</p>
                  <a href="https://medium.com/@jwbtmf/random-forest-classification-in-machine-learning-4c020a163689" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">July 19, 2022 • Technical Overview</div>
                  <h3 className="text-gradient text-lg mb-2">Decision Tree and Ensemble Learning Algorithms in Machine Learning</h3>
                  <p className="text-text-secondary text-sm mb-3">Classification and Regression Tree (CART) is a decision tree learning algorithm. It can be used for both classification and regression…</p>
                  <a href="https://medium.com/@jwbtmf/decision-tree-and-ensemble-learning-algorithms-in-machine-learning-ea27b4429d85" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">July 19, 2022 • Theoretical Exploration</div>
                  <h3 className="text-gradient text-lg mb-2">Generalization Error in Machine Learning (Bias vs. Variance)</h3>
                  <p className="text-text-secondary text-sm mb-3">A fundamental goal of machine learning is generalization: the ability to draw inferences about unseen data from finite training examples…</p>
                  <a href="https://medium.com/@jwbtmf/generalization-error-in-machine-learning-4617141932b7" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>

            <div className="publication-box card-primary">
              <div className="flex items-start space-x-4">
                <i className='bx bxs-book-alt text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div>
                  <div className="text-sm text-accent font-semibold mb-1">July 19, 2022 • Theoretical Exploration</div>
                  <h3 className="text-gradient text-lg mb-2">Overcoming overfitting a model in Machine Learning</h3>
                  <p className="text-text-secondary text-sm mb-3">A model that has learned the noise instead of the signal is considered "overfit" because it fits the training dataset but has a poor fit with new datasets. This is a common problem in machine learning which can be solved using a validation dataset. Generalization of a model to new data is ultimately what allows us to use machine learning algorithms every day to make predictions and classify data.</p>
                  <a href="https://medium.com/@jwbtmf/overcoming-overfitting-a-model-in-machine-learning-7dd6324d15bf" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Read Article →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcasts Section */}
      <section id="podcasts" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">My Podcasts</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Podcast 1 */}
            <div className="podcast-card card-primary">
              <div className="flex items-start space-x-4 mb-4">
                <i className='bx bxs-microphone text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div className="flex-1">
                  <div className="text-sm text-accent font-semibold mb-1">Published 3/4/25 • Audio • 14:20</div>
                  <h3 className="text-gradient text-lg mb-2">AI Powered SEC Analyzer</h3>
                  <p className="text-text-secondary text-sm mb-4">An analysis of how AI technologies are being used to analyze financial data and SEC filings.</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/episode/2RUD7FYuvu9oPwndnJGZxD" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <a href="https://open.spotify.com/episode/2RUD7FYuvu9oPwndnJGZxD?si=YRWGuZb7Sq-WYbMx1_zSdg" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Listen on Spotify →</a>
            </div>

            {/* Podcast 2 */}
            <div className="podcast-card card-primary">
              <div className="flex items-start space-x-4 mb-4">
                <i className='bx bxs-microphone text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div className="flex-1">
                  <div className="text-sm text-accent font-semibold mb-1">Published 10/9/24 • Audio • 07:34</div>
                  <h3 className="text-gradient text-lg mb-2">The Decade Ahead in AI</h3>
                  <p className="text-text-secondary text-sm mb-4">Exploring potential developments and impacts of artificial intelligence over the next ten years.</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/episode/24C9UNQMLb1ENJ9hMNZBwG" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <a href="https://open.spotify.com/episode/24C9UNQMLb1ENJ9hMNZBwG?si=RpP1vbexT8GWYuGc-JeAiQ" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Listen on Spotify →</a>
            </div>

            {/* Podcast 3 */}
            <div className="podcast-card card-primary">
              <div className="flex items-start space-x-4 mb-4">
                <i className='bx bxs-microphone text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div className="flex-1">
                  <div className="text-sm text-accent font-semibold mb-1">Published 03/08/25 • Audio • 18.41</div>
                  <h3 className="text-gradient text-lg mb-2">Customer Support Intelligence with NLP and Gemini AI</h3>
                  <p className="text-text-secondary text-sm mb-4">An interactive Streamlit app leveraging NLP embeddings and Gemini AI to analyze, classify, and provide insights on customer support issues.</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/episode/1ctOrDfoWGxLc7suoTXdTF" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <a href="https://open.spotify.com/episode/1ctOrDfoWGxLc7suoTXdTF?si=Bohdp7eeSZ2hmhsE5YYrEQ" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Listen on Spotify →</a>
            </div>

            {/* Podcast 4 */}
            <div className="podcast-card card-primary">
              <div className="flex items-start space-x-4 mb-4">
                <i className='bx bxs-microphone text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div className="flex-1">
                  <div className="text-sm text-accent font-semibold mb-1">Published 03/05/25 • Audio • 18:09</div>
                  <h3 className="text-gradient text-lg mb-2">NLP Pipeline with Neo4j Knowledge Graph for Scientific Literature</h3>
                  <p className="text-text-secondary text-sm mb-4">Exploring high-performance NLP pipeline that uses a Neo4j knowledge graph for the analysis of scientific documents built on a Retrieval-Augmented Generation (RAG) architecture</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/episode/5KS2II8lzM0jqFChwyrwyo" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <a href="https://open.spotify.com/episode/5KS2II8lzM0jqFChwyrwyo?si=7pwjhuhjTgeMuW8KjST-yQ" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Listen on Spotify →</a>
            </div>

            {/* Podcast 5 */}
            <div className="podcast-card card-primary">
              <div className="flex items-start space-x-4 mb-4">
                <i className='bx bxs-microphone text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div className="flex-1">
                  <div className="text-sm text-accent font-semibold mb-1">Published 10/9/24 • Audio • 08:03</div>
                  <h3 className="text-gradient text-lg mb-2">Cracking the Protein Code: How AlphaFold Earned the 2024 Nobel Prize in Chemistry</h3>
                  <p className="text-text-secondary text-sm mb-4">Discussion on AlphaFold's revolutionary impact on protein structure prediction and its Nobel Prize recognition.</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/episode/2HewTrqlQG27OZeBFeCmss" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <a href="https://open.spotify.com/episode/2HewTrqlQG27OZeBFeCmss?si=h5Jku4_ETbOe_xnIvW7_iQ" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Listen on Spotify →</a>
            </div>

            {/* Podcast 6 */}
            <div className="podcast-card card-primary">
              <div className="flex items-start space-x-4 mb-4">
                <i className='bx bxs-microphone text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div className="flex-1">
                  <div className="text-sm text-accent font-semibold mb-1">Published 10/8/24 • Audio • 09:32</div>
                  <h3 className="text-gradient text-lg mb-2">A Survey of Dynamic Programming Algorithms</h3>
                  <p className="text-text-secondary text-sm mb-4">Exploring various dynamic programming algorithms and their applications in computer science.</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/episode/65pygbNikOTO1qF1YH3lRv" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <a href="https://open.spotify.com/episode/65pygbNikOTO1qF1YH3lRv?si=msL0881aS7ChqvXTjx6Nzg" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Listen on Spotify →</a>
            </div>

            {/* Podcast 7 */}
            <div className="podcast-card card-primary">
              <div className="flex items-start space-x-4 mb-4">
                <i className='bx bxs-microphone text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div className="flex-1">
                  <div className="text-sm text-accent font-semibold mb-1">Published 10/8/24 • Audio • 08:37</div>
                  <h3 className="text-gradient text-lg mb-2">Retrieval Interleaved Generation (RIG) using LLM: What is It and How It Works?</h3>
                  <p className="text-text-secondary text-sm mb-4">Explaining the concept of Retrieval Interleaved Generation and its implementation with Large Language Models.</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/episode/2gFqPRgkeNV792fAMNdxpc" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <a href="https://open.spotify.com/episode/2gFqPRgkeNV792fAMNdxpc?si=Qpayc85TQCulTTh516syYw" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Listen on Spotify →</a>
            </div>

            {/* Podcast 8 */}
            <div className="podcast-card card-primary">
              <div className="flex items-start space-x-4 mb-4">
                <i className='bx bxs-microphone text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div className="flex-1">
                  <div className="text-sm text-accent font-semibold mb-1">Published 10/4/24 • Audio • 10:05</div>
                  <h3 className="text-gradient text-lg mb-2">Influence of a Large Language Model on Diagnostic Reasoning</h3>
                  <p className="text-text-secondary text-sm mb-4">Examining how large language models are impacting medical diagnosis and clinical decision-making.</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/episode/7Cs1YzXqtfdpLOU6pTKYUH" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <a href="https://open.spotify.com/episode/7Cs1YzXqtfdpLOU6pTKYUH?si=a6P8ylzzRIKk0nbc_IK6rA" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Listen on Spotify →</a>
            </div>

            {/* Podcast 9 */}
            <div className="podcast-card card-primary">
              <div className="flex items-start space-x-4 mb-4">
                <i className='bx bxs-microphone text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div className="flex-1">
                  <div className="text-sm text-accent font-semibold mb-1">Published 10/4/24 • Audio • 16:03</div>
                  <h3 className="text-gradient text-lg mb-2">Scaling Laws for Neural Language Models</h3>
                  <p className="text-text-secondary text-sm mb-4">Discussing the mathematical principles that govern how neural language models improve with increased size and data.</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/episode/5VfCp4AjPAH9UUmDnfpqyO" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <a href="https://open.spotify.com/episode/5VfCp4AjPAH9UUmDnfpqyO?si=64I895VKR3CSAIsAzKL9kQ" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Listen on Spotify →</a>
            </div>

            {/* Podcast 10 */}
            <div className="podcast-card card-primary">
              <div className="flex items-start space-x-4 mb-4">
                <i className='bx bxs-microphone text-2xl text-primary flex-shrink-0 mt-1'></i>
                <div className="flex-1">
                  <div className="text-sm text-accent font-semibold mb-1">Published 10/4/24 • Audio • 12:09</div>
                  <h3 className="text-gradient text-lg mb-2">Latent Dirichlet Allocation</h3>
                  <p className="text-text-secondary text-sm mb-4">Exploring the popular topic modeling technique and its applications in natural language processing.</p>
                </div>
              </div>
              <iframe 
                src="https://open.spotify.com/embed/episode/3mot4DDKrtCOjN9U6Ue1dL" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <a href="https://open.spotify.com/episode/3mot4DDKrtCOjN9U6Ue1dL?si=PdFIdvvLSzmxVJ-JfY30fw" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow text-sm">Listen on Spotify →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex flex-wrap gap-4 mb-6 md:mb-0">
              <a 
                href="https://docs.google.com/document/d/1Q7jR6NJ6cX9rLbwcVXQgggAnyUW_tRzp/edit?usp=sharing&ouid=114586430087198779784&rtpof=true&sd=true" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Download Resume
              </a>
              <a href="https://www.linkedin.com/in/abhishek175/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className='bx bxl-linkedin'></i>
              </a>
              <a href="https://github.com/abh2050" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className='bx bxl-github'></i>
              </a>
              <a href="https://medium.com/@jwbtmf" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className='bx bxl-medium'></i>
              </a>
              <a href="https://open.spotify.com/user/YOUR_SPOTIFY_USERNAME" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className='bx bxl-spotify'></i>
              </a>
            </div>

            <a href="#home" className="social-icon animate-pulse-glow">
              <i className='bx bx-up-arrow-alt'></i>
            </a>
          </div>

          <div className="text-center text-text-muted">
            <p>Copyright © 2024 by Abhishek Shah | All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Styles */}
      <style>{`
        .navbar.open {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;