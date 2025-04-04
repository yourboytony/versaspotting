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
        <p>Our team consists of dedicated aviation photographers and spotters from around the world. Each member brings their unique perspective and expertise to create a diverse and vibrant community.</p>
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
}
</style> 