import { SpriteAtlasData } from "kaboom";

export const playerAtlas: SpriteAtlasData = {
    'player': {
        x: 0,
        y: 0,
        width: 128,
        height: 32,
        sliceX: 8,
        sliceY: 2,
        anims: {
          'idle-down': {
            from: 0,
            to: 0,
          },
          'idle-up': {
            from: 4,
            to: 4,
          },
          'idle-right': {
            from: 8,
            to: 8,
          },
          'idle-left': {
            from: 12,
            to: 12, 
          },
          'run-down': {
            from: 0,
            to: 3,
            loop: true,
          },
          'run-up': {
            from: 4,
            to: 7,
            loop: true,
          },
          'run-right': {
            from: 8,
            to: 11,
            loop: true,
          },
          'run-left': {
            from: 12,
            to: 15, 
            loop: true,
          }
        }
    },
}

export const overWorldTile: SpriteAtlasData = {
    'gram': {
        x: 0,
        y: 0,
        width: 360.5,
        height: 30,
        sliceX: 12,
 
    }
}
export const cercaD: SpriteAtlasData = {
    'cercaD': {
        x: 0,
        y: 0,
        width: 360.5,
        height: 30,
        sliceX: 8,
 
    }
}
export const cercaW: SpriteAtlasData = {
    'cercaW': {
        x: 0,
        y: 0,
        width: 360.5,
        height: 30,
        sliceX: 8,
 
    }
}
export const road: SpriteAtlasData = {
    'road': {
        x: 0,
        y: 0,
        width: 360.5,
        height: 30,
        sliceX: 3,
 
    }
}

export const castle: SpriteAtlasData = {
  'castle': {
    y: 0,
    x: 0,
    width: 420,
    height: 130,
    sliceX: 6,
    anims: {
      'idle': {
        from: 0,
        to: 5,
        loop: true,
      }
    }
  }
}

export const slime: SpriteAtlasData = {
  'slime': {
    y: 0,
    x: 0,
    width:620,
    height: 48,
    sliceX: 13,
    anims: {
      'walk': {
        from: 0,
        to: 5,
        loop: true,
      },
      'death': {
        from: 6,
        to: 12,
        loop: true,
      }
    }
  }
}

export const bullet: SpriteAtlasData = {
  'bullet': {
    y: 0,
    x: 0,
    width:50,
    height: 72,
    sliceX: 1,
    sliceY: 6,
    anims: {
      'fire': {
        from: 0,
        to: 4,
        loop: true,
      }
    }
  }
} 

export const target: SpriteAtlasData = {
  'target': {
    y: 0,
    x: 0,
    width: 500,
    height: 72,
    sliceX: 5,
    anims: {
      'on': {
        from: 0,
        to: 4,
        loop: true,
      }
    }
  }
} 

export const coinSpriteAtlas: SpriteAtlasData = {
  'coin': {
    x: 0,
    y: 0,
    width: 90,
    height: 10,
    sliceX: 9,
    anims: {
      'onCoin': {
        from: 0,
        to: 7,
        loop: true,
      }
    }
  }
}