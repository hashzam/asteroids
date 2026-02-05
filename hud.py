import pygame
from constants import *


class HUD:
    def __init__(self):
        pygame.font.init()
        self.font_large = pygame.font.Font(None, 72)
        self.font_medium = pygame.font.Font(None, 48)
        self.font_small = pygame.font.Font(None, 36)

    def draw_score(self, screen, score):
        """Draw score in top-left corner"""
        text = self.font_small.render(f"SCORE: {score}", True, COLOR_WHITE)
        screen.blit(text, (20, 20))

    def draw_high_score(self, screen, high_score):
        """Draw high score in top-center"""
        text = self.font_small.render(f"HIGH: {high_score}", True, COLOR_WHITE)
        rect = text.get_rect(midtop=(SCREEN_WIDTH // 2, 20))
        screen.blit(text, rect)

    def draw_lives(self, screen, lives):
        """Draw lives as ship icons in top-right"""
        ship_points = [
            pygame.Vector2(0, -10),
            pygame.Vector2(-7, 10),
            pygame.Vector2(7, 10)
        ]
        start_x = SCREEN_WIDTH - 30
        for i in range(lives):
            x = start_x - i * 30
            y = 35
            points = [(x + p.x, y + p.y) for p in ship_points]
            pygame.draw.polygon(screen, COLOR_WHITE, points, 2)

    def draw_wave(self, screen, wave):
        """Draw current wave number"""
        text = self.font_small.render(f"WAVE: {wave}", True, COLOR_WHITE)
        screen.blit(text, (20, 55))

    def draw_wave_announcement(self, screen, wave):
        """Draw wave start announcement"""
        text = self.font_large.render(f"WAVE {wave}", True, COLOR_WHITE)
        rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        screen.blit(text, rect)

    def draw_game_over(self, screen, score, high_score):
        """Draw game over screen"""
        # Game over text
        text = self.font_large.render("GAME OVER", True, COLOR_WHITE)
        rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 60))
        screen.blit(text, rect)

        # Final score
        text = self.font_medium.render(f"FINAL SCORE: {score}", True, COLOR_WHITE)
        rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        screen.blit(text, rect)

        # High score
        if score >= high_score:
            text = self.font_medium.render("NEW HIGH SCORE!", True, COLOR_YELLOW)
        else:
            text = self.font_medium.render(f"HIGH SCORE: {high_score}", True, COLOR_WHITE)
        rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 50))
        screen.blit(text, rect)

        # Restart prompt
        text = self.font_small.render("PRESS SPACE TO RESTART", True, COLOR_WHITE)
        rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 120))
        screen.blit(text, rect)

    def draw_main_menu(self, screen, high_score):
        """Draw main menu"""
        # Title
        text = self.font_large.render("ASTEROIDS", True, COLOR_WHITE)
        rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 3))
        screen.blit(text, rect)

        # High score
        text = self.font_medium.render(f"HIGH SCORE: {high_score}", True, COLOR_WHITE)
        rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        screen.blit(text, rect)

        # Start prompt
        text = self.font_medium.render("PRESS SPACE TO START", True, COLOR_WHITE)
        rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 80))
        screen.blit(text, rect)

        # Controls
        controls = [
            "WASD - Move",
            "SPACE - Shoot",
            "ESC/P - Pause"
        ]
        y_offset = SCREEN_HEIGHT - 120
        for line in controls:
            text = self.font_small.render(line, True, COLOR_WHITE)
            rect = text.get_rect(center=(SCREEN_WIDTH // 2, y_offset))
            screen.blit(text, rect)
            y_offset += 30

    def draw_paused(self, screen):
        """Draw pause overlay"""
        # Semi-transparent overlay
        overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
        overlay.set_alpha(128)
        overlay.fill((0, 0, 0))
        screen.blit(overlay, (0, 0))

        # Paused text
        text = self.font_large.render("PAUSED", True, COLOR_WHITE)
        rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        screen.blit(text, rect)

        # Resume prompt
        text = self.font_small.render("PRESS ESC/P TO RESUME", True, COLOR_WHITE)
        rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 60))
        screen.blit(text, rect)
