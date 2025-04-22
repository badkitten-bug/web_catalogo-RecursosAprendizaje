import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get(':userId')
  getFavorites(@Param('userId') userId: string) {
    return this.favoritesService.getFavorites(userId);
  }

  @Post(':userId/:resourceId')
  addFavorite(
    @Param('userId') userId: string,
    @Param('resourceId') resourceId: string,
  ) {
    return this.favoritesService.addFavorite(userId, resourceId);
  }

  @Delete(':userId/:resourceId')
  removeFavorite(
    @Param('userId') userId: string,
    @Param('resourceId') resourceId: string,
  ) {
    return this.favoritesService.removeFavorite(userId, resourceId);
  }

  @Get(':userId/:resourceId')
  isFavorite(
    @Param('userId') userId: string,
    @Param('resourceId') resourceId: string,
  ) {
    return this.favoritesService.isFavorite(userId, resourceId);
  }
}
