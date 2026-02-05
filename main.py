"""
main.py - THE ENTRY POINT OF THE GAME
=====================================

This is where Python starts when you run: python main.py

Think of this file like the "power button" of your game.
It does very little itself - it just:
1. Initializes pygame (the game library)
2. Creates a window
3. Hands control over to the Game class

WHY SO SIMPLE?
--------------
We keep main.py minimal because:
- Easy to see what happens when the game starts
- All the complex logic lives in game.py
- If we wanted a different way to start (like a test mode),
  we could make another file that uses the same Game class

THE RELATIONSHIP:
-----------------
main.py creates --> Game object --> Game.run() takes over the program

After game.run() is called, the program lives inside game.py's
main loop until the player quits.
"""

import pygame  # The game library that handles graphics, input, etc.
from constants import SCREEN_WIDTH, SCREEN_HEIGHT  # Our screen size settings
from game import Game  # The main Game class that runs everything


def main():
    """
    The main function - called when the program starts.

    This function:
    1. Starts pygame
    2. Creates the game window
    3. Creates the Game object
    4. Runs the game loop
    5. Cleans up when done
    """

    # Initialize pygame - this MUST be called before using any pygame features
    # It sets up the graphics system, sound system, etc.
    pygame.init()

    # Create the game window
    # pygame.display.set_mode() creates a window of the specified size
    # It returns a "Surface" object - think of it like a canvas we draw on
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

    # Set the window title (what appears in the title bar)
    pygame.display.set_caption("Asteroids")

    # Create our Game object, passing it the screen to draw on
    # The Game class (in game.py) contains ALL the game logic
    game = Game(screen)

    # Start the game! This function contains the "main loop" and
    # won't return until the player closes the window
    game.run()

    # Clean up pygame when we're done
    # This releases resources and closes the window properly
    pygame.quit()


# This is a Python idiom - it means "only run this code if this file
# is being run directly (not imported by another file)"
#
# When you run: python main.py
#   __name__ will be "__main__", so main() gets called
#
# If another file did: import main
#   __name__ would be "main", so main() would NOT be called automatically
if __name__ == "__main__":
    main()
