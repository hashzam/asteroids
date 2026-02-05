import pygame
import json
import os
import random
from constants import *
from player import Player
from asteroid import Asteroid
from shot import Shot
from hud import HUD
from particle import Particle, ParticleSystem
from ufo import UFO, UFOSpawner
from powerup import PowerUp, maybe_spawn_powerup
from starfield import Starfield
from logger import log_state, log_event

# Try to import audio, but make it optional (in case numpy isn't available)
try:
    from audio import AudioManager
    AUDIO_AVAILABLE = True
except ImportError:
    AUDIO_AVAILABLE = False


class Game:
    def __init__(self, screen):
        self.screen = screen
        self.clock = pygame.time.Clock()
        self.hud = HUD()

        # Sprite groups
        self.updatable = pygame.sprite.Group()
        self.drawable = pygame.sprite.Group()
        self.asteroids = pygame.sprite.Group()
        self.shots = pygame.sprite.Group()
        self.particles = pygame.sprite.Group()
        self.ufos = pygame.sprite.Group()
        self.powerups = pygame.sprite.Group()

        # Set up containers for auto-adding to groups
        Asteroid.containers = (self.asteroids, self.updatable, self.drawable)
        Shot.containers = (self.shots, self.updatable, self.drawable)
        Player.containers = (self.updatable, self.drawable)
        UFO.containers = (self.ufos, self.updatable, self.drawable)
        PowerUp.containers = (self.powerups, self.updatable, self.drawable)

        # Initialize particle system
        self.particle_system = ParticleSystem(self.particles, self.updatable, self.drawable)

        # Initialize audio
        if AUDIO_AVAILABLE:
            try:
                self.audio = AudioManager()
            except Exception:
                self.audio = None
        else:
            self.audio = None

        # UFO spawner
        self.ufo_spawner = UFOSpawner()

        # Starfield background
        self.starfield = Starfield(num_stars=100)

        # Game state
        self.state = STATE_MENU
        self.score = 0
        self.lives = PLAYER_LIVES
        self.wave = 0
        self.wave_timer = 0
        self.high_score = self.load_high_score()

        # Screen shake
        self.screen_shake = 0
        self.shake_offset = pygame.Vector2(0, 0)

        # Player
        self.player = None

        # Track thrust state for audio
        self.thrusting = False

    def load_high_score(self):
        """Load high score from file"""
        try:
            if os.path.exists("highscore.json"):
                with open("highscore.json", "r") as f:
                    data = json.load(f)
                    return data.get("high_score", 0)
        except (json.JSONDecodeError, IOError):
            pass
        return 0

    def save_high_score(self):
        """Save high score to file"""
        try:
            with open("highscore.json", "w") as f:
                json.dump({"high_score": self.high_score}, f)
        except IOError:
            pass

    def start_game(self):
        """Start a new game"""
        # Clear all sprites
        for sprite in list(self.updatable):
            sprite.kill()

        # Reset state
        self.score = 0
        self.lives = PLAYER_LIVES
        self.wave = 0

        # Reset UFO spawner
        self.ufo_spawner = UFOSpawner()

        # Create player
        self.player = Player(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
        if self.audio:
            self.player.on_shoot = lambda: self.audio.play("shoot")

        # Start first wave
        self.state = STATE_WAVE_PAUSE
        self.wave_timer = WAVE_PAUSE_TIME

    def start_wave(self):
        """Start a new wave of asteroids"""
        self.wave += 1
        num_asteroids = WAVE_START_ASTEROIDS + (self.wave - 1) * WAVE_ASTEROID_INCREMENT
        speed_multiplier = WAVE_SPEED_MULTIPLIER ** (self.wave - 1)

        for _ in range(num_asteroids):
            self.spawn_asteroid(speed_multiplier)

        self.state = STATE_PLAYING

    def spawn_asteroid(self, speed_multiplier=1.0):
        """Spawn an asteroid at a random edge"""
        edges = [
            (pygame.Vector2(1, 0), lambda y: pygame.Vector2(-ASTEROID_MAX_RADIUS, y * SCREEN_HEIGHT)),
            (pygame.Vector2(-1, 0), lambda y: pygame.Vector2(SCREEN_WIDTH + ASTEROID_MAX_RADIUS, y * SCREEN_HEIGHT)),
            (pygame.Vector2(0, 1), lambda x: pygame.Vector2(x * SCREEN_WIDTH, -ASTEROID_MAX_RADIUS)),
            (pygame.Vector2(0, -1), lambda x: pygame.Vector2(x * SCREEN_WIDTH, SCREEN_HEIGHT + ASTEROID_MAX_RADIUS)),
        ]

        edge = random.choice(edges)
        speed = random.randint(40, 100) * speed_multiplier
        velocity = edge[0] * speed
        velocity = velocity.rotate(random.randint(-30, 30))
        position = edge[1](random.uniform(0, 1))

        asteroid = Asteroid(position.x, position.y, ASTEROID_MAX_RADIUS)
        asteroid.velocity = velocity

    def handle_events(self):
        """Handle pygame events"""
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False

            if event.type == pygame.KEYDOWN:
                if self.state == STATE_MENU:
                    if event.key == pygame.K_SPACE:
                        self.start_game()

                elif self.state == STATE_PLAYING:
                    if event.key in (pygame.K_ESCAPE, pygame.K_p):
                        self.state = STATE_PAUSED
                        if self.audio:
                            self.audio.stop_thrust()

                elif self.state == STATE_PAUSED:
                    if event.key in (pygame.K_ESCAPE, pygame.K_p):
                        self.state = STATE_PLAYING

                elif self.state == STATE_GAME_OVER:
                    if event.key == pygame.K_SPACE:
                        self.start_game()

        return True

    def update(self, dt):
        """Update game state"""
        log_state()

        # Always update starfield for twinkling effect
        self.starfield.update(dt)

        if self.state == STATE_MENU:
            pass  # Nothing to update in menu

        elif self.state == STATE_WAVE_PAUSE:
            self.wave_timer -= dt
            # Update particles during wave pause
            self.particles.update(dt)
            if self.wave_timer <= 0:
                self.start_wave()

        elif self.state == STATE_PLAYING:
            # Check thrust state for audio
            keys = pygame.key.get_pressed()
            is_thrusting = keys[pygame.K_w] or keys[pygame.K_s]
            if is_thrusting and not self.thrusting:
                if self.audio:
                    self.audio.start_thrust()
                self.thrusting = True
            elif not is_thrusting and self.thrusting:
                if self.audio:
                    self.audio.stop_thrust()
                self.thrusting = False

            # Create thrust particles
            if is_thrusting and self.player:
                direction = pygame.Vector2(0, 1).rotate(self.player.rotation)
                # Calculate position behind the ship
                rear = self.player.position - direction * self.player.radius
                self.particle_system.thrust(rear.x, rear.y, direction)

            # Update all sprites
            self.updatable.update(dt)

            # Update UFO spawner
            self.ufo_spawner.update(dt, self.wave, self.ufos, self.player)

            # Check for collisions
            self.check_collisions()

            # Update screen shake
            if self.screen_shake > 0:
                self.screen_shake -= dt
                intensity = min(self.screen_shake * 20, 10)
                self.shake_offset = pygame.Vector2(
                    random.uniform(-intensity, intensity),
                    random.uniform(-intensity, intensity)
                )
            else:
                self.shake_offset = pygame.Vector2(0, 0)

            # Check if wave is complete (no asteroids and no UFOs)
            if len(self.asteroids) == 0 and len(self.ufos) == 0:
                self.state = STATE_WAVE_PAUSE
                self.wave_timer = WAVE_PAUSE_TIME

        elif self.state == STATE_PAUSED:
            pass  # Nothing to update when paused

        elif self.state == STATE_GAME_OVER:
            # Update particles during game over
            self.particles.update(dt)

    def check_collisions(self):
        """Check for collisions between game objects"""
        # Player-asteroid collision
        for asteroid in self.asteroids:
            if self.player and asteroid.collides_with(self.player):
                if self.player.is_vulnerable():
                    log_event("player_hit")
                    self.player_death()
                    break

        # Player-UFO collision
        for ufo in self.ufos:
            if self.player and ufo.collides_with(self.player):
                if self.player.is_vulnerable():
                    log_event("player_hit")
                    self.player_death()
                    break

        # Player-powerup collision
        for powerup in list(self.powerups):
            if self.player and powerup.collides_with(self.player):
                is_extra_life = powerup.apply(self.player)
                if is_extra_life:
                    self.lives += 1
                    if self.audio:
                        self.audio.play("extra_life")
                else:
                    if self.audio:
                        self.audio.play("powerup")
                powerup.kill()

        # Shot-asteroid collision
        for asteroid in list(self.asteroids):
            for shot in list(self.shots):
                if asteroid.collides_with(shot):
                    log_event("asteroid_shot")
                    self.score += asteroid.get_score()

                    # Create explosion particles
                    self.particle_system.asteroid_explosion(
                        asteroid.position.x,
                        asteroid.position.y,
                        asteroid.radius
                    )

                    # Play explosion sound
                    if self.audio:
                        self.audio.play_explosion(asteroid.radius)

                    # Add screen shake based on asteroid size
                    self.screen_shake = max(self.screen_shake, asteroid.radius / 60)

                    # Maybe spawn power-up from large asteroids
                    if asteroid.radius >= ASTEROID_MAX_RADIUS:
                        maybe_spawn_powerup(asteroid.position.x, asteroid.position.y, self.powerups)

                    asteroid.split()
                    shot.kill()
                    break

        # Shot-UFO collision
        for ufo in list(self.ufos):
            for shot in list(self.shots):
                if ufo.collides_with(shot):
                    log_event("ufo_shot")
                    self.score += ufo.get_score()

                    # Create explosion particles
                    self.particle_system.explosion(
                        ufo.position.x,
                        ufo.position.y,
                        COLOR_WHITE,
                        count=15,
                        speed=PARTICLE_SPEED * 1.2
                    )

                    # Play large explosion sound
                    if self.audio:
                        self.audio.play("explosion_large")

                    # Screen shake
                    self.screen_shake = 0.4

                    # Maybe spawn power-up
                    maybe_spawn_powerup(ufo.position.x, ufo.position.y, self.powerups)

                    ufo.kill()
                    shot.kill()
                    break

    def player_death(self):
        """Handle player death"""
        # Create death explosion
        if self.player:
            self.particle_system.player_death(self.player.position.x, self.player.position.y)

        # Play death sound
        if self.audio:
            self.audio.play("player_death")
            self.audio.stop_thrust()

        # Screen shake
        self.screen_shake = 0.5

        self.thrusting = False
        self.lives -= 1

        if self.lives <= 0:
            # Game over
            self.game_over()
        else:
            # Respawn player
            self.player.reset(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)

    def game_over(self):
        """Handle game over"""
        self.state = STATE_GAME_OVER
        if self.score > self.high_score:
            self.high_score = self.score
            self.save_high_score()

    def draw(self):
        """Draw everything to screen"""
        self.screen.fill("black")

        # Draw starfield background (always visible)
        self.starfield.draw(self.screen)

        # Apply screen shake offset
        offset = self.shake_offset if self.state == STATE_PLAYING else pygame.Vector2(0, 0)

        if self.state == STATE_MENU:
            self.hud.draw_main_menu(self.screen, self.high_score)

        elif self.state == STATE_WAVE_PAUSE:
            # Draw game objects
            for obj in self.drawable:
                # Temporarily offset position for screen shake
                if hasattr(obj, 'position'):
                    original_pos = obj.position.copy()
                    obj.position += offset
                    obj.draw(self.screen)
                    obj.position = original_pos
                else:
                    obj.draw(self.screen)
            # Draw HUD
            self.hud.draw_score(self.screen, self.score)
            self.hud.draw_high_score(self.screen, self.high_score)
            self.hud.draw_lives(self.screen, self.lives)
            # Draw wave announcement
            self.hud.draw_wave_announcement(self.screen, self.wave + 1)

        elif self.state == STATE_PLAYING:
            # Draw game objects with shake offset
            for obj in self.drawable:
                if hasattr(obj, 'position'):
                    original_pos = obj.position.copy()
                    obj.position += offset
                    obj.draw(self.screen)
                    obj.position = original_pos
                else:
                    obj.draw(self.screen)
            # Draw HUD
            self.hud.draw_score(self.screen, self.score)
            self.hud.draw_high_score(self.screen, self.high_score)
            self.hud.draw_lives(self.screen, self.lives)
            self.hud.draw_wave(self.screen, self.wave)

        elif self.state == STATE_PAUSED:
            # Draw game objects (frozen)
            for obj in self.drawable:
                obj.draw(self.screen)
            # Draw HUD
            self.hud.draw_score(self.screen, self.score)
            self.hud.draw_lives(self.screen, self.lives)
            self.hud.draw_wave(self.screen, self.wave)
            # Draw pause overlay
            self.hud.draw_paused(self.screen)

        elif self.state == STATE_GAME_OVER:
            # Draw game objects
            for obj in self.drawable:
                obj.draw(self.screen)
            # Draw game over screen
            self.hud.draw_game_over(self.screen, self.score, self.high_score)

        pygame.display.flip()

    def run(self):
        """Main game loop"""
        dt = 0

        while True:
            if not self.handle_events():
                return

            self.update(dt)
            self.draw()

            dt = self.clock.tick(60) / 1000
