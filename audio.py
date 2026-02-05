import pygame
import os
import numpy as np


class AudioManager:
    def __init__(self):
        pygame.mixer.init(frequency=22050, size=-16, channels=2, buffer=512)
        self.sounds = {}
        self.sound_enabled = True

        # Create assets/sounds directory if it doesn't exist
        os.makedirs("assets/sounds", exist_ok=True)

        # Generate 8-bit style sounds
        self._generate_sounds()

        # Load the generated sounds
        self._load_sounds()

    def _generate_sounds(self):
        """Generate 8-bit style sound effects"""
        sample_rate = 22050

        # Shoot sound - short high-pitched beep
        self._create_sound_file("shoot", self._generate_shoot_sound(sample_rate))

        # Small explosion
        self._create_sound_file("explosion_small", self._generate_explosion_sound(sample_rate, 0.15, 800))

        # Medium explosion
        self._create_sound_file("explosion_medium", self._generate_explosion_sound(sample_rate, 0.2, 500))

        # Large explosion
        self._create_sound_file("explosion_large", self._generate_explosion_sound(sample_rate, 0.3, 300))

        # Player death - descending tone
        self._create_sound_file("player_death", self._generate_death_sound(sample_rate))

        # Thrust - low rumble (looped)
        self._create_sound_file("thrust", self._generate_thrust_sound(sample_rate))

        # Power-up collected
        self._create_sound_file("powerup", self._generate_powerup_sound(sample_rate))

        # Extra life
        self._create_sound_file("extra_life", self._generate_extra_life_sound(sample_rate))

    def _generate_shoot_sound(self, sample_rate):
        """Generate pew pew sound"""
        duration = 0.1
        t = np.linspace(0, duration, int(sample_rate * duration), False)
        # Frequency sweep from high to low
        freq = 1200 - 800 * t / duration
        wave = np.sin(2 * np.pi * freq * t)
        # Apply envelope
        envelope = np.exp(-t * 30)
        return (wave * envelope * 32767 * 0.3).astype(np.int16)

    def _generate_explosion_sound(self, sample_rate, duration, base_freq):
        """Generate explosion noise"""
        t = np.linspace(0, duration, int(sample_rate * duration), False)
        # White noise with decreasing amplitude
        noise = np.random.uniform(-1, 1, len(t))
        # Low pass filter effect by averaging
        filtered = np.convolve(noise, np.ones(5)/5, mode='same')
        # Add some low frequency rumble
        rumble = np.sin(2 * np.pi * base_freq * t * np.exp(-t * 10))
        wave = filtered * 0.5 + rumble * 0.5
        # Apply envelope
        envelope = np.exp(-t * (3 / duration))
        return (wave * envelope * 32767 * 0.4).astype(np.int16)

    def _generate_death_sound(self, sample_rate):
        """Generate descending death sound"""
        duration = 0.5
        t = np.linspace(0, duration, int(sample_rate * duration), False)
        # Descending frequency
        freq = 600 * np.exp(-t * 4)
        wave = np.sin(2 * np.pi * freq * t)
        # Add some noise
        noise = np.random.uniform(-0.3, 0.3, len(t))
        wave = wave + noise
        # Envelope
        envelope = np.exp(-t * 2)
        return (wave * envelope * 32767 * 0.4).astype(np.int16)

    def _generate_thrust_sound(self, sample_rate):
        """Generate low rumble thrust sound"""
        duration = 0.2  # Will be looped
        t = np.linspace(0, duration, int(sample_rate * duration), False)
        # Low frequency noise
        noise = np.random.uniform(-1, 1, len(t))
        # Low pass by averaging
        filtered = np.convolve(noise, np.ones(20)/20, mode='same')
        # Add low frequency hum
        hum = np.sin(2 * np.pi * 80 * t) * 0.3
        wave = filtered * 0.5 + hum
        return (wave * 32767 * 0.2).astype(np.int16)

    def _generate_powerup_sound(self, sample_rate):
        """Generate ascending power-up sound"""
        duration = 0.3
        t = np.linspace(0, duration, int(sample_rate * duration), False)
        # Ascending frequency
        freq = 400 + 600 * t / duration
        wave = np.sin(2 * np.pi * freq * t)
        envelope = np.sin(np.pi * t / duration)
        return (wave * envelope * 32767 * 0.3).astype(np.int16)

    def _generate_extra_life_sound(self, sample_rate):
        """Generate happy jingle for extra life"""
        duration = 0.4
        t = np.linspace(0, duration, int(sample_rate * duration), False)
        # Three ascending notes
        note1 = np.where(t < 0.13, np.sin(2 * np.pi * 523 * t), 0)  # C5
        note2 = np.where((t >= 0.13) & (t < 0.26), np.sin(2 * np.pi * 659 * t), 0)  # E5
        note3 = np.where(t >= 0.26, np.sin(2 * np.pi * 784 * t), 0)  # G5
        wave = note1 + note2 + note3
        envelope = np.exp(-t * 2) * 0.8 + 0.2
        return (wave * envelope * 32767 * 0.3).astype(np.int16)

    def _create_sound_file(self, name, samples):
        """Save samples as a WAV file"""
        filepath = f"assets/sounds/{name}.wav"
        # Create stereo sound
        stereo = np.column_stack((samples, samples))
        sound = pygame.sndarray.make_sound(stereo)
        # pygame doesn't have a direct way to save, so we'll use the samples
        try:
            import wave
            with wave.open(filepath, 'w') as wav_file:
                wav_file.setnchannels(2)
                wav_file.setsampwidth(2)
                wav_file.setframerate(22050)
                wav_file.writeframes(stereo.tobytes())
        except Exception:
            pass  # Fall back to in-memory sounds

    def _load_sounds(self):
        """Load sound files into pygame"""
        sound_files = [
            "shoot", "explosion_small", "explosion_medium", "explosion_large",
            "player_death", "thrust", "powerup", "extra_life"
        ]

        for name in sound_files:
            filepath = f"assets/sounds/{name}.wav"
            try:
                if os.path.exists(filepath):
                    self.sounds[name] = pygame.mixer.Sound(filepath)
                else:
                    # Generate in-memory if file doesn't exist
                    self.sounds[name] = self._generate_sound_memory(name)
            except Exception:
                self.sounds[name] = None

    def _generate_sound_memory(self, name):
        """Generate sound directly in memory"""
        sample_rate = 22050
        generators = {
            "shoot": lambda: self._generate_shoot_sound(sample_rate),
            "explosion_small": lambda: self._generate_explosion_sound(sample_rate, 0.15, 800),
            "explosion_medium": lambda: self._generate_explosion_sound(sample_rate, 0.2, 500),
            "explosion_large": lambda: self._generate_explosion_sound(sample_rate, 0.3, 300),
            "player_death": lambda: self._generate_death_sound(sample_rate),
            "thrust": lambda: self._generate_thrust_sound(sample_rate),
            "powerup": lambda: self._generate_powerup_sound(sample_rate),
            "extra_life": lambda: self._generate_extra_life_sound(sample_rate),
        }

        if name in generators:
            samples = generators[name]()
            stereo = np.column_stack((samples, samples))
            return pygame.sndarray.make_sound(stereo)
        return None

    def play(self, sound_name):
        """Play a sound effect"""
        if not self.sound_enabled:
            return
        sound = self.sounds.get(sound_name)
        if sound:
            sound.play()

    def play_explosion(self, radius):
        """Play explosion sound based on asteroid size"""
        if radius >= ASTEROID_MAX_RADIUS:
            self.play("explosion_large")
        elif radius >= ASTEROID_MIN_RADIUS * 2:
            self.play("explosion_medium")
        else:
            self.play("explosion_small")

    def start_thrust(self):
        """Start playing thrust sound (looped)"""
        if not self.sound_enabled:
            return
        sound = self.sounds.get("thrust")
        if sound and sound.get_num_channels() == 0:
            sound.play(-1)  # Loop indefinitely

    def stop_thrust(self):
        """Stop thrust sound"""
        sound = self.sounds.get("thrust")
        if sound:
            sound.stop()

    def toggle_sound(self):
        """Toggle sound on/off"""
        self.sound_enabled = not self.sound_enabled
        if not self.sound_enabled:
            pygame.mixer.stop()


# Import constants for explosion check
from constants import ASTEROID_MAX_RADIUS, ASTEROID_MIN_RADIUS
