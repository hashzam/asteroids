import pygame
import random
import math
from circleshape import CircleShape
from constants import *
from shot import Shot


class UFO(CircleShape):
    def __init__(self, x, y, is_small=False):
        radius = UFO_SMALL_RADIUS if is_small else UFO_LARGE_RADIUS
        super().__init__(x, y, radius)
        self.is_small = is_small
        self.speed = UFO_SMALL_SPEED if is_small else UFO_LARGE_SPEED
        self.shoot_timer = UFO_SHOOT_COOLDOWN
        self.direction_timer = 2.0  # Change direction every 2 seconds
        self.target = None  # Reference to player for aiming (set by Game)

        # Initial random direction
        self._set_random_direction()

    def _set_random_direction(self):
        """Set a random movement direction"""
        angle = random.uniform(0, 2 * math.pi)
        self.velocity = pygame.Vector2(
            math.cos(angle) * self.speed,
            math.sin(angle) * self.speed
        )

    def draw(self, screen):
        # Draw UFO as a classic flying saucer shape
        center = self.position
        r = self.radius

        # Main body (ellipse approximated with lines)
        points = []
        for i in range(8):
            angle = i * math.pi / 4
            x = center.x + r * math.cos(angle)
            y = center.y + r * 0.4 * math.sin(angle)
            points.append((x, y))
        pygame.draw.polygon(screen, COLOR_WHITE, points, LINE_WIDTH)

        # Dome on top
        dome_points = [
            (center.x - r * 0.5, center.y),
            (center.x - r * 0.3, center.y - r * 0.5),
            (center.x + r * 0.3, center.y - r * 0.5),
            (center.x + r * 0.5, center.y),
        ]
        pygame.draw.lines(screen, COLOR_WHITE, False, dome_points, LINE_WIDTH)

    def update(self, dt):
        # Move
        self.position += self.velocity * dt

        # Screen wrapping
        self.wrap_position()

        # Change direction periodically
        self.direction_timer -= dt
        if self.direction_timer <= 0:
            self._set_random_direction()
            self.direction_timer = random.uniform(1.5, 3.0)

        # Shooting
        self.shoot_timer -= dt
        if self.shoot_timer <= 0:
            self.shoot()
            self.shoot_timer = UFO_SHOOT_COOLDOWN

    def shoot(self):
        """Fire a shot"""
        if self.is_small and self.target:
            # Aim at player
            direction = (self.target.position - self.position).normalize()
            # Add some inaccuracy
            angle = math.atan2(direction.y, direction.x)
            angle += random.uniform(-0.2, 0.2)
            direction = pygame.Vector2(math.cos(angle), math.sin(angle))
        else:
            # Random direction
            angle = random.uniform(0, 2 * math.pi)
            direction = pygame.Vector2(math.cos(angle), math.sin(angle))

        shot = Shot(self.position.x, self.position.y, SHOT_RADIUS)
        shot.velocity = direction * PLAYER_SHOT_SPEED * 0.7  # Slightly slower than player shots

    def get_score(self):
        """Return score value"""
        return UFO_SMALL_SCORE if self.is_small else UFO_LARGE_SCORE


class UFOSpawner:
    """Handles UFO spawning logic"""
    def __init__(self):
        self.spawn_timer = random.uniform(UFO_SPAWN_MIN_TIME, UFO_SPAWN_MAX_TIME)
        self.active_ufo = None

    def update(self, dt, wave, ufos_group, player):
        """Update spawner and potentially spawn a UFO"""
        if self.active_ufo is None or not self.active_ufo.alive():
            self.spawn_timer -= dt
            if self.spawn_timer <= 0:
                self.spawn_ufo(wave, ufos_group, player)
                self.spawn_timer = random.uniform(UFO_SPAWN_MIN_TIME, UFO_SPAWN_MAX_TIME)

    def spawn_ufo(self, wave, ufos_group, player):
        """Spawn a UFO at a random edge"""
        # Small UFO appears more often at higher waves
        is_small = random.random() < min(0.1 + wave * 0.05, 0.5)

        # Random edge spawn
        if random.random() < 0.5:
            x = random.choice([-ASTEROID_MAX_RADIUS, SCREEN_WIDTH + ASTEROID_MAX_RADIUS])
            y = random.uniform(100, SCREEN_HEIGHT - 100)
        else:
            x = random.uniform(100, SCREEN_WIDTH - 100)
            y = random.choice([-ASTEROID_MAX_RADIUS, SCREEN_HEIGHT + ASTEROID_MAX_RADIUS])

        ufo = UFO(x, y, is_small)
        ufo.target = player
        self.active_ufo = ufo
