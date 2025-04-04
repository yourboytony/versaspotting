<template>
  <div class="about">
    <section class="about-header">
      <h1>About VERSA</h1>
      <p>Our story, team, and mission</p>
    </section>

    <section class="story">
      <div class="section-content">
        <div class="story-text">
          <h2>Our Story</h2>
          <p>VERSA Spotting Group was founded by a group of passionate aviation enthusiasts who share a common love for aircraft photography. Based at Vancouver International Airport (YVR), we capture the beauty and power of aviation through our lenses.</p>
          <p>What started as a small group of friends sharing their spotting experiences has grown into a community of photographers dedicated to documenting the diverse aircraft that grace YVR's runways.</p>
        </div>
        <div class="story-icon">
          <font-awesome-icon :icon="['fas', 'plane']" />
        </div>
      </div>
    </section>

    <section class="team">
      <div class="section-header">
        <h2>Our Team</h2>
        <div class="underline"></div>
      </div>
      <div class="team-grid">
        <div v-for="member in teamMembers" :key="member.name" class="team-card">
          <div class="member-icon">
            <font-awesome-icon :icon="['fas', 'user']" />
          </div>
          <h3>{{ member.name }}</h3>
          <p class="role">{{ member.role }}</p>
          <p class="bio">{{ member.bio }}</p>
          <a :href="member.instagram" target="_blank" class="social-link">
            <font-awesome-icon :icon="['fab', 'instagram']" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>

    <section class="mission">
      <div class="section-content">
        <div class="mission-icon">
          <font-awesome-icon :icon="['fas', 'bullseye']" />
        </div>
        <div class="mission-text">
          <h2>Our Mission</h2>
          <p>At VERSA Spotting Group, our mission is to capture and share the beauty of aviation through high-quality photography. We aim to:</p>
          <ul>
            <li>Document the diverse aircraft that operate at YVR</li>
            <li>Share our knowledge and passion for aviation photography</li>
            <li>Build a community of aviation enthusiasts</li>
            <li>Promote the art of aircraft spotting</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const teamMembers = [
  {
    name: 'Anthony Nigro',
    role: 'Lead Photographer',
    bio: 'Passionate about aviation photography and capturing unique moments at YVR.',
    instagram: 'https://instagram.com/anthonynigro'
  },
  {
    name: 'Skyeler Kho',
    role: 'Photographer',
    bio: 'Specializes in capturing unique angles and lighting in aviation photography.',
    instagram: 'https://instagram.com/skyelerkho'
  },
  {
    name: 'Spencer Parkinson',
    role: 'Photographer',
    bio: 'Expert in aircraft identification and aviation history.',
    instagram: 'https://instagram.com/spencerparkinson'
  },
  {
    name: 'Stefan Tofan',
    role: 'Photographer',
    bio: 'Focuses on detailed aircraft photography and technical aspects.',
    instagram: 'https://instagram.com/stefantofan'
  },
  {
    name: 'Jared Powers',
    role: 'Photographer',
    bio: 'Specializes in capturing aircraft in motion and dynamic shots.',
    instagram: 'https://instagram.com/jaredpowers'
  }
];
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

.section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

.story, .mission {
  padding: var(--spacing-xl) 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.story-text, .mission-text {
  color: var(--white);
}

.story-text h2, .mission-text h2 {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.story-text p, .mission-text p {
  margin-bottom: var(--spacing-md);
  opacity: 0.9;
  line-height: 1.6;
}

.story-icon, .mission-icon {
  font-size: 8rem;
  color: var(--primary-color);
  opacity: 0.2;
  text-align: center;
  animation: float 6s infinite ease-in-out;
}

.team {
  padding: var(--spacing-xl) 0;
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.underline {
  width: 100px;
  height: 4px;
  background-color: var(--primary-color);
  margin: 0 auto;
  border-radius: var(--radius-sm);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.team-card {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.member-icon {
  width: 100px;
  height: 100px;
  background-color: rgba(132, 155, 85, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
  font-size: 2.5rem;
  color: var(--primary-color);
}

.team-card h3 {
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: var(--spacing-sm);
}

.role {
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.bio {
  color: var(--white);
  opacity: 0.9;
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.social-link:hover {
  color: var(--primary-light);
  transform: translateY(-2px);
}

.mission-text ul {
  list-style: none;
  padding: 0;
  margin: var(--spacing-md) 0;
}

.mission-text ul li {
  color: var(--white);
  opacity: 0.9;
  margin-bottom: var(--spacing-sm);
  padding-left: var(--spacing-lg);
  position: relative;
}

.mission-text ul li::before {
  content: '•';
  color: var(--primary-color);
  position: absolute;
  left: 0;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .section-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .story-icon, .mission-icon {
    order: -1;
    margin-bottom: var(--spacing-xl);
  }

  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style> 