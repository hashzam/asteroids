import pygame
import random
from circleshape import CircleShape
from constants import *
from shot import Shot


class Player(CircleShape):
    def __init__(self, x, y):
        super().__init__(x, y, PLAYER_RADIUS)
        self.rotation = 0
        self.shot_cooldown_timer = 0
        self.invincible = False
        self.invincibility_timer = 0
        self.blink_timer = 0
        self.visible = True
        # Power-up states
        self.rapid_fire = False
        self.rapid_fire_timer = 0
        self.spread_shot = False
        self.spread_shot_timer = 0
        self.shield = False
        self.shield_timer = 0
        # Callback for shoot sound
        self.on_shoot = None
        # Thrust state for visual
        self.thrusting = False
        self.flame_flicker = 0

    def draw(self, screen):
        # Blink when invincible
        if self.invincible and not self.visible:
            return

        # Draw shield if active
        if self.shield:
            pygame.draw.circle(screen, COLOR_BLUE, self.position, self.radius + 10, 2)

        # Draw thrust flame if thrusting
        if self.thrusting:
            self.draw_thrust_flame(screen)

        pygame.draw.polygon(screen, "white", self.triangle(), LINE_WIDTH)

    def draw_thrust_flame(self, screen):
        """Draw animated thrust flame behind ship"""
        forward = pygame.Vector2(0, 1).rotate(self.rotation)
        right = pygame.Vector2(0, 1).rotate(self.rotation + 90) * self.radius / 3

        # Base of flame (at ship's rear)
        base = self.position - forward * self.radius
        left_base = base - right
        right_base = base + right

        # Tip of flame (with flicker)
        flicker = random.uniform(0.7, 1.3)
        flame_length = self.radius * 1.5 * flicker
        tip = base - forward * flame_length

        # Draw flame as orange/yellow triangle
        flame_points = [left_base, tip, right_base]
        pygame.draw.polygon(screen, COLOR_ORANGE, flame_points, 0)

        # Inner flame (smaller, brighter)
        inner_right = pygame.Vector2(0, 1).rotate(self.rotation + 90) * self.radius / 5
        inner_left_base = base - inner_right
        inner_right_base = base + inner_right
        inner_tip = base - forward * (flame_length * 0.6)
        inner_points = [inner_left_base, inner_tip, inner_right_base]
        pygame.draw.polygon(screen, COLOR_YELLOW, inner_points, 0)

    def triangle(self):
        forward = pygame.Vector2(0, 1).rotate(self.rotation)
        right = pygame.Vector2(0, 1).rotate(self.rotation + 90) * self.radius / 1.5
        a = self.position + forward * self.radius
        b = self.position - forward * self.radius - right
        c = self.position - forward * self.radius + right
        return [a, b, c]

    def update(self, dt):
        keys = pygame.key.get_pressed()

        # Track thrusting state for visual
        self.thrusting = keys[pygame.K_w] or keys[pygame.K_s]

        if keys[pygame.K_w]:
            self.move(dt)
        if keys[pygame.K_s]:
            self.move(-dt)
        if keys[pygame.K_a]:
            self.rotate(-dt)
        if keys[pygame.K_d]:
            self.rotate(dt)
        if keys[pygame.K_SPACE]:
            cooldown = PLAYER_SHOOT_COOLDOWN_SECONDS
            if self.rapid_fire:
                cooldown /= POWERUP_RAPID_FIRE_MULTIPLIER
            if self.shot_cooldown_timer <= 0:
                self.shoot()
                self.shot_cooldown_timer = cooldown
        self.shot_cooldown_timer -= dt

        # Update invincibility
        if self.invincible:
            self.invincibility_timer -= dt
            self.blink_timer -= dt
            if self.blink_timer <= 0:
                self.visible = not self.visible
                self.blink_timer = 0.1
            if self.invincibility_timer <= 0:
                self.invincible = False
                self.visible = True

        # Update power-up timers
        if self.rapid_fire:
            self.rapid_fire_timer -= dt
            if self.rapid_fire_timer <= 0:
                self.rapid_fire = False

        if self.spread_shot:
            self.spread_shot_timer -= dt
            if self.spread_shot_timer <= 0:
                self.spread_shot = False

        if self.shield:
            self.shield_timer -= dt
            if self.shield_timer <= 0:
                self.shield = False

        # Screen wrapping
        self.wrap_position()

    def rotate(self, dt):
        self.rotation += PLAYER_TURN_SPEED * dt

    def move(self, dt):
        unit_vector = pygame.Vector2(0, 1)
        rotated_vector = unit_vector.rotate(self.rotation)
        rotated_with_speed_vector = rotated_vector * PLAYER_SPEED * dt
        self.position += rotated_with_speed_vector

    def shoot(self):
        if self.spread_shot:
            # Fire three shots in a spread
            for angle_offset in [-15, 0, 15]:
                shot = Shot(self.position.x, self.position.y, SHOT_RADIUS)
                direction = pygame.Vector2(0, 1).rotate(self.rotation + angle_offset)
                shot.velocity = direction * PLAYER_SHOT_SPEED
        else:
            shot = Shot(self.position.x, self.position.y, SHOT_RADIUS)
            direction = pygame.Vector2(0, 1).rotate(self.rotation)
            shot.velocity = direction * PLAYER_SHOT_SPEED

        # Play shoot sound
        if self.on_shoot:
            self.on_shoot()

    def make_invincible(self, duration=PLAYER_INVINCIBILITY_TIME):
        self.invincible = True
        self.invincibility_timer = duration
        self.blink_timer = 0.1

    def is_vulnerable(self):
        return not self.invincible and not self.shield

    def reset(self, x, y):
        """Reset player to center position"""
        self.position = pygame.Vector2(x, y)
        self.velocity = pygame.Vector2(0, 0)
        self.rotation = 0
        self.make_invincible()
