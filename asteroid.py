import pygame
from circleshape import CircleShape
from constants import *
from logger import log_event
import random
import math

class Asteroid(CircleShape):
    def __init__(self, x, y, radius):
        super().__init__(x, y, radius)
        # Generate irregular polygon shape
        self.vertices = self._generate_shape()
        self.rotation = random.uniform(0, 360)
        self.rotation_speed = random.uniform(-60, 60)  # Degrees per second

    def _generate_shape(self):
        """Generate irregular polygon vertices"""
        num_vertices = random.randint(8, 12)
        vertices = []
        for i in range(num_vertices):
            angle = (2 * math.pi * i) / num_vertices
            # Add randomness to radius (70-100% of actual radius)
            r = self.radius * random.uniform(0.7, 1.0)
            x = math.cos(angle) * r
            y = math.sin(angle) * r
            vertices.append(pygame.Vector2(x, y))
        return vertices

    def draw(self, screen):
        # Transform vertices based on position and rotation
        rotated_vertices = []
        for v in self.vertices:
            # Rotate
            rotated = v.rotate(self.rotation)
            # Translate
            final = self.position + rotated
            rotated_vertices.append((final.x, final.y))
        pygame.draw.polygon(screen, "white", rotated_vertices, LINE_WIDTH)

    def update(self, dt):
        self.position += self.velocity * dt
        self.rotation += self.rotation_speed * dt
        self.wrap_position()

    def get_score(self):
        """Return score based on asteroid size"""
        if self.radius >= ASTEROID_MAX_RADIUS:
            return ASTEROID_SCORE_LARGE
        elif self.radius >= ASTEROID_MIN_RADIUS * 2:
            return ASTEROID_SCORE_MEDIUM
        else:
            return ASTEROID_SCORE_SMALL

    def split(self):
        self.kill()
        if self.radius <= ASTEROID_MIN_RADIUS:
            return

        log_event("asteroid_split")
        new_angle = random.uniform(20, 50)
        rotate_angle = self.velocity.rotate(new_angle)

        new_radius = self.radius - ASTEROID_MIN_RADIUS
        new_asteroid_1 = Asteroid(self.position.x, self.position.y, new_radius)
        new_asteroid_1.velocity = rotate_angle * 1.2

        new_asteroid_2 = Asteroid(self.position.x, self.position.y, new_radius)
        new_asteroid_2.velocity = -rotate_angle * 1.2
