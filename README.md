# Petgress

Petgress is an interactive virtual pet simulator that runs entirely in the web browser.

The project features a virtual dog whose Food, Water, and Energy values decrease over time. The dog can automatically detect its lowest need and move to the appropriate station, while users can also manually select a station.

## Live Website

Petgress is available through GitHub Pages:

https://honesn.github.io/petgress/

Repository:

https://github.com/honesn/petgress

## Features

- Virtual dog that follows the mouse pointer on desktop
- Pointer and touch interaction on mobile devices
- Food, Water, and Energy status bars
- Needs that gradually decrease over time
- Automatic need detection
- Automatic movement to the appropriate station
- Manual Food, Water, and Bed station controls
- Eating, drinking, sleeping, and walking animations
- Responsive desktop, tablet, and mobile layout
- Mobile safe-area support
- No backend server required
- No user installation required
- Automatic GitHub Pages deployment

## How It Works

Petgress manages three primary needs:

- Food
- Water
- Energy

Each value gradually decreases while the application is running.

When one of the values reaches the automatic action threshold, the dog selects the lowest need and moves to the corresponding station.

### Automatic behavior

```text
Lowest need detected
        ↓
Move to the appropriate station
        ↓
Perform the required action
        ↓
Restore the corresponding value
        ↓
Return to following the user
