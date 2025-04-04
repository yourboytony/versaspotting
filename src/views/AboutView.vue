<template>
  <div class="about-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="animate-fade-in">VERSA Spotting</h1>
        <p class="tagline animate-fade-in-delay">Where Aviation Photography Takes Flight</p>
        <div class="hero-stats animate-fade-in-delay-2">
          <div class="stat">
            <span class="number">5</span>
            <span class="label">Photographers</span>
          </div>
          <div class="stat">
            <span class="number">1000+</span>
            <span class="label">Photos</span>
          </div>
          <div class="stat">
            <span class="number">50+</span>
            <span class="label">Locations</span>
          </div>
        </div>
      </div>
      <div class="hero-background">
        <div class="gradient-overlay"></div>
        <div class="floating-icons">
          <span class="icon">✈️</span>
          <span class="icon">📸</span>
          <span class="icon">🌍</span>
        </div>
      </div>
    </section>

    <section class="story-section">
      <div class="section-content">
        <div class="story-text">
          <h2 class="section-title">Our Journey</h2>
          <p class="story-paragraph">Born from a shared passion for aviation and photography, VERSA Spotting has evolved from a small group of enthusiasts into a global community of aviation photographers. Our journey began with a simple mission: to capture the beauty of aircraft in their natural environment.</p>
          <p class="story-paragraph">Today, we continue to push the boundaries of aviation photography, documenting everything from commercial airliners to military aircraft, always striving to capture that perfect moment that tells a story.</p>
        </div>
        <div class="story-visual">
          <div class="visual-container">
            <div class="visual-element">
              <span class="emoji">✈️</span>
            </div>
            <div class="visual-element">
              <span class="emoji">📸</span>
            </div>
            <div class="visual-element">
              <span class="emoji">🌍</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mission-section">
      <h2 class="section-title">Our Mission</h2>
      <div class="mission-grid">
        <div class="mission-card">
          <div class="card-icon">📸</div>
          <h3>Capture Excellence</h3>
          <p>Pursuing the perfect shot in every location and condition</p>
        </div>
        <div class="mission-card">
          <div class="card-icon">🌐</div>
          <h3>Global Community</h3>
          <p>Connecting aviation enthusiasts worldwide</p>
        </div>
        <div class="mission-card">
          <div class="card-icon">📚</div>
          <h3>Share Knowledge</h3>
          <p>Educating and inspiring the next generation of photographers</p>
        </div>
        <div class="mission-card">
          <div class="card-icon">🎯</div>
          <h3>Push Boundaries</h3>
          <p>Innovating in aviation photography techniques</p>
        </div>
      </div>
    </section>

    <section class="team-section">
      <h2 class="section-title">Meet Our Team</h2>
      <div class="team-grid">
        <div class="team-card">
          <div class="member-photo">
            <span class="emoji">📸</span>
          </div>
          <div class="member-info">
            <h3>Anthony Nigro</h3>
            <p class="role">Lead Photographer & Web Master</p>
            <p class="bio">A decade of aviation photography expertise combined with web development skills</p>
            <div class="social-links">
              <a href="https://instagram.com/yourboytony" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'instagram']" />
              </a>
              <a href="https://twitter.com/yourboytony" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'twitter']" />
              </a>
            </div>
          </div>
        </div>

        <div class="team-card">
          <div class="member-photo">
            <span class="emoji">📸</span>
          </div>
          <div class="member-info">
            <h3>Skyeler Kho</h3>
            <p class="role">Photographer</p>
            <p class="bio">Bringing unique perspectives to aviation photography worldwide</p>
            <div class="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'instagram']" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'linkedin']" />
              </a>
            </div>
          </div>
        </div>

        <div class="team-card">
          <div class="member-photo">
            <span class="emoji">📸</span>
          </div>
          <div class="member-info">
            <h3>Spencer Parkinson</h3>
            <p class="role">Photographer</p>
            <p class="bio">Master of composition and detail in aviation photography</p>
            <div class="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'instagram']" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'linkedin']" />
              </a>
            </div>
          </div>
        </div>

        <div class="team-card">
          <div class="member-photo">
            <span class="emoji">📸</span>
          </div>
          <div class="member-info">
            <h3>Stefan Tofan</h3>
            <p class="role">Photographer</p>
            <p class="bio">Passionate about capturing the perfect aviation moments</p>
            <div class="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'instagram']" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'linkedin']" />
              </a>
            </div>
          </div>
        </div>

        <div class="team-card">
          <div class="member-photo">
            <span class="emoji">📸</span>
          </div>
          <div class="member-info">
            <h3>Jared Powers</h3>
            <p class="role">Photographer</p>
            <p class="bio">Technical expertise meets creative vision in aviation photography</p>
            <div class="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'instagram']" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'linkedin']" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-content">
        <h2>Ready to Join Our Journey?</h2>
        <p>Become part of our growing community of aviation enthusiasts and photographers</p>
        <div class="cta-buttons">
          <router-link to="/contact" class="btn btn-primary">
            <span>Get in Touch</span>
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </router-link>
          <router-link to="/portfolio" class="btn btn-secondary">
            <span>View Our Work</span>
            <font-awesome-icon :icon="['fas', 'images']" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  color: var(--white);
  min-height: 100vh;
  padding-bottom: var(--spacing-xl);
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 70vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.floating-icons {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 2;
}

.floating-icons .icon {
  font-size: 4rem;
  color: var(--primary-color);
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.floating-icons .icon:nth-child(2) {
  animation-delay: 2s;
}

.floating-icons .icon:nth-child(3) {
  animation-delay: 4s;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: var(--white);
  max-width: 800px;
  padding: var(--spacing-xl);
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.tagline {
  font-size: 1.6rem;
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
  font-weight: 300;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.stat {
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  min-width: 120px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
}

.stat:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.stat .number {
  display: block;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--primary-color);
}

.stat .label {
  font-size: 0.9rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Story Section */
.story-section {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
}

.section-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

.story-text {
  padding: var(--spacing-lg);
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
}

.story-text:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.section-title {
  color: var(--white);
  font-size: 2.2rem;
  margin-bottom: var(--spacing-lg);
  position: relative;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--primary-color);
}

.story-paragraph {
  margin-bottom: var(--spacing-md);
  line-height: 1.8;
  color: var(--white);
  font-size: 1.05rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.story-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.visual-element {
  width: 130px;
  height: 130px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.visual-element:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.visual-element .emoji {
  font-size: 2.5rem;
}

/* Mission Section */
.mission-section {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  padding: var(--spacing-xl) 0;
  margin-bottom: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mission-section .section-title {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.mission-section .section-title::after {
  left: 50%;
  transform: translateX(-50%);
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  padding: 0 var(--spacing-lg);
}

.mission-card {
  background: rgba(0, 0, 0, 0.5);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  text-align: center;
  transition: transform 0.3s ease, border-color 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mission-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
  display: inline-block;
  background: rgba(132, 155, 85, 0.2);
  width: 70px;
  height: 70px;
  line-height: 70px;
  border-radius: 50%;
  color: var(--primary-color);
}

.mission-card h3 {
  color: var(--white);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.mission-card p {
  color: var(--white);
  opacity: 0.9;
  line-height: 1.6;
}

/* Team Section */
.team-section {
  padding: var(--spacing-xl) 0;
  margin-bottom: var(--spacing-xl);
}

.team-section .section-title {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.team-section .section-title::after {
  left: 50%;
  transform: translateX(-50%);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.team-card {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.member-photo {
  width: 100%;
  height: 160px;
  background: rgba(132, 155, 85, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-photo .emoji {
  font-size: 4rem;
  color: var(--primary-color);
}

.member-info {
  padding: var(--spacing-lg);
}

.member-info h3 {
  color: var(--white);
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.role {
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
  font-size: 0.95rem;
}

.bio {
  color: var(--white);
  opacity: 0.9;
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-links a {
  color: var(--white);
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: var(--primary-color);
}

/* CTA Section */
.cta-section {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  padding: var(--spacing-xl) 0;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
  color: var(--white);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.cta-content h2 {
  font-size: 2.3rem;
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.cta-content p {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary-color);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: var(--white);
  border: 2px solid var(--white);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s both;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 1s ease-out 0.6s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content h1 {
    font-size: 2.8rem;
  }

  .tagline {
    font-size: 1.4rem;
  }

  .section-content {
    grid-template-columns: 1fr;
  }

  .story-visual {
    order: -1;
  }
  
  .visual-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 450px;
    padding: var(--spacing-lg) 0;
  }

  .hero-content h1 {
    font-size: 2.2rem;
  }

  .tagline {
    font-size: 1.1rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .stat {
    width: 100%;
  }

  .mission-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    justify-content: center;
    width: 100%;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .cta-content h2 {
    font-size: 1.8rem;
  }
}
</style> 