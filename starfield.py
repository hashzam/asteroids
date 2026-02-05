import pygame
import random
from constants import SCREEN_WIDTH, SCREEN_HEIGHT


class Starfield:
    def __init__(self, num_stars=100):
        self.stars = []
        for _ in range(num_stars):
            x = random.randint(0, SCREEN_WIDTH)
            y = random.randint(0, SCREEN_HEIGHT)
            # Different star sizes and brightness
            size = random.choice([1, 1, 1, 2])  # Mostly small stars
            brightness = random.randint(60, 200)
            twinkle_speed = random.uniform(1.0, 3.0)
            twinkle_offset = random.uniform(0, 6.28)  # Random phase
            self.stars.append({
                'x': x,
                'y': y,
                'size': size,
                'base_brightness': brightness,
                'twinkle_speed': twinkle_speed,
                'twinkle_offset': twinkle_offset
            })
        self.time = 0

    def update(self, dt):
        self.time += dt

    def draw(self, screen):
        import math
        for star in self.stars:
            # Twinkle effect
            twinkle = math.sin(self.time * star['twinkle_speed'] + star['twinkle_offset'])
            brightness = int(star['base_brightness'] + twinkle * 40)
            brightness = max(40, min(255, brightness))

            color = (brightness, brightness, brightness)
            if star['size'] == 1:
                screen.set_at((star['x'], star['y']), color)
            else:
                pygame.draw.circle(screen, color, (star['x'], star['y']), star['size'])
