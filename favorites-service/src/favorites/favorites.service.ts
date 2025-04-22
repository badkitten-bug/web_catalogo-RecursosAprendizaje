import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  private favoritesMap: Map<string, Set<string>> = new Map();
  private readonly TEST_USER_ID = 'testUser123';

  getFavorites(userId: string) {
    const userFavorites = this.favoritesMap.get(userId) || new Set();
    return {
      success: true,
      data: {
        favorites: Array.from(userFavorites),
      },
    };
  }

  addFavorite(userId: string, resourceId: string) {
    if (!this.favoritesMap.has(userId)) {
      this.favoritesMap.set(userId, new Set());
    }
    const userFavorites = this.favoritesMap.get(userId);
    if (userFavorites) {
      userFavorites.add(resourceId);
    }
    return {
      success: true,
      data: {
        isFavorite: true,
      },
    };
  }

  removeFavorite(userId: string, resourceId: string) {
    const userFavorites = this.favoritesMap.get(userId);
    if (userFavorites) {
      userFavorites.delete(resourceId);
    }
    return {
      success: true,
      data: {
        isFavorite: false,
      },
    };
  }

  isFavorite(userId: string, resourceId: string) {
    const userFavorites = this.favoritesMap.get(userId);
    const isFavorite = userFavorites ? userFavorites.has(resourceId) : false;
    return {
      success: true,
      data: {
        isFavorite,
      },
    };
  }
}
