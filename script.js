// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Check for saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        
        // Set up theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle button icon
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Add a subtle animation effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Create intersection observer for fade-in animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            this.observer.observe(section);
        });

        // Add smooth scrolling for anchor links
        this.addSmoothScrolling();
    }

    addSmoothScrolling() {
        // If there were navigation links, this would handle smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Tech Stack Interactions
class TechStackManager {
    constructor() {
        this.init();
    }

    init() {
        // Add hover effects and click interactions to tech items
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            this.addTechItemInteractions(item);
        });

        // Add progress bars for skill levels (optional feature)
        this.addSkillBars();
    }

    addTechItemInteractions(item) {
        // Add click event to show more info about the technology
        item.addEventListener('click', (e) => {
            this.showTechInfo(item);
        });

        // Add subtle pulse animation on hover
        item.addEventListener('mouseenter', () => {
            item.style.animation = 'pulse 0.6s ease-in-out';
        });

        item.addEventListener('animationend', () => {
            item.style.animation = '';
        });
    }

    showTechInfo(techItem) {
        const techName = techItem.textContent.trim();
        const techInfo = this.getTechInfo(techName);
        
        if (techInfo) {
            this.createTechModal(techName, techInfo);
        }
    }

    getTechInfo(techName) {
        const techDatabase = {
            'Jenkins': {
                description: 'CI/CD automation server - modernized infrastructure with Kubernetes integration',
                experience: '2+ years',
                projects: 'Migrated 25+ jobs, reduced build times by 55%, implemented containerized agents'
            },
            'Python': {
                description: 'Primary language for automation, ETL, and incident response solutions',
                experience: '2+ years',
                projects: 'Business-critical automation, Elasticsearch indexing, reusable classes and scripts'
            },
            'Kubernetes': {
                description: 'Container orchestration platform for Jenkins agents and application deployment',
                experience: '2+ years',
                projects: 'Jenkins pod templates, containerized build environments, infrastructure modernization'
            },
            'Dynatrace': {
                description: 'AI-powered APM for comprehensive system observability and performance monitoring',
                experience: '1+ years',
                projects: 'System health visibility, false alert reduction, proactive anomaly detection'
            },
            'Grafana': {
                description: 'Monitoring and visualization platform for infrastructure and application metrics',
                experience: '1+ years',
                projects: 'Custom dashboards, system performance monitoring, observability initiatives'
            },
            'GitLab CI': {
                description: 'CI/CD platform for automated testing and deployment pipelines',
                experience: '2+ years',
                projects: 'Team repository pipelines, troubleshooting build failures, deployment automation'
            },
            'Splunk': {
                description: 'Log analysis and monitoring platform for system health and security',
                experience: '1+ years',
                projects: 'System health monitoring, log analysis, performance anomaly detection'
            },
            'Docker': {
                description: 'Containerization platform for application packaging and deployment',
                experience: '2+ years',
                projects: 'Lightweight Jenkins agents, multi-branch builds, containerized environments'
            },
            'Terraform': {
                description: 'Infrastructure as Code tool for cloud resource provisioning',
                experience: '1+ years',
                projects: 'AWS infrastructure automation, cloud resource management'
            },
            'AWS': {
                description: 'Cloud platform for scalable infrastructure and services',
                experience: '2+ years',
                projects: 'Infrastructure automation, cloud resource management, certified developer'
            }
        };

        return techDatabase[techName];
    }

    createTechModal(techName, techInfo) {
        // Create a simple modal to display tech information
        const modal = document.createElement('div');
        modal.className = 'tech-modal';
        modal.innerHTML = `
            <div class="tech-modal-content">
                <div class="tech-modal-header">
                    <h3>${techName}</h3>
                    <button class="tech-modal-close">&times;</button>
                </div>
                <div class="tech-modal-body">
                    <p><strong>Description:</strong> ${techInfo.description}</p>
                    <p><strong>Experience:</strong> ${techInfo.experience}</p>
                    <p><strong>Key Projects:</strong> ${techInfo.projects}</p>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            .tech-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                animation: fadeIn 0.3s ease forwards;
            }
            
            .tech-modal-content {
                background: var(--bg-primary);
                border-radius: 12px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                box-shadow: var(--shadow-heavy);
                transform: scale(0.9);
                animation: scaleIn 0.3s ease forwards;
            }
            
            .tech-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .tech-modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-muted);
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .tech-modal-close:hover {
                background: var(--bg-secondary);
                color: var(--text-primary);
            }
            
            .tech-modal-body p {
                margin-bottom: 0.75rem;
                color: var(--text-secondary);
                line-height: 1.6;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                to { transform: scale(1); }
            }
        `;

        // Add styles to document
        if (!document.querySelector('#tech-modal-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'tech-modal-styles';
            styleSheet.textContent = modalStyles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.tech-modal-close');
        closeBtn.addEventListener('click', () => this.closeTechModal(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeTechModal(modal);
            }
        });

        // ESC key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeTechModal(modal);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    closeTechModal(modal) {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }

    addSkillBars() {
        // Optional: Add animated skill progress bars
        const skills = {
            'Python': 85,
            'Jenkins': 80,
            'Kubernetes': 75,
            'Grafana': 90,
            'Dynatrace': 70
        };

        // This could be implemented as an additional feature
        // For now, it's just a placeholder for future enhancement
    }
}

// Print Functionality
class PrintManager {
    constructor() {
        this.init();
    }

    init() {
        const printBtn = document.getElementById('print-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printResume());
        }
    }

    printResume() {
        // Optimize for printing
        const originalTitle = document.title;
        document.title = 'Adrian_Cedeno_Resume';
        
        // Add print-specific styles
        this.addPrintStyles();
        
        window.print();
        
        // Restore original title
        document.title = originalTitle;
    }

    addPrintStyles() {
        const printStyles = `
            @media print {
                .fade-in {
                    animation: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                }
                
                .section {
                    opacity: 1 !important;
                    transform: none !important;
                }
                
                .tech-item:hover {
                    transform: none !important;
                }
                
                .job:hover {
                    transform: none !important;
                }
            }
        `;

        if (!document.querySelector('#print-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'print-styles';
            styleSheet.textContent = printStyles;
            document.head.appendChild(styleSheet);
        }
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            this.logPerformanceMetrics();
        });
    }

    logPerformanceMetrics() {
        // Log performance metrics (useful for optimization)
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            
            console.log('Adrian Cedeno Resume Performance Metrics:');
            console.log(`Page Load Time: ${loadTime}ms`);
            console.log(`DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
            
            // In a real application, you might send this data to an analytics service
        }
    }
}

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new ThemeManager();
    new ScrollAnimations();
    new TechStackManager();
    new PrintManager();
    new PerformanceMonitor();
    
    console.log('🚀 Adrian Cedeno Resume interactive features loaded successfully!');
    console.log('💡 Tip: Try clicking on the tech stack items for more details about Adrian\'s experience');
});

// Add CSS animation for pulse effect
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    </style>
`);