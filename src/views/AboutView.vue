<template>
  <div class="about">
    <section class="about-header">
      <h1>About VERSA Spotting</h1>
      <p>Capturing the beauty of aviation worldwide</p>
    </section>

    <section class="about-content">
      <div class="about-section">
        <div class="section-icon">
          <font-awesome-icon :icon="['fas', 'history']" />
        </div>
        <h2>Our Story</h2>
        <p>VERSA Spotting was founded by a group of passionate aviation enthusiasts who share a common love for aircraft photography. What started as a hobby quickly evolved into a community of like-minded individuals dedicated to capturing the beauty of aviation.</p>
      </div>

      <div class="about-section">
        <div class="section-icon">
          <font-awesome-icon :icon="['fas', 'bullseye']" />
        </div>
        <h2>Our Mission</h2>
        <p>Our mission is to showcase the beauty of aviation through high-quality photography while building a community of aviation enthusiasts. We aim to document and share the unique moments that make aviation photography so special.</p>
      </div>

      <div class="about-section">
        <div class="section-icon">
          <font-awesome-icon :icon="['fas', 'users']" />
        </div>
        <h2>Our Team</h2>
        <p>Meet the passionate individuals behind VERSA Spotting who make our vision a reality.</p>
        
        <div class="team-grid">
          <div class="team-member">
            <div class="member-photo">
              <span class="emoji">📸</span>
            </div>
            <h3>Anthony Nigro</h3>
            <p class="role">Founder & Lead Photographer</p>
            <p class="bio">With over a decade of aviation photography experience, Anthony leads our team with his expertise and passion for capturing the perfect shot.</p>
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
              <span class="emoji">📊</span>
            </div>
            <h3>Sarah Chen</h3>
            <p class="role">Operations Manager</p>
            <p class="bio">Sarah brings her organizational expertise to ensure smooth operations and exceptional service for our clients and community.</p>
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
              <span class="emoji">💻</span>
            </div>
            <h3>Michael Rodriguez</h3>
            <p class="role">Technical Director</p>
            <p class="bio">Michael oversees our technical operations and ensures our equipment and processes are always at the cutting edge.</p>
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
      <h2>Join Our Community</h2>
      <p>Whether you're an experienced aviation photographer or just starting out, we welcome you to join our community and share your passion for aviation.</p>
      <div class="cta-buttons">
        <router-link to="/contact" class="btn btn-primary">Get in Touch</router-link>
        <router-link to="/portfolio" class="btn btn-outline">View Portfolio</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// No script needed for this component
</script>

<style scoped>
.about {
  min-height: 100vh;
  padding: var(--spacing-xl) 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
}

.about-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: 0 var(--spacing-md);
}

.about-header h1 {
  font-size: 3rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.about-header p {
  font-size: 1.25rem;
  color: var(--white);
  opacity: 0.9;
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.about-section {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
}

.about-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.section-icon {
  width: 80px;
  height: 80px;
  background-color: rgba(132, 155, 85, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
  font-size: 2rem;
  color: var(--primary-color);
}

.about-section h2 {
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
}

.about-section p {
  color: var(--white);
  opacity: 0.9;
  line-height: 1.6;
}

.cta-section {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-md);
  margin-top: var(--spacing-xl);
  background: linear-gradient(135deg, rgba(132, 155, 85, 0.2), rgba(0, 0, 0, 0.4));
}

.cta-section h2 {
  font-size: 2.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.cta-section p {
  font-size: 1.25rem;
  color: var(--white);
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

.emoji {
  font-size: 4rem;
  line-height: 1;
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

@media (max-width: 768px) {
  .about-header h1 {
    font-size: 2.5rem;
  }

  .about-content {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style> 