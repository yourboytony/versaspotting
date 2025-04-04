<template>
  <div class="about-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1>About VERSA Spotting</h1>
        <p class="tagline">Capturing the beauty of aviation worldwide</p>
      </div>
    </section>

    <section class="about-section">
      <div class="section-content">
        <div class="text-content">
          <h2>Our Story</h2>
          <p>VERSA Spotting was founded by a group of passionate aviation photographers who shared a common vision: to capture and share the beauty of aircraft from around the world. What started as a small group of enthusiasts has grown into a global community of aviation spotters and photographers.</p>
          <p>Our journey began at airports and airshows, where we discovered our shared passion for aviation photography. Today, we continue to document the ever-evolving world of aviation, from commercial airliners to military aircraft, and everything in between.</p>
        </div>
        <div class="image-content">
          <div class="image-placeholder">
            <span class="emoji">✈️</span>
          </div>
        </div>
      </div>
    </section>

    <section class="mission-section">
      <div class="section-content">
        <div class="image-content">
          <div class="image-placeholder">
            <span class="emoji">📸</span>
          </div>
        </div>
        <div class="text-content">
          <h2>Our Mission</h2>
          <p>At VERSA Spotting, we're dedicated to:</p>
          <ul>
            <li>Capturing stunning aviation photography</li>
            <li>Building a global community of aviation enthusiasts</li>
            <li>Documenting the evolution of aircraft and aviation technology</li>
            <li>Sharing our knowledge and passion with others</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="team-section">
      <h2>Our Team</h2>
      <p class="section-description">Meet the photographers behind VERSA Spotting</p>
      
      <div class="team-grid">
        <div class="team-member">
          <div class="member-photo">
            <span class="emoji">📸</span>
          </div>
          <h3>Anthony Nigro</h3>
          <p class="role">Lead Photographer & Web Master</p>
          <p class="bio">With over a decade of aviation photography experience, Anthony leads our team with his expertise in both photography and web development.</p>
          <div class="social-links">
            <a href="https://instagram.com/yourboytony" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="https://twitter.com/yourboytony" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
          </div>
        </div>

        <div class="team-member">
          <div class="member-photo">
            <span class="emoji">📸</span>
          </div>
          <h3>Skyeler Kho</h3>
          <p class="role">Photographer</p>
          <p class="bio">Skyeler brings a unique perspective to aviation photography, capturing stunning moments from around the world.</p>
          <div class="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
          </div>
        </div>

        <div class="team-member">
          <div class="member-photo">
            <span class="emoji">📸</span>
          </div>
          <h3>Spencer Parkinson</h3>
          <p class="role">Photographer</p>
          <p class="bio">Spencer's keen eye for detail and composition brings a fresh perspective to our aviation photography collection.</p>
          <div class="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
          </div>
        </div>

        <div class="team-member">
          <div class="member-photo">
            <span class="emoji">📸</span>
          </div>
          <h3>Stefan Tofan</h3>
          <p class="role">Photographer</p>
          <p class="bio">Stefan's passion for aviation and photography shines through in his ability to capture the perfect moment.</p>
          <div class="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
          </div>
        </div>

        <div class="team-member">
          <div class="member-photo">
            <span class="emoji">📸</span>
          </div>
          <h3>Jared Powers</h3>
          <p class="role">Photographer</p>
          <p class="bio">Jared's technical expertise and creative vision contribute to our diverse collection of aviation photography.</p>
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
    </section>

    <section class="cta-section">
      <h2>Join Our Community</h2>
      <p>Become part of our growing community of aviation enthusiasts and photographers.</p>
      <div class="cta-buttons">
        <router-link to="/contact" class="btn btn-primary">Contact Us</router-link>
        <router-link to="/portfolio" class="btn btn-secondary">View Our Work</router-link>
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
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--white);
  margin-bottom: var(--spacing-xl);
  border-radius: var(--radius-lg);
}

.hero-content {
  max-width: 800px;
  padding: var(--spacing-xl);
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  color: var(--white);
}

.tagline {
  font-size: 1.5rem;
  opacity: 0.9;
}

.about-section,
.mission-section,
.team-section {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
}

.section-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

.text-content {
  padding: var(--spacing-lg);
}

.text-content h2 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.text-content p {
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.image-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  background: rgba(132, 155, 85, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji {
  font-size: 5rem;
}

.mission-section {
  background: var(--light-bg);
  border-radius: var(--radius-lg);
}

.mission-section ul {
  list-style-type: none;
  padding: 0;
}

.mission-section li {
  margin-bottom: var(--spacing-sm);
  padding-left: var(--spacing-md);
  position: relative;
}

.mission-section li:before {
  content: "✓";
  color: var(--primary-color);
  position: absolute;
  left: 0;
}

.team-section {
  text-align: center;
}

.section-description {
  margin-bottom: var(--spacing-xl);
  color: var(--text-color);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.team-member {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
}

.member-photo {
  width: 150px;
  height: 150px;
  margin: 0 auto var(--spacing-md);
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(132, 155, 85, 0.1);
}

.team-member h3 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.role {
  color: var(--text-color);
  font-weight: 500;
  margin-bottom: var(--spacing-md);
}

.bio {
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.social-links {
  display: flex;
  justify-content: center;
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

.cta-section {
  text-align: center;
  padding: var(--spacing-xl) 0;
  background: var(--light-bg);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
}

.cta-section h2 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.cta-section p {
  margin-bottom: var(--spacing-xl);
  color: var(--text-color);
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-sm);
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
  background: var(--white);
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: var(--white);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .section-content {
    grid-template-columns: 1fr;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .tagline {
    font-size: 1.2rem;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style> 