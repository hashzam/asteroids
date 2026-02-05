import pygame
import random
import math
from circleshape import CircleShape
from constants import *


class PowerUp(CircleShape):
    TYPES = ['shield', 'rapid_fire', 'spread_shot', 'extra_life']
    COLORS = {
        'shield': COLOR_BLUE,
        'rapid_fire': COLOR_YELLOW,
        'spread_shot': COLOR_ORANGE,
        'extra_life': COLOR_GREEN
    }

    def __init__(self, x, y, powerup_type=None):
        super().__init__(x, y, POWERUP_RADIUS)
        self.type = powerup_type or random.choice(self.TYPES)
        self.color = self.COLORS[self.type]
        self.lifetime = 10.0  # Despawn after 10 seconds
        self.pulse_timer = 0
        self.pulse_scale = 1.0

        # Slow drift
        angle = random.uniform(0, 2 * math.pi)
        self.velocity = pygame.Vector2(math.cos(angle), math.sin(angle)) * 20

    def draw(self, screen):
        # Pulsing effect
        pulse_radius = self.radius * self.pulse_scale

        # Draw outer ring
        pygame.draw.circle(screen, self.color, self.position, int(pulse_radius), LINE_WIDTH)

        # Draw inner symbol based on type
        center = self.position
        r = pulse_radius * 0.5

        if self.type == 'shield':
            # Shield icon (circle)
            pygame.draw.circle(screen, self.color, center, int(r), 1)
        elif self.type == 'rapid_fire':
            # Lightning bolt
            points = [
                (center.x, center.y - r),
                (center.x - r * 0.3, center.y),
                (center.x + r * 0.2, center.y),
                (center.x, center.y + r)
            ]
            pygame.draw.lines(screen, self.color, False, points, 2)
        elif self.type == 'spread_shot':
            # Triple lines
            for angle in [-30, 0, 30]:
                rad = math.radians(angle - 90)
                end = (center.x + r * math.cos(rad), center.y + r * math.sin(rad))
                pygame.draw.line(screen, self.color, center, end, 2)
        elif self.type == 'extra_life':
            # Plus sign
            pygame.draw.line(screen, self.color,
                           (center.x - r, center.y),
                           (center.x + r, center.y), 2)
            pygame.draw.line(screen, self.color,
                           (center.x, center.y - r),
                           (center.x, center.y + r), 2)

    def update(self, dt):
        self.position += self.velocity * dt
        self.wrap_position()

        # Update pulse effect
        self.pulse_timer += dt * 3
        self.pulse_scale = 1.0 + 0.15 * math.sin(self.pulse_timer)

        # Update lifetime
        self.lifetime -= dt
        if self.lifetime <= 0:
            self.kill()

    def apply(self, player):
        """Apply power-up effect to player"""
        if self.type == 'shield':
            player.shield = True
            player.shield_timer = POWERUP_SHIELD_DURATION
        elif self.type == 'rapid_fire':
            player.rapid_fire = True
            player.rapid_fire_timer = POWERUP_DURATION
        elif self.type == 'spread_shot':
            player.spread_shot = True
            player.spread_shot_timer = POWERUP_DURATION
        elif self.type == 'extra_life':
            return True  # Signal to add a life
        return False


def maybe_spawn_powerup(x, y, powerups_group):
    """Potentially spawn a power-up at the given position"""
    if random.random() < POWERUP_DROP_CHANCE:
        PowerUp(x, y)
