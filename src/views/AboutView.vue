<template>
  <div class="about">
    <section class="about-section">
      <div class="container">
        <h2>About VERSA</h2>
        <p>VERSA is Vancouver's premier aviation photography community, dedicated to capturing the beauty of aviation at YVR.</p>
        
        <div class="features">
          <div class="feature">
            <span class="icon">📍</span>
            <h3>Premium Locations</h3>
            <p>Access to exclusive spotting locations around YVR</p>
          </div>
          <div class="feature">
            <span class="icon">📸</span>
            <h3>Expert Guidance</h3>
            <p>Learn from experienced aviation photographers</p>
          </div>
          <div class="feature">
            <span class="icon">🤝</span>
            <h3>Community</h3>
            <p>Connect with fellow aviation enthusiasts</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No setup needed for this simple component
</script>

<style scoped>
.about-section {
  padding: 4rem 0;
}

.about-section h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.about-section p {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature {
  background: var(--gray);
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
}

.feature h3 {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.icon {
  font-size: 2.5rem;
  display: block;
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style> 