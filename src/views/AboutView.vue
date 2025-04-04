<template>
  <div class="about">
    <section class="about-header">
      <h1>About VERSA Spotting</h1>
      <p>Capturing the beauty of aviation worldwide</p>
    </section>

    <section class="about-content">
      <div class="about-section">
        <div class="about-text">
          <h2>Our Story</h2>
          <p>VERSA Spotting was founded by a group of passionate aviation enthusiasts dedicated to capturing the beauty and power of aircraft. What started as a hobby has grown into a community of photographers and spotters who share a common love for aviation.</p>
          <p>Based at Vancouver International Airport (YVR), we've expanded our reach to document aircraft from around the world, creating a comprehensive portfolio of aviation photography.</p>
        </div>
        <div class="about-image">
          <img src="@/assets/about-team.jpg" alt="VERSA Spotting Team" />
        </div>
      </div>

      <div class="about-section">
        <div class="about-text">
          <h2>Our Mission</h2>
          <p>Our mission is to:</p>
          <ul>
            <li>Capture stunning aviation moments</li>
            <li>Build a community of aviation enthusiasts</li>
            <li>Document the evolution of aviation</li>
            <li>Share our passion with the world</li>
          </ul>
        </div>
        <div class="about-image">
          <img src="@/assets/about-mission.jpg" alt="Our Mission" />
        </div>
      </div>

      <div class="about-section">
        <div class="about-text">
          <h2>Our Team</h2>
          <p>Our team consists of experienced photographers and aviation enthusiasts who bring their unique perspectives to every shot. Each member specializes in different aspects of aviation photography, from commercial airliners to military aircraft.</p>
          <p>We're constantly learning and improving our craft, ensuring that we deliver the highest quality content to our community.</p>
        </div>
        <div class="about-image">
          <img src="@/assets/about-team-work.jpg" alt="Our Team at Work" />
        </div>
      </div>

      <div class="cta-section">
        <h2>Join Our Community</h2>
        <p>Whether you're a seasoned spotter or just starting out, we welcome you to join our community and share in our passion for aviation photography.</p>
        <div class="cta-buttons">
          <router-link to="/contact" class="btn btn-primary">Contact Us</router-link>
          <router-link to="/portfolio" class="btn btn-secondary">View Our Work</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
.about {
  min-height: 100vh;
  padding: var(--spacing-xl) 0;
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
}

.about-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  align-items: center;
}

.about-text {
  padding: var(--spacing-lg);
  background: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.about-text h2 {
  color: var(--white);
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

.about-text p {
  color: var(--white);
  opacity: 0.9;
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.about-text ul {
  color: var(--white);
  opacity: 0.9;
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.about-text li {
  margin-bottom: var(--spacing-sm);
}

.about-image {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 16/9;
}

.about-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.about-image:hover img {
  transform: scale(1.05);
}

.cta-section {
  text-align: center;
  padding: var(--spacing-xl);
  background: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: var(--spacing-xl);
}

.cta-section h2 {
  color: var(--white);
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

.cta-section p {
  color: var(--white);
  opacity: 0.9;
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

@media (max-width: 768px) {
  .about-section {
    grid-template-columns: 1fr;
  }

  .about-text {
    order: 2;
  }

  .about-image {
    order: 1;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .about-header h1 {
    font-size: 2.5rem;
  }
}
</style> 