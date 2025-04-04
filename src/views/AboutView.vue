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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
  border-radius: var(--radius-lg);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  z-index: 1;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.1));
}

.floating-icons {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.floating-icons .icon {
  font-size: 8rem;
  opacity: 0.1;
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
  z-index: 2;
  text-align: center;
  color: var(--white);
  max-width: 800px;
  padding: var(--spacing-xl);
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
  font-weight: 700;
}

.tagline {
  font-size: 1.8rem;
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.stat {
  text-align: center;
}

.stat .number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
}

.stat .label {
  font-size: 1rem;
  opacity: 0.9;
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
}

.section-title {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: var(--spacing-lg);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--primary-color);
}

.story-paragraph {
  margin-bottom: var(--spacing-md);
  line-height: 1.8;
  color: var(--text-color);
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
  width: 150px;
  height: 150px;
  background: rgba(132, 155, 85, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.visual-element:hover {
  transform: scale(1.1);
}

.visual-element .emoji {
  font-size: 3rem;
}

/* Mission Section */
.mission-section {
  background: var(--light-bg);
  padding: var(--spacing-xl) 0;
  margin-bottom: var(--spacing-xl);
  border-radius: var(--radius-lg);
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
  background: var(--white);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: var(--shadow-md);
}

.mission-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.mission-card h3 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.mission-card p {
  color: var(--text-color);
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.team-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.member-photo {
  width: 100%;
  height: 200px;
  background: rgba(132, 155, 85, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-photo .emoji {
  font-size: 5rem;
}

.member-info {
  padding: var(--spacing-lg);
}

.member-info h3 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.role {
  color: var(--text-color);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
}

.bio {
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
}

.social-links a {
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: var(--primary-light);
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  padding: var(--spacing-xl) 0;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
  color: var(--white);
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.cta-content p {
  font-size: 1.2rem;
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
  border-radius: var(--radius-sm);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--white);
  color: var(--primary-color);
}

.btn-primary:hover {
  background: rgba(255, 255, 255, 0.9);
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
    transform: translateY(-20px);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.5s both;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 1s ease-out 1s both;
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
    font-size: 3rem;
  }

  .tagline {
    font-size: 1.5rem;
  }

  .section-content {
    grid-template-columns: 1fr;
  }

  .story-visual {
    order: -1;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 500px;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .tagline {
    font-size: 1.2rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: var(--spacing-md);
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
  }
}
</style> 