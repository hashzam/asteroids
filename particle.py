import pygame
import random
import math
from constants import *


class Particle(pygame.sprite.Sprite):
    def __init__(self, x, y, velocity, color=COLOR_WHITE, lifetime=PARTICLE_LIFETIME, size=3):
        if hasattr(self, "containers"):
            super().__init__(self.containers)
        else:
            super().__init__()
        self.position = pygame.Vector2(x, y)
        self.velocity = velocity
        self.color = color
        self.lifetime = lifetime
        self.max_lifetime = lifetime
        self.size = size

    def update(self, dt):
        self.position += self.velocity * dt
        self.lifetime -= dt
        if self.lifetime <= 0:
            self.kill()

    def draw(self, screen):
        # Fade out as lifetime decreases
        alpha = self.lifetime / self.max_lifetime
        size = int(self.size * alpha) + 1
        pygame.draw.circle(screen, self.color, self.position, size)


class ParticleSystem:
    def __init__(self, particles_group, updatable_group, drawable_group):
        self.particles_group = particles_group
        Particle.containers = (particles_group, updatable_group, drawable_group)

    def explosion(self, x, y, color=COLOR_WHITE, count=PARTICLE_COUNT_EXPLOSION, speed=PARTICLE_SPEED):
        """Create explosion particles radiating outward"""
        for i in range(count):
            angle = (2 * math.pi * i) / count + random.uniform(-0.2, 0.2)
            particle_speed = speed * random.uniform(0.5, 1.5)
            velocity = pygame.Vector2(
                math.cos(angle) * particle_speed,
                math.sin(angle) * particle_speed
            )
            Particle(x, y, velocity, color, PARTICLE_LIFETIME * random.uniform(0.8, 1.2))

    def asteroid_explosion(self, x, y, radius):
        """Create asteroid-specific explosion based on size"""
        if radius >= ASTEROID_MAX_RADIUS:
            count = 15
            speed = PARTICLE_SPEED * 1.2
        elif radius >= ASTEROID_MIN_RADIUS * 2:
            count = 10
            speed = PARTICLE_SPEED
        else:
            count = 8
            speed = PARTICLE_SPEED * 0.8
        self.explosion(x, y, COLOR_WHITE, count, speed)

    def player_death(self, x, y):
        """Create large explosion for player death"""
        self.explosion(x, y, COLOR_WHITE, count=20, speed=PARTICLE_SPEED * 1.5)

    def thrust(self, x, y, direction, color=COLOR_ORANGE):
        """Create thrust particles behind the ship"""
        for _ in range(PARTICLE_COUNT_THRUST):
            spread = random.uniform(-0.3, 0.3)
            particle_velocity = direction.rotate(math.degrees(spread)) * -1 * random.uniform(50, 100)
            Particle(
                x + random.uniform(-3, 3),
                y + random.uniform(-3, 3),
                particle_velocity,
                color,
                PARTICLE_LIFETIME * 0.5,
                size=2
            )
